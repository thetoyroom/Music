/**
 * Playlist Importer Utility - V4 - UNIVERSAL MULTI-PLATFORM
 */

import { searchTracks, normalizeTrack } from '../api/monochrome.js';

export const PLATFORMS = {
  SPOTIFY: 'spotify',
  YOUTUBE: 'youtube', // Both YT and YTM
  APPLE: 'apple',
  AMAZON: 'amazon',
  UNKNOWN: 'unknown'
};

export function parseLink(url) {
  try {
    const uri = new URL(url);
    const host = uri.hostname.toLowerCase();
    const path = uri.pathname;

    if (host.includes('spotify.com')) {
      const match = path.match(/\/playlist\/([a-zA-Z0-9]+)/);
      if (match) return { platform: PLATFORMS.SPOTIFY, id: match[1] };
    }
    
    if (host.includes('music.apple.com')) {
      const match = path.match(/\/(?:[a-z]{2}\/)?playlist\/([^/]+)\/pl\.([a-zA-Z0-9]+)/);
      if (match) return { platform: PLATFORMS.APPLE, id: `pl.${match[2]}` };
    }

    if (host.includes('music.amazon.com')) {
      const plId = uri.searchParams.get('playlistId') || path.match(/\/playlists\/([a-zA-Z0-9]+)/)?.[1];
      if (plId) return { platform: PLATFORMS.AMAZON, id: plId };
    }

    if (host.includes('youtube.com') || host.includes('youtu.be')) {
      const list = uri.searchParams.get('list');
      if (list) return { platform: PLATFORMS.YOUTUBE, id: list };
    }
  } catch (e) { console.error('[Importer] Invalid URL'); }
  return { platform: PLATFORMS.UNKNOWN, id: null };
}

/**
 * Robust fetch with multiple proxies
 */
async function fetchWithProxies(url, validation) {
  // Add cache-busting timestamp to prevent sticky state from proxies
  const separator = url.includes('?') ? '&' : '?';
  const timestampedUrl = `${url}${separator}_cb=${Date.now()}`;

  const CORS_PROXIES = [
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(timestampedUrl)}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(timestampedUrl)}`,
    `https://corsproxy.io/?${encodeURIComponent(timestampedUrl)}`,
    `https://thingproxy.freeboard.io/fetch/${timestampedUrl}`
  ];

  for (const proxy of CORS_PROXIES) {
    try {
      const res = await fetch(proxy);
      if (!res.ok) continue;
      const text = await res.text();
      if (validation(text)) return text;
    } catch (e) { console.warn('[Importer] Proxy failed:', new URL(proxy).hostname); }
  }
  return null;
}

/**
 * Universal Importer Main Function
 */
