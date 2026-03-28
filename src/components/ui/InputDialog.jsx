import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import styles from './InputDialog.module.css';

export function InputDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  placeholder, 
  initialValue = '', 
  confirmText = 'CONFIRM',
  type = 'text'
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (isOpen) setValue(initialValue);
  }, [isOpen, initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onConfirm(value.trim());
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <input
            type={type}
            className={styles.input}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            CANCEL
          </button>
          <button type="submit" className={styles.confirmBtn} disabled={!value.trim()}>
            {confirmText}
          </button>
        </div>
      </form>
    </Modal>
  );
}
