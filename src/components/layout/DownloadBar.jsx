import React, { useEffect } from 'react';
import { useAppStore } from '../../store/appStore';
import styles from './DownloadBar.module.css';

export const DownloadBar = () => {
  const downloads = useAppStore(s => s.downloads);
  const removeDownload = useAppStore(s => s.removeDownload);

  // Auto-dismiss completed downloads after 3 seconds
  useEffect(() => {
    downloads.forEach(d => {
      if (d.status === 'completed') {
        const timer = setTimeout(() => {
          removeDownload(d.id);
        }, 3000);
        return () => clearTimeout(timer);
      }
    });
  }, [downloads, removeDownload]);

  if (downloads.length === 0) return null;

  return (
    <div className={styles.islandContainer}>
      {downloads.map(d => (
        <div key={d.id} className={`${styles.island} ${d.status === 'completed' ? styles.islandCompleted : ''}`}>
          <div className={styles.islandContent}>
            <div className={styles.islandInfo}>
              <span className={styles.islandFilename}>{d.filename}</span>
              <span className={styles.islandStatus}>
                {d.status === 'completed' ? '✓ DONE' : `${Math.round(d.progress)}%`}
              </span>
            </div>
            <div className={styles.islandProgressTrack}>
              <div 
                className={styles.islandProgressFill} 
                style={{ 
                  width: `${d.progress}%`,
                  background: d.status === 'completed' ? '#00FF00' : 'var(--accent)'
                }} 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
