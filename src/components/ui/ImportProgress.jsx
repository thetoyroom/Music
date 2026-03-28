import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { SpinnerIcon } from '../Icons';
import styles from './ImportProgress.module.css';

export function ImportProgress({ isOpen, status, progress, currentTrack, total, error, isTruncated }) {
  const percentage = total > 0 ? Math.round((progress / total) * 100) : 0;

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="IMPORTING PLAYLIST" maxWidth="450px">
      <div className={styles.container}>
        {currentTrack?.playlistName && (
          <div className={styles.playlistHeader}>
            <span className={styles.playlistName}>{currentTrack.playlistName}</span>
          </div>
        )}
        <div className={styles.meta}>
          <div className={styles.status}>
            {status === 'loading' ? (
              <>
                <SpinnerIcon className={styles.spinner} size={24} />
                <span>FETCHING METADATA...</span>
              </>
            ) : status === 'error' ? (
              <span className={styles.statusError}>ERROR: {error || 'Import Failed'}</span>
            ) : status === 'complete' ? (
              <span className={styles.statusSuccess}>IMPORT COMPLETE!</span>
            ) : (
              <>
                <SpinnerIcon className={styles.spinner} size={24} />
                <span>MATCHING TRACKS: {progress} / {total}</span>
              </>
            )}
          </div>
          <span className={`${styles.percentage} ${status === 'complete' ? styles.percentageSuccess : ''}`}>{percentage}%</span>
        </div>

        <div className={styles.progressTrack}>
          <motion.div 
            className={`${styles.progressFill} ${status === 'complete' ? styles.progressFillComplete : status === 'error' ? styles.progressFillError : ''}`}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ type: 'spring', damping: 20 }}
          />
        </div>

        {(currentTrack && status !== 'complete') && (
          <div className={styles.current}>
            <span className={styles.label}>SEARCHING FOR:</span>
            <span className={styles.trackName}>{currentTrack.title}</span>
            <span className={styles.artistName}>{currentTrack.artist}</span>
          </div>
        )}

        {isTruncated && status === 'complete' && (
          <div className={styles.truncatedWarning}>
            ⚠️ NOTICE: Only the first {total} tracks could be imported due to platform scraping limits.
          </div>
        )}

        <p className={styles.hint}>
          {status === 'complete' 
            ? 'Playlist successfully added to your library.' 
            : status === 'error'
            ? 'Please check the link and try again.'
            : 'Please wait while we find matches in our high-fidelity database.'}
        </p>
      </div>
    </Modal>
  );
}
