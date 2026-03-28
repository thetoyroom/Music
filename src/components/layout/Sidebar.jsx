import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAppStore } from '../../store/appStore.js';
import {
  HomeIcon, ExploreIcon, LibraryIcon, SettingsIcon,
  SearchIcon, SunIcon, MoonIcon, XIcon,
} from '../Icons.jsx';
import styles from './Sidebar.module.css';

const navItems = [
  { to: '/', icon: HomeIcon, label: 'HOME', exact: true },
  { to: '/search', icon: SearchIcon, label: 'EXPLORE' },
  { to: '/library', icon: LibraryIcon, label: 'LIBRARY' },
];

const libraryLinks = [
  { to: '/library', label: 'LIKED SONGS' },
  { to: '/library/playlists', label: 'PLAYLISTS' },
  { to: '/library/recent', label: 'RECENTLY PLAYED' },
];

export function Sidebar({ isOpen, onClose, isMobile }) {
  const navigate = useNavigate();
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const [searchQ, setSearchQ] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQ(val);
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val.trim())}`, { replace: searchActive });
      setSearchActive(true);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && (
        <div 
          className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} 
          onClick={onClose}
        />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          <NavLink to="/" className={styles.logo}>
            STEQ<span>MUSIC</span>
            <span className={styles.logoAccent}>■</span>
          </NavLink>
          {isMobile && (
            <button className={styles.closeBtn} onClick={onClose}>
              <XIcon size={24} />
            </button>
          )}
        </div>

        {/* Main nav */}
        <div className={styles.navSection}>
          <div className={styles.navLabel}>MENU</div>
          <nav>
            {navItems.map(({ to, icon: Icon, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Library */}
        <div className={styles.navSection}>
          <div className={styles.navLabel}>LIBRARY</div>
          <nav>
            {libraryLinks.map(({ to, label }) => (
              <NavLink
                key={label}
                to={to}
                end
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
                }
              >
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className={styles.spacer} />

        {/* Bottom: theme + settings */}
        <div className={styles.bottom}>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
            }
          >
            <SettingsIcon size={18} />
            <span>SETTINGS</span>
          </NavLink>
          <button className={styles.themeBtn} onClick={toggleTheme}>
            {theme === 'dark' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
            <span>{theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
