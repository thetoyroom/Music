import React, { useState, useEffect } from 'react';

const customStyles = {
  root: {
    '--bg-base': '#050505',
    '--bg-main': '#0a0a0c',
    '--bg-surface': '#141517',
    '--bg-surface-hover': '#222326',
    '--text-primary': '#ffffff',
    '--text-secondary': '#888b94',
    '--accent': '#ff3300',
    '--border': '#222328',
    '--dots-color': 'rgba(255, 255, 255, 0.07)',
  },
};

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className}>
    <polyline points="7 7 17 7 17 17" />
    <line x1="7" y1="17" x2="17" y2="7" />
  </svg>
);

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ExploreNavIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const LibraryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const genres = [
  { label: 'Electronic', bg: '#1abc9c', textColor: 'text-white' },
  { label: 'Hip Hop', bg: '#e74c3c', textColor: 'text-white' },
  { label: 'Pop Hits', bg: '#3498db', textColor: 'text-white' },
  { label: 'R&B Soul', bg: '#9b59b6', textColor: 'text-white' },
  { label: 'Indie', bg: '#f1c40f', textColor: 'text-black' },
  { label: 'Jazz', bg: '#34495e', textColor: 'text-white' },
  { label: 'Rock', bg: '#d35400', textColor: 'text-white' },
  { label: 'Reggae', bg: '#27ae60', textColor: 'text-white' },
];

