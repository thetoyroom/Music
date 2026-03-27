import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../../store/playerStore.js';
import { useAppStore } from '../../store/appStore.js';
import { PlayIcon } from '../Icons.jsx';
import styles from './ArtworkCard.module.css';

const GRADIENTS = [
  'linear-gradient(135deg, #2c3e50, #000000)',
  'linear-gradient(135deg, #8e44ad, #2c3e50)',
  'linear-gradient(135deg, #d35400, #c0392b)',
  'linear-gradient(135deg, #16a085, #2980b9)',
  'linear-gradient(135deg, #7f8c8d, #2c3e50)',
  'linear-gradient(135deg, #c0392b, #8e44ad)',
  'linear-gradient(135deg, #2980b9, #2c3e50)',
  'linear-gradient(135deg, #f39c12, #d35400)',
];

function getGradient(id) {
  const n = typeof id === 'number' ? id : (id?.toString().charCodeAt(0) ?? 0);
  return GRADIENTS[n % GRADIENTS.length];
}

/**
 * Reusable card for album, artist, playlist, or mix.
 * Props:
 *   type: 'album' | 'artist' | 'playlist'
 *   id, title, subtitle, coverUrl, tracks (for play)
 */
export function ArtworkCard({ type = 'album', id, title, subtitle, coverUrl, tracks }) {
  const navigate = useNavigate();
  const { playTrack, setQueue } = usePlayerStore();
  const addRecentlyPlayed = useAppStore((s) => s.addRecentlyPlayed);

  const handleClick = () => {
    if (type === 'album') navigate(`/album/${id}`);
    else if (type === 'artist') navigate(`/artist/${id}`);
    else if (type === 'playlist') navigate(`/playlist/${id}`);
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    if (tracks && tracks.length > 0) {
      const t = tracks[0];
      playTrack(t, tracks, 0);
      addRecentlyPlayed(t);
    } else {
      handleClick();
    }
  };

  return (
    <div className={styles.card} onClick={handleClick} role="button" tabIndex={0}>
      <div className={styles.artWrap}>
        {coverUrl ? (
          <img src={coverUrl} alt={title} className={styles.art} />
        ) : (
          <div
            className={styles.artFallback}
            style={{ background: getGradient(id ?? title) }}
          />
        )}
        <div className={styles.overlay}>
          <button className={styles.playBtn} onClick={handlePlay} aria-label="Play">
            <PlayIcon size={20} />
          </button>
        </div>
      </div>
      <p className={`${styles.title} truncate`}>{title}</p>
      {subtitle && <p className={`${styles.subtitle} truncate`}>{subtitle}</p>}
    </div>
  );
}

export function ArtworkCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={`${styles.artWrap} skeleton`} />
      <div className={`${styles.skeletonLine} skeleton`} style={{ width: '80%', marginTop: 8 }} />
      <div className={`${styles.skeletonLine} skeleton`} style={{ width: '60%', marginTop: 4 }} />
    </div>
  );
}