export async function importPlaylist(url, onProgress) {
  const { platform, id } = parseLink(url);
  if (platform === PLATFORMS.UNKNOWN) throw new Error('Unsupported or invalid link.');

  onProgress({ status: 'loading', progress: 0, total: 0 });

  try {
    let playlistName = 'Imported Playlist';
    let rawTracks = [];

    // --- PLATFORM SPECIFIC FETCHING ---
    if (platform === PLATFORMS.SPOTIFY) {
      const embedHtml = await fetchWithProxies(
        `https://open.spotify.com/embed/playlist/${id}`,
        (t) => t.includes('__NEXT_DATA__') || t.includes('trackList')
      );
      
      if (!embedHtml) throw new Error('Could not reach Spotify. Please try again.');
      
      const data = extractJSON(embedHtml);
      if (data) {
        const j = data.props?.pageProps?.state?.data?.entity || data.props?.pageProps?.state || data.props?.pageProps || data.query?.data;
        playlistName = j?.name || j?.title || playlistName;
        rawTracks = j?.trackList || j?.tracks?.items || j?.items || [];
      }
    } 
    else if (platform === PLATFORMS.APPLE) {
      // 1. OEmbed is the most resilient to proxy-blocking
      const appleOembedUrl = `https://music.apple.com/oembed?url=${encodeURIComponent(url)}`;
      const oembedHtml = await fetchWithProxies(appleOembedUrl, (t) => t.includes('provider_name') || t.includes('title'));
      
      if (oembedHtml) {
        try {
          const odata = JSON.parse(oembedHtml);
          playlistName = odata.title || odata.name || playlistName;
        } catch (e) {}
      }

      // 2. Try JSON scraping for tracks
      const html = await fetchWithProxies(url, (t) => t.includes('serialized-server-data') || t.includes('apple-music-playlist') || t.includes('type="application/json"'));
      if (!html) {
          // If we at least got the name via OEmbed, allow it
          if (playlistName !== 'Imported Playlist') return { name: playlistName, tracks: [], platform, id, isPartial: true };
          throw new Error('Could not reach Apple Music. This platform is currently heavily protected.');
      }

      const match = html.match(/<script id="serialized-server-data" type="application\/json">([\s\S]*?)<\/script>/);
      if (match) {
        const data = JSON.parse(match[1]);
        const plData = data[0]?.data?.sections?.[0] || data[0]?.data;
        playlistName = plData?.header?.title || 'Apple Playlist';
        rawTracks = plData?.items?.map(i => ({
          name: i.title,
          subtitle: i.artistName
        })) || [];
      } else {
        // 3. Last fallback: Meta-tag and regex DOM scraping
        const metaTitle = html.match(/<title>(.*?) on Apple Music<\/title>/)?.[1] || html.match(/<title>([^<]+)<\/title>/)?.[1];
        if (metaTitle) playlistName = metaTitle.split(' on Apple Music')[0].trim();
        
        rawTracks = Array.from(html.matchAll(/class="songs-list-row__song-name"[^>]*>([^<]+)<\/div>[\s\S]*?class="songs-list-row__by-line"[^>]*>[\s\S]*?>([^<]+)<\/a>/g))
                    .map(m => ({ name: m[1], subtitle: m[2] }));
      }
    }
    else if (platform === PLATFORMS.YOUTUBE) {
      // Use consent bypass and English locale for predictable HTML across proxies
      const ytUrl = `https://www.youtube.com/playlist?list=${id}&ucbcb=1&hl=en`;
      const html = await fetchWithProxies(ytUrl, (t) => t.includes('ytInitialData') || t.includes('contents'));
      if (!html) throw new Error('Could not reach YouTube.');

      // Hardened regex: handles window.ytInitialData, var ytInitialData, and Object.defineProperty
      const jsonStr = (
        html.match(/(?:window(?:\s*\[['"]ytInitialData['"]\]|\.ytInitialData)\s*=\s*)([\s\S]*?);(?:\n|<\/script>)/) ||
        html.match(/(?:var\s+ytInitialData\s*=\s*)([\s\S]*?);(?:\n|<\/script>)/) ||
        html.match(/ytInitialData\s*=\s*({[\s\S]*?});/) ||
        html.match(/ytInitialData['"]\s*,\s*({[\s\S]*?})\);/) // Object.defineProperty case
      )?.[1];
      
      if (jsonStr) {
        try {
          const data = JSON.parse(jsonStr);
          const header = data.header?.playlistHeaderRenderer || data.header?.musicPlaylistHeaderRenderer;
          playlistName = header?.title?.simpleText || header?.title?.runs?.[0]?.text || 'YouTube Playlist';
          
          const contents = data.contents?.twoColumnBrowseResultsRenderer?.tabs?.[0]?.content?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents?.[0]?.playlistVideoListRenderer?.contents ||
                           data.contents?.singleColumnBrowseResultsRenderer?.tabs?.[0]?.content?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer?.contents?.[0]?.playlistVideoListRenderer?.contents;
          
          rawTracks = (contents || []).map(c => {
             const video = c.playlistVideoRenderer || c.playlistPanelVideoRenderer;
             if (!video) return null;
             return {
               name: video.title?.runs?.[0]?.text || video.title?.simpleText,
               subtitle: video.shortBylineText?.runs?.[0]?.text || video.longBylineText?.runs?.[0]?.text
             };
          }).filter(t => t && t.name);
        } catch (e) { console.error('[Importer] YTM JSON parse failed', e); }
      }
    }
    else if (platform === PLATFORMS.AMAZON) {
       const html = await fetchWithProxies(url, (t) => t.length > 500);
       if (!html) throw new Error('Could not reach Amazon Music.');
       // Greedy regex for Amazon tracks
       const patterns = [
         /class="track-title"[^>]*>([^<]+)<\/a>[\s\S]*?class="artist-name"[^>]*>([^<]+)<\/a>/g,
         /{"title":"([^"]+)","artistName":"([^"]+)"/g
       ];
       for (const p of patterns) {
         const matches = Array.from(html.matchAll(p)).map(m => ({ name: m[1], subtitle: m[2] }));
         if (matches.length > 0) { rawTracks = matches; break; }
       }
    }

    if (rawTracks.length === 0) {
      throw new Error('This playlist appears to be empty or private.');
    }

    // --- PARALLEL RESOLUTION LOOP ---
    onProgress({ status: 'matching', progress: 0, total: rawTracks.length, playlistName });

    const matchedTracks = [];
    const BATCH_SIZE = 5;
    const total = rawTracks.length;
    const isTruncated = (platform === PLATFORMS.SPOTIFY || platform === PLATFORMS.APPLE) && total >= 95;

    for (let i = 0; i < total; i += BATCH_SIZE) {
      const batch = rawTracks.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(batch.map(async (item) => {
        const trackMeta = item.track || item;
        const title = trackMeta.name || trackMeta.title || 'Unknown Track';
        const artist = trackMeta.artists?.[0]?.name || trackMeta.subtitle || 'Unknown Artist';
        
        // Update individual progress inside Promise.all is hard, so we do it at batch level
        return findMatch(title, artist);
      }));

      matchedTracks.push(...batchResults.filter(Boolean));
      
      onProgress({ 
        status: 'matching', 
        progress: Math.min(i + BATCH_SIZE, total), 
        total,
        currentTrack: { 
          title: batch[0].name || batch[0].title || '...', 
          artist: batch[0].subtitle || (batch[0].artists?.[0]?.name) || '...',
          playlistName
        } 
      });

      // Avoid hitting search API too fast
      await new Promise(r => setTimeout(r, 100));
    }

    onProgress({ status: 'complete', progress: total, total, isTruncated });
    return { name: playlistName, tracks: matchedTracks, platform, id, isTruncated };

  } catch (err) {
    console.error('[Importer] Fatal:', err);
    throw err;
  }
}

function extractJSON(html) {
  const patterns = [
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/,
    /<script id="initial-state" type="application\/json">([\s\S]*?)<\/script>/,
    /<script id="resource" type="application\/json">([\s\S]*?)<\/script>/
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) return JSON.parse(m[1]);
  }
  return null;
}

export async function findMatch(title, artist) {
  try {
    const cleanTitle = title.split('(')[0].split('-')[0].split('[')[0].trim();
    const results = await searchTracks(`${cleanTitle} ${artist}`, 5);
    const items = results?.data?.items ?? results?.tracks?.items ?? results?.items ?? [];
    
    for (const item of items) {
      const norm = normalizeTrack(item);
      if (norm.title.toLowerCase().includes(cleanTitle.toLowerCase())) {
        return norm;
      }
    }
    return items.length > 0 ? normalizeTrack(items[0]) : null;
  } catch (e) { return null; }
}
