import { useState } from 'react';
import { useAppStore } from '../store/appStore.js';
import { TrackRow } from '../components/content/TrackRow.jsx';
import { ArtworkCard } from '../components/content/ArtworkCard.jsx';
import styles from './LibraryPage.module.css';

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('liked'); // liked, playlists, recent
  const { likedTracks, playlists, recentlyPlayed } = useAppStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'liked':
        return (
          <div className={styles.list}>
            {likedTracks.length === 0 ? (
              <p className={styles.empty}>No liked tracks yet.</p>
            ) : (
              likedTracks.map((track, i) => (
                <TrackRow key={track.id} track={track} tracks={likedTracks} index={i} showArtwork />
              ))
            )}
          </div>
        );
      case 'playlists':
        return (
          <div className={styles.grid}>
            {playlists.length === 0 ? (
              <p className={styles.empty}>No playlists created yet.</p>
            ) : (
              playlists.map((pl) => (
                <ArtworkCard
                  key={pl.id}
                  type="playlist"
                  id={pl.id}
                  title={pl.name}
                  subtitle={`${pl.tracks.length} tracks`}
                  coverUrl={pl.tracks[0]?.coverUrl}
                  tracks={pl.tracks}
                />
              ))
            )}
          </div>
        );
      case 'recent':
        return (
          <div className={styles.list}>
            {recentlyPlayed.length === 0 ? (
              <p className={styles.empty}>No recent listening history.</p>
            ) : (
              recentlyPlayed.map((track, i) => (
                <TrackRow key={track.id + i} track={track} tracks={recentlyPlayed} index={i} showArtwork />
              ))
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Your Library</h1>

      <div className={styles.tabs}>
        {['liked', 'playlists', 'recent'].map((t) => (
          <button
            key={t}
            className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t.replace('liked', 'Liked Songs').replace('recent', 'Recently Played')}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
}
