import { useAppStore } from '../store/appStore.js';
import { usePlayerStore } from '../store/playerStore.js';
import { ChevronRightIcon } from '../components/Icons.jsx';
import styles from './SettingsPage.module.css';

export default function SettingsPage() {
  const {
    theme, toggleTheme, quality, setQuality,
    gaplessPlayback, setGaplessPlayback
  } = useAppStore();
  const { clearQueue } = usePlayerStore();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Settings</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>App Preferences</h2>

        <div className={styles.row}>
          <div className={styles.rowInfo}>
            <span className={styles.rowLabel}>Theme</span>
            <span className={styles.rowDesc}>Switch between Dark and Brutalist Light</span>
          </div>
          <button className={styles.toggleBtn} onClick={toggleTheme}>
            {theme === 'dark' ? 'DARK MODE' : 'LIGHT MODE'}
          </button>
        </div>

        <div className={styles.row}>
          <div className={styles.rowInfo}>
            <span className={styles.rowLabel}>Audio Quality</span>
            <span className={styles.rowDesc}>Requires DASH manifest support on instance</span>
          </div>
          <select
            className={styles.select}
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
          >
            <option value="HI_RES_LOSSLESS">Hi-Res FLAC (Max)</option>
            <option value="LOSSLESS">Lossless (CD Quality)</option>
            <option value="HIGH">High (320kbps)</option>
            <option value="LOW">Normal (128kbps)</option>
          </select>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Playback</h2>

        <div className={styles.row}>
          <div className={styles.rowInfo}>
            <span className={styles.rowLabel}>Gapless Playback</span>
            <span className={styles.rowDesc}>Eliminate silence between tracks</span>
          </div>
          <button 
            className={styles.toggleBtn} 
            onClick={() => setGaplessPlayback(!gaplessPlayback)}
          >
            {gaplessPlayback ? 'ON' : 'OFF'}
          </button>
        </div>

        <div className={styles.row}>
          <div className={styles.rowInfo}>
            <span className={styles.rowLabel}>Clear Queue</span>
            <span className={styles.rowDesc}>Stop playback and clear current queue</span>
          </div>
          <button className={styles.actionBtn} onClick={clearQueue}>
            CLEAR
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>About</h2>

        <div className={styles.linkRow}>
          <span className={styles.rowLabel}>Version</span>
          <span className={styles.versionLabel}>2.0.0-rc1</span>
        </div>
      </div>
    </div>
  );
}
