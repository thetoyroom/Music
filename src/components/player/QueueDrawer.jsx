import { usePlayerStore } from '../../store/playerStore';
import { XIcon, PlayIcon, TrashIcon, DragHandleIcon } from '../Icons';
import styles from './QueueDrawer.module.css';
import { useState } from 'react';

export function QueueDrawer({ isOpen, onClose }) {
  const { 
    queue, queueIndex, jumpToQueueIndex, removeFromQueue, moveInQueue, currentTrack 
  } = usePlayerStore();

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  if (!isOpen) return null;

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    // Set a ghost image or just let default happen
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    moveInQueue(draggedIndex, index);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={e => e.stopPropagation()}>
        <header className={styles.header}>
          <h3>PLAY QUEUE ({queue.length})</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <XIcon size={20} />
          </button>
        </header>

        <div className={styles.list}>
          {queue.length === 0 ? (
            <div className={styles.empty}>Queue is empty</div>
          ) : (
            queue.map((track, i) => {
              const isActive = i === queueIndex;
              return (
                <div 
                  key={`${track.id}-${i}`} 
                  className={`
                    ${styles.item} 
                    ${isActive ? styles.itemActive : ''} 
                    ${draggedIndex === i ? styles.dragging : ''}
                    ${dragOverIndex === i ? styles.dragOver : ''}
                  `}
                  draggable
                  onDragStart={(e) => handleDragStart(e, i)}
                  onDragOver={(e) => handleDragOver(e, i)}
                  onDrop={(e) => handleDrop(e, i)}
                  onDragEnd={handleDragEnd}
                >
                  <div className={styles.dragHandle}>
                    <DragHandleIcon size={16} />
                  </div>
                  <div className={styles.itemIndex}>{i + 1}</div>
                  <div className={styles.itemInfo} onClick={() => jumpToQueueIndex(i)}>
                    <div className={styles.itemTitle}>{track.title}</div>
                    <div className={styles.itemArtist}>{track.artist}</div>
                  </div>
                  
                  <div className={styles.itemActions}>
                    <button 
                      className={`${styles.actionBtn} ${styles.removeBtn}`}
                      onClick={() => removeFromQueue(i)}
                      title="Remove"
                    >
                      <XIcon size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
