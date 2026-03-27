import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { useAppStore } from '../../store/appStore.js';
import { SearchIcon, SunIcon, MoonIcon } from '../Icons.jsx';
import styles from './Header.module.css';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useAppStore((s) => s.theme);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const isSearchPage = location.pathname === '/search';

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val.trim())}`, { replace: isSearchPage });
    } else if (isSearchPage) {
      navigate('/search', { replace: true });
    }
  };

  useEffect(() => {
    if (!isSearchPage) setQuery('');
  }, [isSearchPage]);

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>
        STEQ<span>MUSIC</span>
        <span className={styles.logoAccent}>■</span>
      </NavLink>

      {/* Search bar */}
      <div className={styles.searchWrap}>
        <SearchIcon size={17} />
        <input
          ref={inputRef}
          type="search"
          placeholder="SEARCH ARTISTS, SONGS..."
          value={query}
          onChange={handleSearch}
          onFocus={() => { if (!isSearchPage) navigate('/search'); }}
          className={styles.searchInput}
        />
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button
          className={styles.iconBtn}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon size={17} /> : <MoonIcon size={17} />}
        </button>
      </div>
    </header>
  );
}
