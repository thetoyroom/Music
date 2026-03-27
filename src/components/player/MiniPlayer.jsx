import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../../store/playerStore.js';
import { audioEngine } from '../../engine/AudioEngine.js';
import { PlayIcon, PauseIcon, HeartIcon, SpinnerIcon } from '../Icons.jsx';
import { useAppStore } from '../../store/appStore.js';
import styles from './MiniPlayer.module.css';

function formatTime(s) {
  if (s === undefined || s === null || !isFinite(s) || (s === 0 && !isFinite(s))) return '--:--';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export function MiniPlayer() {
  const { currentTrack, isPlaying, isLoading, progress, duration, setIsPlaying } = usePlayerStore();
  const isLiked = useAppStore((s) => s.isLiked(currentTrack?.id));
  const toggleLike = useAppStore((s) => s.toggleLike);
  const navigate = useNavigate();

  if (!currentTrack) return null;

  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className={styles.container}>
      {/* Progress strip at top */}
      <div className={styles.strip}>
        <div className={styles.stripFill} style={{ width: `${pct}%` }} />
      </div>

      {/* Content */}
      <div className={styles.inner} onClick={() => navigate('/now-playing')} style={{ cursor: 'pointer' }}>
        {/* Artwork */}
        <button
          className={styles.artworkBtn}
          onClick={(e) => { e.stopPropagation(); navigate('/now-playing'); }}
          aria-label="Now playing"
        >
          {currentTrack.coverUrl ? (
            <img src={currentTrack.coverUrl} alt={currentTrack.title} className={styles.artwork} />
          ) : (
            <div className={styles.artworkFallback} />
          )}
        </button>

        {/* Meta */}
        <div className={styles.meta}>
          <button 
            className={`${styles.title} truncate`}
            onClick={(e) => { e.stopPropagation(); navigate('/now-playing'); }}
          >
            {currentTrack.title}
          </button>
          <button 
            className={`${styles.artist} truncate`}
            onClick={(e) => { 
              e.stopPropagation(); 
              if (currentTrack.artistId) navigate(`/artist/${currentTrack.artistId}`);
            }}
          >
            {currentTrack.artist}
          </button>
        </div>

        {/* Controls */}
        <div className={styles.controls} onClick={(e) => e.stopPropagation()}>
          <button
            className={`${styles.iconBtn} ${isLiked ? styles.liked : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleLike(currentTrack); }}
            aria-label="Like"
          >
            <HeartIcon size={20} filled={isLiked} />
          </button>

          <button
            className={styles.playBtn}
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isLoading ? <SpinnerIcon size={22} /> : isPlaying ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
}
