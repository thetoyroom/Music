import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
  grad1: { background: 'linear-gradient(135deg, #2c3e50, #000000)' },
  grad2: { background: 'linear-gradient(135deg, #8e44ad, #2c3e50)' },
  grad3: { background: 'linear-gradient(135deg, #d35400, #c0392b)' },
  grad4: { background: 'linear-gradient(135deg, #16a085, #2980b9)' },
  grad5: { background: 'linear-gradient(135deg, #7f8c8d, #2c3e50)' },
  grad6: { background: 'linear-gradient(135deg, #c0392b, #8e44ad)' },
  grad7: { background: 'linear-gradient(135deg, #2980b9, #2c3e50)' },
  grad8: { background: 'linear-gradient(135deg, #f39c12, #d35400)' },
};

const playlists = [
  { id: 1, name: 'Midnight Sessions', duration: '2h 14m', tracks: 42, grad: customStyles.grad1, dots: true },
  { id: 2, name: 'Deep Work Flow', duration: '6h 45m', tracks: 128, grad: customStyles.grad4, dots: false },
  { id: 3, name: 'Sunrise Beats', duration: '58m', tracks: 18, grad: customStyles.grad8, dots: false },
  { id: 4, name: 'Vibe Theory', duration: '3h 22m', tracks: 64, grad: customStyles.grad6, dots: false },
  { id: 5, name: 'Dark Techno', duration: '1h 45m', tracks: 20, grad: customStyles.grad2, dots: true },
  { id: 6, name: 'Rainy Day Jazz', duration: '4h 10m', tracks: 88, grad: customStyles.grad5, dots: false },
  { id: 7, name: '80s Rewind', duration: '1h 58m', tracks: 31, grad: customStyles.grad7, dots: false },
];

const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const PlaylistCard = ({ playlist, isLight }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="aspect-square border-2 mb-4 relative overflow-hidden transition-transform duration-300 shadow-sm"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border)',
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          boxShadow: hovered && isLight ? '4px 4px 0px 0px #0a0a0c' : hovered ? '0 8px 30px rgba(0,0,0,0.4)' : '',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            ...playlist.grad,
            opacity: 0.9,
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.7s ease',
            ...(playlist.dots ? {
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            } : {}),
          }}
        ></div>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            backdropFilter: hovered ? 'blur(2px)' : 'none',
          }}
        >
          <button
            className="w-14 h-14 flex items-center justify-center text-white shadow-xl"
            style={{
              backgroundColor: 'var(--accent)',
              transform: hovered ? 'scale(1)' : 'scale(0.75)',
              transition: 'transform 0.3s ease',
              border: isLight ? '2px solid #0a0a0c' : '2px solid transparent',
            }}
          >
            <PlayIcon />
          </button>
        </div>
        <div
          className="absolute bottom-3 right-3 px-2 py-1 text-[9px] font-black text-white tracking-widest uppercase"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
        >
          {playlist.tracks} Tracks
        </div>
      </div>
      <h3 className="font-black text-lg truncate uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
        {playlist.name}
      </h3>
      <div className="flex items-center justify-between mt-1">
        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
          {playlist.duration}
        </p>
        <span className="w-1.5 h-1.5" style={{ backgroundColor: 'var(--accent)' }}></span>
      </div>
    </div>
  );
};

