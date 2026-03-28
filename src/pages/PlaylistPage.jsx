import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore.js';
import { usePlayerStore } from '../store/playerStore.js';
import { TrackRow } from '../components/content/TrackRow.jsx';
import { PlayIcon, ChevronLeftIcon, ShuffleIcon } from '../components/Icons.jsx';
import { ConfirmDialog } from '../components/ui/ConfirmDialog.jsx';
import styles from './PlaylistPage.module.css';

export default function PlaylistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const playlists = useAppStore(s => s.playlists);
  const deletePlaylist = useAppStore(s => s.deletePlaylist);
  const { setQueue, toggleShuffle } = usePlayerStore();
  
  const [playlist, setPlaylist] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const pl = playlists.find(p => p.id === id);
    if (pl) {
      setPlaylist(pl);
    } else {
      // If not found, maybe it's a dynamic one or we should go back
      navigate('/library');
    }
  }, [id, playlists, navigate]);

  if (!playlist) {
    return (
      <div className={styles.loadPage}>
        <div className={styles.spinner} />
      </div>
    );
  }

  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
      setQueue(playlist.tracks, 0);
    }
  };

  const handleShufflePlay = () => {
    if (playlist.tracks.length > 0) {
      setQueue(playlist.tracks, 0);
      usePlayerStore.getState().toggleShuffle(true);
    }
  };

  const confirmDelete = () => {
    deletePlaylist(playlist.id);
    navigate('/library');
  };

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate('/library')}>
        <ChevronLeftIcon size={16} /> BACK TO LIBRARY
      </button>

      <ConfirmDialog 
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="DELETE PLAYLIST"
        message={`Are you sure you want to delete "${playlist.name}"? This action cannot be undone.`}
        confirmText="DELETE"
      />

      <div className={styles.header}>
        <div className={styles.artWrap}>
          {playlist.tracks[0]?.coverUrl ? (
            <img src={playlist.tracks[0].coverUrl} alt={playlist.name} className={styles.art} />
          ) : (
            <div className={styles.artFallback}>
              {playlist.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className={styles.meta}>
          <span className={styles.metaType}>PLAYLIST</span>
          <h1 className={styles.title}>{playlist.name}</h1>
          <div className={styles.metaRow}>
            <span>{playlist.tracks.length} tracks</span>
            {playlist.platform && <span>via {playlist.platform}</span>}
          </div>

          <div className={styles.actions}>
            <button className={styles.playBtn} onClick={handlePlayAll}>
              <PlayIcon size={16} /> PLAY ALL
            </button>
            <button className={styles.secondaryBtn} onClick={handleShufflePlay}>
              <ShuffleIcon size={16} /> SHUFFLE
            </button>
            <button className={styles.secondaryBtn} onClick={() => setShowDeleteConfirm(true)} style={{ color: '#ff6b6b', borderColor: '#ff6b6b' }}>
              DELETE
            </button>
          </div>
        </div>
      </div>

      <div className={styles.trackList}>
        {playlist.tracks.length === 0 ? (
          <div className={styles.empty}>
            <p>This playlist is empty.</p>
            <button onClick={() => navigate('/search')} className={styles.secondaryBtn} style={{ marginTop: 12 }}>
              FIND MUSIC
            </button>
          </div>
        ) : (
          playlist.tracks.map((track, i) => (
            <TrackRow 
              key={track.id + i} 
              track={track} 
              tracks={playlist.tracks} 
              index={i} 
              showArtwork 
            />
          ))
        )}
      </div>
    </div>
  );
}
