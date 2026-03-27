import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePlayerStore } from '../../store/playerStore.js';
import { useAppStore } from '../../store/appStore.js';
import { getStreamData } from '../../api/monochrome.js';
import { PlayIcon, PauseIcon, HeartIcon, DotsIcon, DownloadIcon } from '../Icons.jsx';
import styles from './TrackRow.module.css';

function formatTime(s) {
  if (!s || !isFinite(s)) return '';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export function TrackRow({ track, tracks, index, showArtwork = true, showAlbum = false }) {
  const { currentTrack, isPlaying, playTrack, setIsPlaying, addToQueue } = usePlayerStore();
  const isLiked = useAppStore((s) => s.isLiked(track.id));
  const toggleLike = useAppStore((s) => s.toggleLike);
  const addRecentlyPlayed = useAppStore((s) => s.addRecentlyPlayed);
  const addDownloadStore = useAppStore((s) => s.addDownload);
  const updateDownloadProgress = useAppStore((s) => s.updateDownloadProgress);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isCurrent = currentTrack?.id === track.id;
  const isCurrentPlaying = isCurrent && isPlaying;

  const handlePlay = (e) => {
    if (e) e.stopPropagation();
    if (isCurrent) {
      setIsPlaying(!isPlaying);
    } else {
      playTrack(track, tracks ?? [track], index ?? 0);
      addRecentlyPlayed(track);
    }
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    const id = `dl_${Date.now()}`;
    addDownloadStore(id, track.title);
    
    try {
      const streamData = await getStreamData(track.id);
      if (!streamData?.url) throw new Error('No download URL found');

      const response = await fetch(streamData.url);
      if (!response.ok) throw new Error('Download failed');

      const contentLength = response.headers.get('content-length');
      const total = parseInt(contentLength, 10);
      let loaded = 0;

      const reader = response.body.getReader();
      const chunks = [];
      
      while(true) {
        const {done, value} = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        if (total) {
          updateDownloadProgress(id, Math.round((loaded / total) * 100));
        } else {
          // Fallback if no content-length
          updateDownloadProgress(id, Math.min(99, Math.round((loaded / 5000000) * 100)));
        }
      }

      const contentType = response.headers.get('content-type') || 'audio/mpeg';
      const extensionMap = {
        'audio/flac': 'flac',
        'audio/mpeg': 'mp3',
        'audio/mp4': 'm4a',
        'audio/x-m4a': 'm4a',
        'audio/ogg': 'ogg',
        'audio/wav': 'wav',
        'audio/webm': 'webm'
      };
      
      const ext = extensionMap[contentType] || (contentType.includes('flac') ? 'flac' : 'mp3');
      const blob = new Blob(chunks, { type: contentType });
      const url = window.URL.createObjectURL(blob);
      const safeName = `${track.artist} - ${track.title}`.replace(/[<>:"/\\|?*]/g, '_');
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${safeName}.${ext}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      updateDownloadProgress(id, 100);
    } catch (err) {
      console.error('Download error:', err);
      updateDownloadProgress(id, 0); // Reset or show error
    }
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      className={`${styles.row} ${isCurrent ? styles.active : ''} ${!showArtwork ? styles.noArtwork : ''}`}
      onClick={handlePlay}
    >
      {/* Play indicator / number */}
      <div className={styles.indexCell}>
        {isCurrent && isCurrentPlaying ? (
          <span className="eq-bars">
            <span style={{ height: '60%' }} />
            <span style={{ height: '100%' }} />
            <span style={{ height: '40%' }} />
          </span>
        ) : (
          <>
            <span className={styles.indexNumber}>{index + 1}</span>
            <button className={styles.playBtn} onClick={handlePlay} aria-label="Play">
              <PlayIcon size={14} />
            </button>
          </>
        )}
      </div>

      {/* Artwork (optional) */}
      {showArtwork && (
        <div className={styles.artwork}>
          {track.coverUrl ? (
            <img src={track.coverUrl} alt={track.title} />
          ) : (
            <div className={styles.artworkFallback} />
          )}
        </div>
      )}

      {/* Title + Artist */}
      <div className={styles.info}>
        <div className={styles.titleLine}>
          <span className={`${styles.title} ${isCurrent ? styles.titleActive : ''} truncate`}>
            {track.title}
          </span>
          {track.quality && (
            <span className={`${styles.badge} ${track.quality.includes('HI_RES') ? styles.hifi : styles.lossless}`}>
              {track.quality === 'HI_RES_LOSSLESS' ? 'HI-RES' : 'LOSSLESS'}
            </span>
          )}
        </div>
        <button
          className={`${styles.artist} truncate`}
          onClick={(e) => { e.stopPropagation(); track.artistId && navigate(`/artist/${track.artistId}`); }}
        >
          {track.artist}
        </button>
      </div>

      {/* Album (optional) */}
      {showAlbum && (
        <button
          className={`${styles.album} truncate`}
          onClick={(e) => { e.stopPropagation(); track.albumId && navigate(`/album/${track.albumId}`); }}
        >
          {track.album}
        </button>
      )}

      {/* Duration + actions */}
      <div className={styles.actions}>
        <span className={styles.duration}>{formatTime(track.duration)}</span>
        
        <button
          className={`${styles.iconBtn} ${isLiked ? styles.liked : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleLike(track); }}
          title="Like"
        >
          <HeartIcon size={16} filled={isLiked} />
        </button>

        <button
          className={styles.iconBtn}
          onClick={handleDownload}
          title="Download"
        >
          <DownloadIcon size={16} />
        </button>

        <div className={styles.menuWrap}>
          <button
            className={styles.iconBtn}
            onClick={handleMenuClick}
            title="More"
          >
            <DotsIcon size={16} />
          </button>
          
          {menuOpen && (
            <div className={styles.menu} onMouseLeave={() => setMenuOpen(false)}>
              <button onClick={(e) => { e.stopPropagation(); addToQueue(track); setMenuOpen(false); }}>Add to Queue</button>
              <button onClick={(e) => { e.stopPropagation(); toggleLike(track); setMenuOpen(false); }}>{isLiked ? 'Unlike' : 'Like'}</button>
              <button onClick={(e) => { e.stopPropagation(); /* Add to Playlist logic placeholder */ setMenuOpen(false); }}>Add to Playlist</button>
              <button onClick={(e) => { e.stopPropagation(); navigate(`/album/${track.albumId}`); }}>View Album</button>
              <button onClick={handleDownload}>Download</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