const trendingItems = [
  '1. Techno Summer',
  '2. Lo-Fi Beats',
  '3. Fred Again..',
];

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [recentSearches, setRecentSearches] = useState(['Overmono', 'After Hours']);
  const [activeNav, setActiveNav] = useState('explore');
  const [hoveredTrend, setHoveredTrend] = useState(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --bg-base: #050505;
        --bg-main: #0a0a0c;
        --bg-surface: #141517;
        --bg-surface-hover: #222326;
        --text-primary: #ffffff;
        --text-secondary: #888b94;
        --accent: #ff3300;
        --border: #222328;
        --dots-color: rgba(255, 255, 255, 0.07);
      }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .mobile-card { transition: transform 0.1s ease; }
      .mobile-card:active { transform: scale(0.98); }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const removeSearch = (term) => {
    setRecentSearches(prev => prev.filter(s => s !== term));
  };

  const clearSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-primary)',
        height: '844px',
        width: '390px',
        margin: '0 auto',
        ...customStyles.root,
      }}
      className="overflow-hidden flex flex-col font-sans antialiased"
    >
      {/* Header */}
      <header
        className="flex-shrink-0 pt-12 pb-4 px-5 z-30"
        style={{
          backgroundColor: 'var(--bg-base)',
          borderBottom: '2px solid var(--border)',
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-black tracking-tighter uppercase" style={{ color: 'var(--text-primary)' }}>
            Explore<span style={{ color: 'var(--accent)' }} className="ml-1">.</span>
          </h1>
          <div
            className="w-10 h-10 flex items-center justify-center shadow-sm"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '2px solid var(--border)',
              color: 'var(--text-primary)',
            }}
          >
            <UserIcon />
          </div>
        </div>

        <div className="relative w-full">
          <span
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-secondary)' }}
          >
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="ARTISTS, SONGS, GENRES..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full rounded-none py-3.5 pl-12 pr-4 focus:outline-none font-bold text-xs tracking-widest shadow-sm"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '2px solid var(--border)',
              color: 'var(--text-primary)',
              '::placeholder': { color: 'rgba(136, 139, 148, 0.6)' },
            }}
            onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; }}
            onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main
        className="flex-1 overflow-y-auto scrollbar-hide"
        style={{ backgroundColor: 'var(--bg-main)' }}
      >
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <section className="mt-6 px-5">
            <div className="flex justify-between items-center mb-4">
              <h2
                className="text-[10px] font-black tracking-[0.2em] uppercase"
                style={{ color: 'var(--text-secondary)' }}
              >
                Recent Searches
              </h2>
              <button
                onClick={clearSearches}
                className="text-[10px] font-black uppercase tracking-widest"
                style={{ color: 'var(--accent)' }}
              >
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((term) => (
                <div
                  key={term}
                  className="px-3 py-2 flex items-center gap-2"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '2px solid var(--border)',
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{term}</span>
                  <button onClick={() => removeSearch(term)} style={{ color: 'var(--text-primary)' }}>
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trending Now */}
        <section className="mt-8 px-5">
          <h2
            className="text-[10px] font-black tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Trending Now
          </h2>
          <div className="flex flex-col gap-1">
            {trendingItems.map((item, index) => (
              <button
                key={item}
                className="flex items-center justify-between py-3"
                style={{ borderBottom: '1px solid var(--border)' }}
                onMouseEnter={() => setHoveredTrend(index)}
                onMouseLeave={() => setHoveredTrend(null)}
              >
                <span
                  className="font-black text-lg tracking-tight uppercase"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  style={{ color: hoveredTrend === index ? 'var(--accent)' : 'var(--text-secondary)' }}
                >
                  <polyline points="7 7 17 7 17 17" />
                  <line x1="7" y1="17" x2="17" y2="7" />
                </svg>
              </button>
            ))}
          </div>
        </section>

        {/* Browse Genres */}
        <section className="mt-10 mb-12 px-5">
          <h2
            className="text-2xl font-black tracking-tight uppercase mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Browse Genres
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {genres.map((genre) => (
              <div
                key={genre.label}
                className={`aspect-[4/3] flex flex-col justify-end p-4 mobile-card cursor-pointer`}
                style={{
                  backgroundColor: genre.bg,
                  border: '2px solid var(--border)',
                }}
              >
                <span className={`font-black ${genre.textColor} uppercase tracking-widest text-sm`}>
                  {genre.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex-shrink-0 flex flex-col w-full z-50">
        {/* Mini Player */}
        <div
          className="h-16 flex items-center px-4 justify-between relative"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderTop: '2px solid var(--border)',
            boxShadow: '0 -8px 20px rgba(0,0,0,0.4)',
          }}
        >
          {/* Progress Bar */}
          <div
            className="absolute top-0 left-0 w-full h-[2px]"
            style={{ backgroundColor: 'var(--bg-surface-hover)' }}
          >
            <div
              className="h-full w-1/3"
              style={{ backgroundColor: 'var(--accent)' }}
            />
          </div>

          <div className="flex items-center gap-3 flex-1">
            <div
              className="w-10 h-10 flex-shrink-0"
              style={{
                backgroundColor: '#000000',
                border: '2px solid var(--border)',
              }}
            />
            <div className="flex flex-col truncate">
              <span
                className="font-black text-xs uppercase"
                style={{ color: 'var(--text-primary)' }}
              >
                Light Through The Veins
              </span>
              <span
                className="text-[10px] font-bold uppercase"
                style={{ color: 'var(--text-secondary)' }}
              >
                Jon Hopkins
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button style={{ color: 'var(--text-primary)' }}>
              <PlayIcon />
            </button>
          </div>
        </div>

        {/* Bottom Nav */}
        <nav
          className="h-[72px] flex items-center justify-around pb-2"
          style={{
            backgroundColor: 'var(--bg-base)',
            borderTop: '2px solid var(--border)',
          }}
        >
          {[
            { id: 'home', icon: <HomeIcon />, label: 'Home' },
            { id: 'explore', icon: <ExploreNavIcon filled={true} />, label: 'Explore' },
            { id: 'library', icon: <LibraryIcon />, label: 'Library' },
            { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
          ].map((navItem) => (
            <button
              key={navItem.id}
              onClick={() => setActiveNav(navItem.id)}
              className="flex flex-col items-center justify-center w-full h-full"
              style={{
                color: activeNav === navItem.id ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              {navItem.icon}
              <span className="text-[9px] font-black tracking-widest uppercase mt-1">
                {navItem.label}
              </span>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
};

export default App;