const Sidebar = ({ isLight }) => (
  <aside
    className="w-[260px] flex flex-col z-30 transition-colors duration-300 flex-shrink-0"
    style={{ backgroundColor: 'var(--bg-base)', borderRight: '1px solid var(--border)' }}
  >
    <div
      className="h-24 flex items-center px-8"
      style={{ borderBottom: '1px solid rgba(34,35,40,0.5)' }}
    >
      <a href="#" className="font-black text-2xl tracking-tighter uppercase flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
        STEQMUSIC<span className="text-3xl leading-none -mt-1" style={{ color: 'var(--accent)' }}>■</span>
      </a>
    </div>

    <div className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-10" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      <div>
        <div className="px-4 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--text-secondary)' }}>Menu</div>
        <nav className="space-y-1">
          {['HOME', 'EXPLORE', 'TRENDING'].map((item) => (
            <a
              key={item}
              href="#"
              className="flex items-center gap-4 px-4 py-3 rounded-md font-semibold transition-all"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <div>
        <div className="px-4 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--text-secondary)' }}>Library</div>
        <nav className="space-y-1">
          {['RECENT', 'ARTISTS', 'IMPORT'].map((item) => (
            <a
              key={item}
              href="#"
              className="flex items-center gap-4 px-4 py-3 rounded-md font-semibold transition-all"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {item}
            </a>
          ))}
          <a
            href="#"
            className="flex items-center gap-4 px-4 py-3 rounded-md font-bold transition-all"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#ffffff',
              border: isLight ? '2px solid #0a0a0c' : '2px solid transparent',
              boxShadow: isLight ? '4px 4px 0px 0px #0a0a0c' : 'none',
            }}
          >
            PLAYLISTS
          </a>
        </nav>
      </div>
    </div>

    <div className="p-4" style={{ borderTop: '1px solid rgba(34,35,40,0.5)' }}>
      <a
        href="#"
        className="flex items-center gap-3 px-4 py-3 rounded-md font-bold transition-all"
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        SETTINGS
      </a>
    </div>
  </aside>
);

const Header = ({ isLight, onThemeToggle, searchValue, onSearchChange }) => (
  <header
    className="h-24 absolute top-0 w-full z-20 flex items-center justify-between px-10 backdrop-blur-xl"
    style={{
      backgroundColor: 'var(--glass-bg)',
      borderBottom: '1px solid var(--border)',
    }}
  >
    <div className="relative w-full max-w-xl group">
      <svg
        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
        style={{ color: 'var(--text-secondary)' }}
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        placeholder="SEARCH YOUR PLAYLISTS..."
        value={searchValue}
        onChange={e => onSearchChange(e.target.value)}
        className="w-full rounded-none py-3.5 pl-12 pr-4 focus:outline-none font-semibold text-xs tracking-wider transition-all shadow-sm"
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
      />
    </div>

    <div className="flex items-center gap-6">
      <button
        onClick={onThemeToggle}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border)',
          color: 'var(--text-secondary)',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
      >
        {isLight ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </button>

      <div className="flex items-center gap-4 cursor-pointer group">
        <div className="text-right hidden md:block">
          <div
            className="text-xs font-bold uppercase tracking-wider transition-colors"
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            USER_992
          </div>
          <div className="text-[10px] uppercase font-semibold" style={{ color: 'var(--text-secondary)' }}>Premium</div>
        </div>
        <div
          className="w-12 h-12 flex items-center justify-center transition-all shadow-sm"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '2px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
    </div>
  </header>
);

const Footer = ({ isLight, isPlaying, setIsPlaying }) => {
  return (
    <footer
      className="h-[100px] w-full flex items-center justify-between px-8 z-50 transition-colors duration-300 flex-shrink-0"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '2px solid var(--border)',
        boxShadow: isLight ? 'none' : '0 -4px 20px rgba(0,0,0,0.2)',
      }}
    >
      <div className="flex items-center gap-6 w-1/3 min-w-[250px]">
        <div className="w-16 h-16 flex-shrink-0 shadow-sm" style={{ ...customStyles.grad1, border: '2px solid var(--border)' }}></div>
        <div className="flex flex-col truncate pr-4">
          <a
            href="#"
            className="font-black text-sm truncate uppercase tracking-wide transition-colors"
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            Light Through The Veins
          </a>
          <a
            href="#"
            className="text-xs font-semibold truncate mt-1 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            Jon Hopkins
          </a>
        </div>
        <div className="flex items-center gap-3 ml-2">
          <button
            className="transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-1/3 max-w-[500px]">
        <div className="flex items-center gap-6 mb-2">
          <button className="transition-colors" style={{ color: 'var(--text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </button>
          <button className="transition-colors" style={{ color: 'var(--text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 flex items-center justify-center text-white hover:scale-105 transition-transform"
            style={{
              backgroundColor: 'var(--accent)',
              border: isLight ? '2px solid #0a0a0c' : '2px solid transparent',
              boxShadow: isLight ? '4px 4px 0px 0px #0a0a0c' : 'none',
            }}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
          <button className="transition-colors" style={{ color: 'var(--text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
          <button className="transition-colors" style={{ color: 'var(--text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
          </button>
        </div>

        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>3:14</span>
          <div
            className="h-2 flex-1 relative cursor-pointer group overflow-hidden"
            style={{ backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border)' }}
          >
            <div
              className="absolute left-0 top-0 h-full transition-colors"
              style={{ backgroundColor: 'var(--accent)', width: '33.33%' }}
            ></div>
          </div>
          <span className="text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>9:21</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-5 w-1/3 min-w-[200px]">
        <button className="transition-colors" style={{ color: 'var(--text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
          </svg>
        </button>
        <div className="flex items-center gap-3 group w-32">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-secondary)' }}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <div
            className="h-2 flex-1 relative cursor-pointer"
            style={{ backgroundColor: 'var(--bg-surface-hover)', border: '1px solid var(--border)' }}
          >
            <div className="absolute left-0 top-0 h-full w-2/3" style={{ backgroundColor: 'var(--text-primary)' }}></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PlaylistsPage = ({ isLight, searchValue, onSearchChange, onThemeToggle, isPlaying, setIsPlaying }) => {
  const [sortBy, setSortBy] = useState('Recently Played');

  const filteredPlaylists = playlists.filter(p =>
    p.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const sortedPlaylists = [...filteredPlaylists].sort((a, b) => {
    if (sortBy === 'Alphabetical') return a.name.localeCompare(b.name);
    if (sortBy === 'Track Count') return b.tracks - a.tracks;
    return 0;
  });

  return (
    <div className="flex flex-1 overflow-hidden h-full relative">
      <Sidebar isLight={isLight} />

      <main className="flex-1 flex flex-col relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Header
          isLight={isLight}
          onThemeToggle={onThemeToggle}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
        />

        <div className="flex-1 overflow-y-auto pb-40 pt-32 px-10 relative z-10" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--accent)' }}>Your Collection</div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase" style={{ color: 'var(--text-primary)' }}>Playlists</h1>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="flex items-center px-4 py-2 gap-3"
                style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Sort By:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-[10px] font-black uppercase focus:ring-0 cursor-pointer"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <option>Recently Played</option>
                  <option>Alphabetical</option>
                  <option>Track Count</option>
                </select>
              </div>
              <button
                className="p-3 transition-colors"
                style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            <div className="group cursor-pointer">
              <div
                className="aspect-square flex flex-col items-center justify-center gap-4 transition-all mb-4 shadow-sm"
                style={{
                  backgroundColor: 'var(--bg-base)',
                  border: '2px dashed var(--border)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-base)';
                }}
              >
                <div
                  className="w-16 h-16 flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '2px solid var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
                <span className="font-black text-xs uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Create New Playlist</span>
              </div>
            </div>

            {sortedPlaylists.map(playlist => (
              <PlaylistCard key={playlist.id} playlist={playlist} isLight={isLight} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [isLight, setIsLight] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

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
        --hero-bg: #0a0a0c;
        --shadow-brutal: none;
        --glass-bg: rgba(10, 10, 12, 0.85);
        --dots-color: rgba(255, 255, 255, 0.07);
      }
      [data-theme="light"] {
        --bg-base: #e6e4dc;
        --bg-main: #f3f2ee;
        --bg-surface: #ffffff;
        --bg-surface-hover: #eae8e1;
        --text-primary: #0a0a0c;
        --text-secondary: #666870;
        --accent: #ff3300;
        --border: #d0ceca;
        --hero-bg: #f9f8f5;
        --shadow-brutal: 4px 4px 0px 0px #0a0a0c;
        --glass-bg: rgba(243, 242, 238, 0.85);
        --dots-color: rgba(10, 10, 12, 0.1);
      }
      body {
        background-color: var(--bg-base);
        color: var(--text-primary);
        font-family: 'Inter', sans-serif;
      }
      ::selection {
        background-color: #ff3300;
        color: white;
      }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const savedTheme = localStorage.getItem('theme');
    const preferLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const shouldBeLight = savedTheme === 'light' || (!savedTheme && preferLight);
    setIsLight(shouldBeLight);
    if (shouldBeLight) {
      document.documentElement.setAttribute('data-theme', 'light');
    }

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleThemeToggle = () => {
    const newIsLight = !isLight;
    setIsLight(newIsLight);
    if (newIsLight) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <Router basename="/">
      <div
        className="h-screen w-screen overflow-hidden flex flex-col antialiased"
        style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <PlaylistsPage
                isLight={isLight}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                onThemeToggle={handleThemeToggle}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            }
          />
        </Routes>
        <Footer isLight={isLight} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </div>
    </Router>
  );
};

export default App;