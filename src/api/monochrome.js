/**
 * Monochrome API Client
 * Wraps the Monochrome/Tidal proxy REST API with automatic
 * instance rotation and retry logic.
 */

import { instanceManager } from './instanceManager.js';

const DEFAULT_TIMEOUT = 10000;
const MAX_RETRIES = 3;

async function apiFetch(path, options = {}, isStream = false) {
  const instances = isStream
    ? instanceManager.getStreamInstances()
    : instanceManager.getApiInstances();

  let lastError;
  for (let i = 0; i < Math.min(MAX_RETRIES, instances.length); i++) {
    const base = instances[i];
    const url = `${base}${path}`;
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      options.timeout ?? DEFAULT_TIMEOUT
    );

    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          ...options.headers,
        },
      });
      clearTimeout(timeout);

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      return await res.json();
    } catch (err) {
      clearTimeout(timeout);
      lastError = err;
      if (isStream) {
        instanceManager.markStreamFailed(base);
      } else {
        instanceManager.markApiFailed(base);
      }
      console.warn(`[API] Failed on ${base}${path}:`, err.message);
    }
  }

  throw lastError ?? new Error('All instances failed');
}

// ─── Search ──────────────────────────────────────────────────────────────────

export async function search(query, limit = 20) {
  const [tracksRes, albumsRes, artistsRes] = await Promise.all([
    searchTracks(query, limit).catch(() => null),
    searchAlbums(query, limit).catch(() => null),
    searchArtists(query, limit).catch(() => null),
  ]);
  return {
    tracks: tracksRes?.data?.items ?? tracksRes?.tracks?.items ?? tracksRes?.items ?? [],
    albums: albumsRes?.data?.items ?? albumsRes?.albums?.items ?? albumsRes?.items ?? [],
    artists: artistsRes?.data?.items ?? artistsRes?.artists?.items ?? artistsRes?.items ?? []
  };
}

export async function searchTracks(query, limit = 20) {
  return apiFetch(
    `/search/?s=${encodeURIComponent(query)}&limit=${limit}`
  );
}

export async function searchAlbums(query, limit = 20) {
  return apiFetch(
    `/search/?al=${encodeURIComponent(query)}&limit=${limit}`
  );
}

export async function searchArtists(query, limit = 20) {
  return apiFetch(
    `/search/?a=${encodeURIComponent(query)}&limit=${limit}`
  );
}

// ─── Track ───────────────────────────────────────────────────────────────────

export async function getTrack(id) {
  const res = await apiFetch(`/info/?id=${id}`).catch(() => apiFetch(`/track/?id=${id}`));
  const data = res?.data ?? res;
  const items = Array.isArray(data) ? data : [data];
  const found = items.find((i) => i.id == id || (i.item && i.item.id == id));
  return found?.item ?? found ?? data;
}

export async function getStreamData(id, quality = 'LOSSLESS') {
  const res = await apiFetch(`/track/?id=${id}&quality=${quality}`, {}, true).catch(() => null);
  const data = res?.data ?? res;
  
  let decodedManifest;
  try {
    if (data?.manifest) {
      decodedManifest = JSON.parse(atob(data.manifest));
    }
  } catch (e) {
    console.error("Failed to decode manifest", e);
  }

  return {
    url: decodedManifest?.urls?.[0] ?? data?.url,
    manifestUrl: data?.manifestUrl ?? null,
    manifest: data?.manifest ?? null
  };
}

// ─── Album ───────────────────────────────────────────────────────────────────

export async function getAlbum(id) {
  const res = await apiFetch(`/album/?id=${id}`).catch(() => null);
  return res?.data ?? res;
}

export async function getAlbumTracks(id) {
  const res = await apiFetch(`/album/?id=${id}`).catch(() => null);
  const data = res?.data ?? res;
  const items = Array.isArray(data) ? data : (data?.items ?? []);
  return items.map(i => i.item ?? i);
}

// ─── Artist ──────────────────────────────────────────────────────────────────

export async function getArtist(id) {
  const res = await apiFetch(`/artist/?id=${id}`).catch(() => null);
  const data = res?.data ?? res;
  return data?.artist ?? (Array.isArray(data) ? data[0] : data);
}

export async function getArtistTopTracks(id, limit = 20) {
  const res = await apiFetch(`/artist/?f=${id}&skip_tracks=true&limit=${limit}`).catch(() => null);
  const data = res?.data ?? res;
  let tracks = data?.tracks ?? (Array.isArray(data) ? data : (data?.items ?? []));
  return tracks.map(i => i.item ?? i);
}

export async function getArtistAlbums(id, limit = 20) {
  const res = await apiFetch(`/artist/?f=${id}&skip_tracks=true&limit=${limit}`).catch(() => null);
  const data = res?.data ?? res;
  let albums = data?.albums ?? (Array.isArray(data) ? data : (data?.items ?? []));
  return albums.map(i => i.item ?? i);
}

// ─── Playlist ─────────────────────────────────────────────────────────────────

export async function getPlaylist(id) {
  const res = await apiFetch(`/playlist/?id=${id}`).catch(() => null);
  const data = res?.data ?? res;
  return data?.playlist ?? data;
}

export async function getPlaylistTracks(id) {
  const res = await apiFetch(`/playlist/?id=${id}`).catch(() => null);
  const data = res?.data ?? res;
  const items = data?.items ?? (Array.isArray(data) ? data : []);
  return items.map(i => i.item ?? i);
}

