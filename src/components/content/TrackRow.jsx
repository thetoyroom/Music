import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { usePlayerStore } from '../../store/playerStore.js';
import { useAppStore } from '../../store/appStore.js';
import { getStreamData } from '../../api/monochrome.js';
import { recommendationService } from '../../services/recommendationService.js';
import { downloadTrack } from '../../utils/download.js';
import { PlayIcon, PauseIcon, HeartIcon, DotsIcon, DownloadIcon } from '../Icons.jsx';
import { PlaylistSelector } from '../player/PlaylistSelector.jsx';
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
  const [showPlaylist, setShowPlaylist] = useState(false);

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

  const handleDownload = (e) => {
    e.stopPropagation();
    downloadTrack(track, addDownloadStore, updateDownloadProgress);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const startTrackRadio = async (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    try {
      const radioTracks = await recommendationService.getTrackRadio(track);
      if (radioTracks.length > 0) {
        usePlayerStore.getState().playTrack(radioTracks[0], radioTracks, 0);
      }
    } catch (err) {
      console.error('Failed to start track radio', err);
    }
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
            <span className={styles.indexNumber}>
              {typeof index === 'number' ? index + 1 : '—'}
            </span>
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
              <button onClick={startTrackRadio}>Track Radio</button>
              <button onClick={(e) => { e.stopPropagation(); toggleLike(track); setMenuOpen(false); }}>{isLiked ? 'Unlike' : 'Like'}</button>
              <button onClick={(e) => { e.stopPropagation(); setShowPlaylist(true); setMenuOpen(false); }}>Add to Playlist</button>
              <button onClick={(e) => { e.stopPropagation(); navigate(`/album/${track.albumId}`); }}>View Album</button>
              <button onClick={handleDownload}>Download</button>
            </div>
          )}
        </div>
      </div>

      {showPlaylist && <PlaylistSelector track={track} onClose={() => setShowPlaylist(false)} />}
    </div>
  );
}
