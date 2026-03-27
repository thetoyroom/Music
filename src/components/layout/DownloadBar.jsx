import React from 'react';
import { useAppStore } from '../../store/appStore';
import styles from './DownloadBar.module.css';

export const DownloadBar = () => {
  const downloads = useAppStore(s => s.downloads);
  const removeDownload = useAppStore(s => s.removeDownload);

  const activeDownloads = downloads.filter(d => d.status !== 'completed');
  const completedDownloads = downloads.filter(d => d.status === 'completed');

  if (downloads.length === 0) return null;

  return (
    <div className={styles.container}>
      {downloads.map(d => (
        <div key={d.id} className={styles.item}>
          <div className={styles.info}>
            <span className={styles.filename}>{d.filename}</span>
            <span className={styles.status}>
              {d.status === 'completed' ? 'DOWNLOAD COMPLETE' : `${Math.round(d.progress)}%`}
            </span>
            {d.status === 'completed' && (
              <button className={styles.close} onClick={() => removeDownload(d.id)}>×</button>
            )}
          </div>
          <div className={styles.progressTrack}>
            <div 
              className={styles.progressFill} 
              style={{ 
                width: `${d.progress}%`,
                background: d.status === 'completed' ? '#00FF00' : 'var(--accent)'
              }} 
            />
          </div>
        </div>
      ))}
    </div>
  );
};
