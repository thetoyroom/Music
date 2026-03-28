import { useState } from 'react';
import { useAppStore } from '../store/appStore.js';
import { TrackRow } from '../components/content/TrackRow.jsx';
import { ArtworkCard } from '../components/content/ArtworkCard.jsx';
import { InputDialog } from '../components/ui/InputDialog.jsx';
import { ImportProgress } from '../components/ui/ImportProgress.jsx';
import { importPlaylist } from '../utils/playlistImporter.js';
import styles from './LibraryPage.module.css';

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState('liked'); // liked, playlists, recent
  const { likedTracks, playlists, recentlyPlayed } = useAppStore();

  // Dialog states
  const [showCreate, setShowCreate] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importStatus, setImportStatus] = useState(null); // { status, progress, total, currentTrack }

  const handleCreate = (name) => {
    useAppStore.getState().createPlaylist(name);
  };

  const handleImport = async (url) => {
    // Explicitly reset status to clear any old track data from the UI
    setImportStatus(null);
    setTimeout(() => {
      setImportStatus({ status: 'loading', progress: 0, total: 0 });
    }, 0);

    try {
      const result = await importPlaylist(url, (status) => {
        setImportStatus(status);
      });
      
      if (result && result.tracks.length > 0) {
        useAppStore.getState().saveImportedPlaylist(result);
        setImportStatus({ 
          status: 'complete', 
          progress: result.tracks.length, 
          total: result.tracks.length,
          isTruncated: result.isTruncated 
        });
        // Keep "COMPLETE" visible for 3 seconds
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        throw new Error('No tracks found in the playlist.');
      }
    } catch (err) {
      console.error('[Library] Import failed:', err);
      setImportStatus({ status: 'error', error: err.message });
      // Keep error visible for 10 seconds or until user dismisses
      setTimeout(() => setImportStatus(null), 10000);
    }
  };

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
          <>
            <div className={styles.actions}>
              <button 
                className={styles.actionBtn}
                onClick={() => setShowCreate(true)}
              >
                + NEW PLAYLIST
              </button>
              <button 
                className={styles.actionBtn}
                onClick={() => setShowImport(true)}
              >
                ↓ IMPORT PLAYLIST
              </button>
            </div>
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
          </>
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

      <InputDialog 
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onConfirm={handleCreate}
        title="NEW PLAYLIST"
        placeholder="ENTER PLAYLIST NAME"
      />

      <InputDialog 
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        onConfirm={handleImport}
        title="IMPORT PLAYLIST"
        placeholder="PASTE SPOTIFY LINK"
      />

      <ImportProgress 
        isOpen={!!importStatus}
        {...importStatus}
      />
    </div>
  );
}
