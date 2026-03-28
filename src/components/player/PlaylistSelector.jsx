import { useState } from 'react';
import { useAppStore } from '../../store/appStore';
import { PlusIcon, CheckIcon, XIcon } from '../Icons';
import { InputDialog } from '../ui/InputDialog';
import styles from './PlaylistSelector.module.css';

export function PlaylistSelector({ track, onClose }) {
  const playlists = useAppStore(s => s.playlists);
  const addTrackToPlaylist = useAppStore(s => s.addTrackToPlaylist);
  const createPlaylist = useAppStore(s => s.createPlaylist);
  
  const [showCreate, setShowCreate] = useState(false);

  const handleCreateAndAdd = (name) => {
    const id = createPlaylist(name);
    addTrackToPlaylist(id, track);
    onClose();
  };

  const handleAddToPlaylist = (playlistId) => {
    addTrackToPlaylist(playlistId, track);
    onClose();
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.container} onClick={e => e.stopPropagation()}>
          <header className={styles.header}>
            <h3>ADD TO PLAYLIST</h3>
            <button onClick={onClose} className={styles.closeBtn}>
              <XIcon size={20} />
            </button>
          </header>

          <div className={styles.list}>
            <button className={styles.createBtn} onClick={() => setShowCreate(true)}>
              <div className={styles.plusIcon}>
                <PlusIcon size={20} />
              </div>
              <span>New Playlist</span>
            </button>

            {playlists.map(p => {
               const alreadyIn = p.tracks.some(t => t.id === track.id);
               return (
                 <button 
                   key={p.id} 
                   className={styles.playlistItem}
                   onClick={() => !alreadyIn && handleAddToPlaylist(p.id)}
                   disabled={alreadyIn}
                 >
                   <div className={styles.itemInfo}>
                     <span className={styles.name}>{p.name}</span>
                     <span className={styles.count}>{p.tracks.length} tracks</span>
                   </div>
                   {alreadyIn && <CheckIcon size={18} className={styles.check} />}
                 </button>
               );
            })}
          </div>
        </div>
      </div>

      <InputDialog 
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onConfirm={handleCreateAndAdd}
        title="NEW PLAYLIST"
        placeholder="ENTER PLAYLIST NAME"
      />
    </>
  );
}
