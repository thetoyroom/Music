import { useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../../store/playerStore.js';
import { audioEngine } from '../../engine/AudioEngine.js';
import {
  PlayIcon, PauseIcon, SkipNextIcon, SkipPrevIcon,
  ShuffleIcon, RepeatIcon, Repeat1Icon,
  VolumeIcon, VolumeMuteIcon, HeartIcon, SpinnerIcon,
  QueueIcon
} from '../Icons.jsx';
import { QueueDrawer } from './QueueDrawer.jsx';
import { useAppStore } from '../../store/appStore.js';
import styles from './PlayerFooter.module.css';
import { useState } from 'react';

function formatTime(s) {
  if (s === undefined || s === null || !isFinite(s) || (s === 0 && !isFinite(s))) return '--:--';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export function PlayerFooter() {
  const {
    currentTrack, isPlaying, isLoading,
    progress, duration, volume, isMuted,
    shuffle, repeat,
    setIsPlaying, setVolume, toggleMute, toggleShuffle, toggleRepeat,
    next, prev,
  } = usePlayerStore();

  const navigate = useNavigate();
  const isLiked = useAppStore((s) => s.isLiked(currentTrack?.id));
  const toggleLike = useAppStore((s) => s.toggleLike);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const progressRef = useRef(null);

  const handleProgressClick = useCallback((e) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioEngine.seek(pct * duration);
  }, [duration]);

  const progressPct = duration > 0 ? (progress / duration) * 100 : 0;

  if (!currentTrack) return null;

  return (
    <footer 
      className={styles.footer} 
      onClick={() => navigate('/now-playing')}
      style={{ cursor: 'pointer' }}
    >
      {/* Progress bar (top strip) */}
      <div
        className={styles.progressBar}
        ref={progressRef}
        onClick={(e) => { e.stopPropagation(); handleProgressClick(e); }}
        title="Seek"
      >
        <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
      </div>

      {/* Track info */}
      <div className={styles.trackInfo}>
        <div className={styles.artwork}>
          {currentTrack.coverUrl ? (
            <img src={currentTrack.coverUrl} alt={currentTrack.title} />
          ) : (
            <div className={styles.artworkFallback} />
          )}
        </div>

        <div className={styles.meta}>
          <button
            className={`${styles.trackTitle} truncate`}
            onClick={(e) => { e.stopPropagation(); currentTrack.albumId && navigate(`/album/${currentTrack.albumId}`); }}
            title={currentTrack.title}
          >
            {currentTrack.title}
          </button>
          <button
            className={`${styles.trackArtist} truncate`}
            onClick={() => currentTrack.artistId && navigate(`/artist/${currentTrack.artistId}`)}
          >
            {currentTrack.artist}
          </button>
        </div>

        <div className={styles.likeBtn}>
          <button
            onClick={(e) => { e.stopPropagation(); toggleLike(currentTrack); }}
            className={isLiked ? styles.liked : ''}
            aria-label="Like"
          >
            <HeartIcon size={18} filled={isLiked} />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls} onClick={(e) => e.stopPropagation()}>
        <button
          className={`${styles.ctrlBtn} ${shuffle ? styles.ctrlActive : ''}`}
          onClick={toggleShuffle}
          aria-label="Shuffle"
        >
          <ShuffleIcon size={16} />
        </button>

        <button className={styles.ctrlBtn} onClick={prev} aria-label="Previous">
          <SkipPrevIcon size={20} />
        </button>

        <button
          className={styles.playBtn}
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          disabled={isLoading}
        >
          {isLoading ? (
            <SpinnerIcon size={20} />
          ) : isPlaying ? (
            <PauseIcon size={20} />
          ) : (
            <PlayIcon size={20} />
          )}
        </button>

        <button className={styles.ctrlBtn} onClick={next} aria-label="Next">
          <SkipNextIcon size={20} />
        </button>

        <button
          className={`${styles.ctrlBtn} ${repeat !== 'none' ? styles.ctrlActive : ''}`}
          onClick={toggleRepeat}
          aria-label="Repeat"
        >
          {repeat === 'one' ? <Repeat1Icon size={16} /> : <RepeatIcon size={16} />}
        </button>
      </div>

      {/* Volume + time */}
      <div className={styles.right} onClick={(e) => e.stopPropagation()}>
        <span className={styles.time}>{formatTime(progress)}</span>
        <span className={styles.timeSep}>/</span>
        <span className={styles.time}>{formatTime(duration)}</span>

        <button className={styles.ctrlBtn} onClick={toggleMute} aria-label="Mute">
          {isMuted || volume === 0 ? <VolumeMuteIcon size={16} /> : <VolumeIcon size={16} />}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className={styles.volumeSlider}
          aria-label="Volume"
        />

        <button 
          className={`${styles.ctrlBtn} ${isQueueOpen ? styles.ctrlActive : ''}`} 
          onClick={(e) => { e.stopPropagation(); setIsQueueOpen(!isQueueOpen); }}
          title="Queue"
        >
          <QueueIcon size={18} />
        </button>
      </div>

      <QueueDrawer isOpen={isQueueOpen} onClose={() => setIsQueueOpen(false)} />
    </footer>
  );
}