// ─── Mix ─────────────────────────────────────────────────────────────────────

export async function getMix(id) {
  return apiFetch(`/mix/${id}`);
}

// ─── Artwork ─────────────────────────────────────────────────────────────────

/**
 * Returns the cover image URL for a given coverArt UUID from Tidal.
 * size: 80 | 160 | 320 | 640 | 1280
 */
export function getCoverUrl(coverArtId, size = 320) {
  if (!coverArtId) return null;
  // Tidal cover format: uuid with dashes → replace dashes with /
  const path = String(coverArtId).replace(/-/g, '/');
  return `https://resources.tidal.com/images/${path}/${size}x${size}.jpg`;
}

/**
 * Artist picture URL
 */
export function getArtistPictureUrl(pictureId, size = 320) {
  if (!pictureId) return null;
  const path = String(pictureId).replace(/-/g, '/');
  return `https://resources.tidal.com/images/${path}/${size}x${size}.jpg`;
}

// ─── Trending / Explore ──────────────────────────────────────────────────────

export async function getFeatured() {
  return apiFetch('/featured').catch(() => null);
}

export async function getNewReleases(limit = 20) {
  return apiFetch(`/newreleases?limit=${limit}`).catch(() => null);
}

// ─── Lyrics ──────────────────────────────────────────────────────────────────

/**
 * Fetch synced lyrics from LRCLIB.
 */
export async function getLyrics(track) {
  if (!track) return null;
  
  try {
    // Clean up title and artist for better matching
    const cleanTitle = track.title.split('(')[0].split('-')[0].split('[')[0].trim();
    const cleanArtist = track.artist.split(',')[0].split('&')[0].split('feat.')[0].split('Feat.')[0].trim();

    const params = new URLSearchParams({
      track_name: cleanTitle,
      artist_name: cleanArtist,
      duration: Math.round(track.duration || 0).toString()
    });
    
    // LRCLIB is public and stays stable
    const res = await fetch(`https://lrclib.net/api/get?${params.toString()}`);
    if (!res.ok) return null;
    
    const data = await res.json();
    if (data.syncedLyrics) {
      return {
        synced: parseLRC(data.syncedLyrics),
        plain: data.plainLyrics || '',
        provider: 'LRCLIB'
      };
    }
  } catch (err) {
    console.warn('[Lyrics] Fetch failed:', err);
  }
  return null;
}

function parseLRC(lrc) {
  if (!lrc) return [];
  const lines = lrc.split('\n');
  const result = [];
  const timeRegex = /\[(\d+):(\d+\.\d+)\](.*)/;
  
  for (const line of lines) {
    const match = line.match(timeRegex);
    if (match) {
      const min = parseInt(match[1]);
      const sec = parseFloat(match[2]);
      const text = match[3].trim();
      result.push({ time: min * 60 + sec, text });
    }
  }
  return result;
}

// ─── Normalizers (map Monochrome shapes to our internal format) ───────────────

export function normalizeTrack(raw) {
  if (!raw) return null;
  return {
    id: raw.id ?? raw.tidalId,
    title: raw.title ?? 'Unknown Track',
    artist: Array.isArray(raw.artists)
      ? raw.artists.map((a) => a.name).join(', ')
      : (raw.artist?.name ?? raw.artistName ?? 'Unknown Artist'),
    artistId: Array.isArray(raw.artists) ? raw.artists[0]?.id : raw.artist?.id,
    album: raw.album?.title ?? raw.albumTitle ?? '',
    albumId: raw.album?.id ?? raw.albumId,
    duration: raw.duration ?? 0,
    coverArt: raw.album?.cover ?? raw.cover ?? raw.image,
    coverUrl: getCoverUrl(raw.album?.cover ?? raw.cover ?? raw.image, 320),
    quality: raw.audioQuality ?? raw.quality,
    explicit: raw.explicit ?? false,
    trackNumber: raw.trackNumber,
    allowStreaming: raw.allowStreaming !== false,
    popularity: raw.popularity ?? 0,
  };
}

export function normalizeAlbum(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    title: raw.title ?? 'Unknown Album',
    artist: Array.isArray(raw.artists)
      ? raw.artists.map((a) => a.name).join(', ')
      : (raw.artist?.name ?? 'Unknown Artist'),
    artistId: Array.isArray(raw.artists) ? raw.artists[0]?.id : raw.artist?.id,
    coverArt: raw.cover ?? raw.image,
    coverUrl: getCoverUrl(raw.cover ?? raw.image, 320),
    releaseDate: raw.releaseDate ?? raw.releaseYear,
    numberOfTracks: raw.numberOfTracks,
    audioQuality: raw.audioQuality,
    explicit: raw.explicit ?? false,
    type: raw.type,
  };
}

export function normalizeArtist(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    name: raw.name ?? 'Unknown Artist',
    picture: raw.picture,
    pictureUrl: getArtistPictureUrl(raw.picture, 320),
    popularity: raw.popularity ?? 0,
    biography: raw.biography?.text ?? '',
  };
}

export function normalizeTracks(items = []) {
  return items
    .filter(Boolean)
    .map(normalizeTrack)
    .filter(Boolean);
}

export function normalizeAlbums(items = []) {
  return items
    .filter(Boolean)
    .map(normalizeAlbum)
    .filter(Boolean);
}

export function normalizeArtists(items = []) {
  return items
    .filter(Boolean)
    .map(normalizeArtist)
    .filter(Boolean);
}
