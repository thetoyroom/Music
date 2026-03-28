import { motion, AnimatePresence } from 'framer-motion';
import styles from './ConfirmDialog.module.css';

export function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'CONFIRM',
  cancelText = 'CANCEL',
  type = 'danger' 
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          <motion.div 
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className={`${styles.dialog} ${styles[type]}`}
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.message}>{message}</p>
            
            <div className={styles.actions}>
              <button 
                className={styles.cancelBtn} 
                onClick={onClose}
              >
                {cancelText}
              </button>
              <button 
                className={styles.confirmBtn} 
                onClick={(e) => {
                  e.stopPropagation();
                  onConfirm();
                  onClose();
                }}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
