import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
    '--hero-bg': '#0a0a0c',
    '--shadow-brutal': 'none',
    '--glass-bg': 'rgba(10, 10, 12, 0.85)',
    '--dots-color': 'rgba(255, 255, 255, 0.07)',
  },
  rootLight: {
    '--bg-base': '#e6e4dc',
    '--bg-main': '#f3f2ee',
    '--bg-surface': '#ffffff',
    '--bg-surface-hover': '#eae8e1',
    '--text-primary': '#0a0a0c',
    '--text-secondary': '#666870',
    '--accent': '#ff3300',
    '--border': '#d0ceca',
    '--hero-bg': '#f9f8f5',
    '--shadow-brutal': '4px 4px 0px 0px #0a0a0c',
    '--glass-bg': 'rgba(243, 242, 238, 0.85)',
    '--dots-color': 'rgba(10, 10, 12, 0.1)',
  }
};

const gradients = {
  grad1: { background: 'linear-gradient(135deg, #2c3e50, #000000)' },
  grad2: { background: 'linear-gradient(135deg, #8e44ad, #2c3e50)' },
  grad3: { background: 'linear-gradient(135deg, #d35400, #c0392b)' },
  grad4: { background: 'linear-gradient(135deg, #16a085, #2980b9)' },
  grad5: { background: 'linear-gradient(135deg, #7f8c8d, #2c3e50)' },
  grad6: { background: 'linear-gradient(135deg, #c0392b, #8e44ad)' },
  grad7: { background: 'linear-gradient(135deg, #2980b9, #2c3e50)' },
  grad8: { background: 'linear-gradient(135deg, #f39c12, #d35400)' },
};

const SunIcon = () => (
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
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const PlayIcon = ({ size = 16 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const DotsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1"></circle>
    <circle cx="12" cy="5" r="1"></circle>
    <circle cx="12" cy="19" r="1"></circle>
  </svg>
);

const SearchIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const HomeIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'currentColor'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const ExploreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const LibraryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const ChevronIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const trendingSongs = [
  { id: 1, title: 'Starboy', artist: 'The Weeknd, Daft Punk', grad: 'grad7' },
  { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', grad: 'grad8' },
  { id: 3, title: 'As It Was', artist: 'Harry Styles', grad: 'grad1' },
  { id: 4, title: 'Bad Habit', artist: 'Steve Lacy', grad: 'grad4' },
  { id: 5, title: 'Anti-Hero', artist: 'Taylor Swift', grad: 'grad5' },
];

const jumpBackItems = [
  { id: 1, title: 'Midnight City', subtitle: 'Electronic Focus', grad: 'grad1', hasPlay: true },
  { id: 2, title: 'Acoustic Mornings', subtitle: 'Chill • Coffee', grad: 'grad2', hasPlay: false },
  { id: 3, title: 'Daily Mix 1', subtitle: 'Made for You', grad: 'grad3', hasPlay: false },
  { id: 4, title: 'Jon Hopkins', subtitle: 'Artist', grad: 'grad4', hasPlay: false },
  { id: 5, title: 'Deep Focus', subtitle: 'Ambient Space', grad: 'grad5', hasPlay: false },
];

const genres = [
  { label: 'Electronic', bg: '#1abc9c', textColor: 'white' },
  { label: 'Hip Hop', bg: '#e74c3c', textColor: 'white' },
  { label: 'Pop', bg: '#3498db', textColor: 'white' },
  { label: 'R&B', bg: '#9b59b6', textColor: 'white' },
  { label: 'Indie', bg: '#f1c40f', textColor: 'black' },
  { label: 'Jazz', bg: '#34495e', textColor: 'white' },
];

const Header = ({ isLight, onToggleTheme, searchValue, onSearchChange }) => {
  return (
    <header
      className="flex-shrink-0 pt-12 pb-4 px-5 border-b-2 z-30 relative transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-base)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <a href="#" className="font-black text-2xl tracking-tighter uppercase flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
          STEQMUSIC<span style={{ color: 'var(--accent)', fontSize: '1.875rem', lineHeight: 1 }} className="-mt-1">■</span>
        </a>
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-none flex items-center justify-center transition-all shadow-sm"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '2px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {isLight ? <MoonIcon /> : <SunIcon />}
          </button>
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
      </div>

      <div className="relative w-full group" style={isLight ? { marginRight: '4px', marginBottom: '4px' } : {}}>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: searchValue ? 'var(--accent)' : 'var(--text-secondary)' }}>
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="SEARCH ARTISTS, SONGS..."
          value={searchValue}
          onChange={onSearchChange}
          className="w-full rounded-none py-3 pl-12 pr-4 focus:outline-none font-semibold text-xs tracking-wider transition-all shadow-sm"
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '2px solid var(--border)',
            color: 'var(--text-primary)',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--border)'; }}
        />
      </div>
    </header>
  );
};

const HeroSection = ({ isLight }) => {
  const dotsStyle = {
    backgroundImage: 'radial-gradient(var(--dots-color) 1.5px, transparent 1.5px)',
    backgroundSize: '24px 24px',
  };
  return (
    <section
      className="m-5 relative border-2 overflow-hidden transition-all"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--hero-bg)',
        boxShadow: isLight ? 'var(--shadow-brutal)' : 'none',
      }}
    >
      <div className="p-6 relative z-10 flex flex-col justify-center h-full" style={dotsStyle}>
        <div
          className="flex items-center gap-0 mb-6 w-max border-2 shadow-sm"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-surface)' }}
        >
          <div className="w-6 h-6 flex items-center justify-center text-white" style={{ backgroundColor: 'var(--accent)' }}>
            <ChevronIcon />
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] px-2" style={{ color: 'var(--text-primary)' }}>Trending Global</span>
        </div>

        <h1 className="text-5xl font-black leading-[0.85] tracking-tighter uppercase mb-6 break-words" style={{ color: 'var(--text-primary)' }}>
          Winter<br />Audio<br />Sessions
        </h1>

        <div className="border-l-4 pl-4 mb-8" style={{ borderColor: 'var(--accent)' }}>
          <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            The cold is here. Immerse yourself in the dark atmospheric soundscapes dominating the charts.
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <button
            className="w-full text-white font-black py-4 px-6 text-sm tracking-widest uppercase flex items-center justify-center gap-3 active:scale-95 transition-all border-2 border-transparent"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            PLAY PLAYLIST
            <PlayIcon size={16} />
          </button>
          <div
            className="w-full border-2 py-3 px-4 text-[10px] text-center font-black uppercase tracking-[0.2em] shadow-sm"
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
            }}
          >
            Updated 9 AM
          </div>
        </div>
      </div>
      <div
        className="absolute right-[-20%] bottom-[-10%] w-64 h-64 border-4 rounded-full blur-2xl opacity-50 z-0"
        style={{ borderColor: 'rgba(255,51,0,0.1)' }}
      ></div>
    </section>
  );
};

const JumpBackIn = ({ isLight }) => {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-end mb-4 px-5">
        <h2 className="text-2xl font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>Jump Back In</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-6 pt-2 snap-x px-5" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        {jumpBackItems.map((item) => (
          <div
            key={item.id}
            className="flex-none w-36 snap-start cursor-pointer group"
            style={isLight ? { marginRight: '4px', marginBottom: '4px' } : {}}
          >
            <div
              className="w-full aspect-square mb-3 relative overflow-hidden shadow-sm"
              style={{ backgroundColor: 'var(--bg-surface)', border: '2px solid var(--border)' }}
            >
              <div className="absolute inset-0 opacity-80 transition-opacity" style={gradients[item.grad]}></div>
              {item.hasPlay && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-[1px]">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white shadow-xl border-2 border-transparent"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    <PlayIcon size={16} />
                  </div>
                </div>
              )}
            </div>
            <h3 className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
            <p className="text-[10px] font-bold mt-1 truncate uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{item.subtitle}</p>
          </div>
        ))}
        <div
          className="flex-none w-36 snap-start"
          style={isLight ? { marginRight: '4px', marginBottom: '4px' } : {}}
        >
          <div
            className="w-full aspect-square mb-3 relative overflow-hidden flex items-center justify-center shadow-sm"
            style={{ backgroundColor: 'var(--bg-surface)', border: '2px solid var(--border)' }}
          >
            <span className="font-black uppercase tracking-widest text-xs" style={{ color: 'var(--text-secondary)' }}>View All</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrendingNow = ({ isLight }) => {
  return (
    <section className="mb-10 px-5">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>Trending Now</h2>
      </div>
      <div className="flex flex-col gap-3">
        {trendingSongs.map((song) => (
          <div
            key={song.id}
            className="flex items-center gap-3 p-2 border-2 transition-colors shadow-sm cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border)',
              ...(isLight ? { marginRight: '4px', marginBottom: '4px' } : {}),
            }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)'; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
          >
            <div
              className="w-12 h-12 flex-shrink-0 relative flex items-center justify-center border"
              style={{ ...gradients[song.grad], borderColor: 'var(--border)' }}
            >
              {song.id === 1 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayIcon size={16} />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold truncate text-sm" style={{ color: 'var(--text-primary)' }}>{song.title}</h4>
              <p className="text-[10px] truncate mt-0.5 font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{song.artist}</p>
            </div>
            <button className="p-2" style={{ color: 'var(--text-secondary)' }}>
              <DotsIcon />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const ExploreGenres = ({ isLight }) => {
  return (
    <section className="mb-10 px-5">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>Explore Genres</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 pb-8">
        {genres.map((genre) => (
          <div
            key={genre.label}
            className="h-20 border-2 flex items-center justify-center shadow-sm cursor-pointer"
            style={{
              backgroundColor: genre.bg,
              borderColor: 'var(--border)',
              ...(isLight ? { marginRight: '4px', marginBottom: '4px' } : {}),
            }}
          >
            <span
              className="font-black uppercase tracking-widest text-xs"
              style={{ color: genre.textColor }}
            >
              {genre.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const MiniPlayer = ({ isLight, isPlaying, onTogglePlay, isLiked, onToggleLike }) => {
  return (
    <div
      className="h-16 border-t-2 flex items-center px-4 justify-between relative z-20"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border)',
        boxShadow: isLight ? 'none' : '0 -8px 20px rgba(0,0,0,0.4)',
      }}
    >
      <div className="absolute top-0 left-0 w-full h-[2px]" style={{ backgroundColor: 'var(--bg-surface-hover)' }}>
        <div className="h-full w-1/3" style={{ backgroundColor: 'var(--accent)' }}></div>
      </div>

      <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
        <div
          className="w-10 h-10 border-2 flex-shrink-0 shadow-sm"
          style={{ ...gradients.grad1, borderColor: 'var(--border)' }}
        ></div>
        <div className="flex flex-col truncate">
          <span className="font-black text-xs truncate uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>Light Through The Veins</span>
          <span className="text-[10px] font-bold truncate mt-0.5 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Jon Hopkins</span>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        <button
          onClick={onToggleLike}
          className="transition-colors"
          style={{ color: isLiked ? 'var(--accent)' : 'var(--text-secondary)' }}
        >
          <HeartIcon />
        </button>
        <button
          onClick={onTogglePlay}
          className="transition-transform active:scale-90"
          style={{ color: 'var(--text-primary)' }}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', Icon: HomeIcon },
    { id: 'explore', label: 'Explore', Icon: ExploreIcon },
    { id: 'library', label: 'Library', Icon: LibraryIcon },
    { id: 'settings', label: 'Settings', Icon: SettingsIcon },
  ];

  return (
    <nav
      className="h-[72px] border-t-2 flex items-center justify-around pb-2 z-10 relative"
      style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}
    >
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors"
          style={{ color: activeTab === id ? 'var(--accent)' : 'var(--text-secondary)' }}
        >
          <Icon filled={activeTab === id} />
          <span className="text-[9px] font-black tracking-widest uppercase">{label}</span>
        </button>
      ))}
    </nav>
  );
};

const HomePage = ({ isLight }) => (
  <main
    className="flex-1 overflow-y-auto relative z-10 transition-colors duration-300"
    style={{ backgroundColor: 'var(--bg-main)', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
  >
    <HeroSection isLight={isLight} />
    <JumpBackIn isLight={isLight} />
    <TrendingNow isLight={isLight} />
    <ExploreGenres isLight={isLight} />
  </main>
);

const ExplorePage = ({ isLight }) => (
  <main
    className="flex-1 overflow-y-auto relative z-10 transition-colors duration-300 px-5 pt-6"
    style={{ backgroundColor: 'var(--bg-main)', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
  >
    <h2 className="text-2xl font-black tracking-tight uppercase mb-4" style={{ color: 'var(--text-primary)' }}>Explore Genres</h2>
    <div className="grid grid-cols-2 gap-3 pb-8">
      {genres.map((genre) => (
        <div
          key={genre.label}
          className="h-24 border-2 flex items-center justify-center shadow-sm cursor-pointer"
          style={{ backgroundColor: genre.bg, borderColor: 'var(--border)' }}
        >
          <span className="font-black uppercase tracking-widest text-xs" style={{ color: genre.textColor }}>{genre.label}</span>
        </div>
      ))}
    </div>
  </main>
);

const LibraryPage = ({ isLight }) => (
  <main
    className="flex-1 overflow-y-auto relative z-10 transition-colors duration-300 px-5 pt-6"
    style={{ backgroundColor: 'var(--bg-main)', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
  >
    <h2 className="text-2xl font-black tracking-tight uppercase mb-4" style={{ color: 'var(--text-primary)' }}>Your Library</h2>
    <div className="flex flex-col gap-3">
      {trendingSongs.map((song) => (
        <div
          key={song.id}
          className="flex items-center gap-3 p-2 border-2 transition-colors shadow-sm cursor-pointer"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
        >
          <div className="w-12 h-12 flex-shrink-0 border" style={{ ...gradients[song.grad], borderColor: 'var(--border)' }}></div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold truncate text-sm" style={{ color: 'var(--text-primary)' }}>{song.title}</h4>
            <p className="text-[10px] truncate mt-0.5 font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>{song.artist}</p>
          </div>
          <button className="p-2" style={{ color: 'var(--text-secondary)' }}>
            <DotsIcon />
          </button>
        </div>
      ))}
    </div>
  </main>
);

const SettingsPage = ({ isLight, onToggleTheme }) => (
  <main
    className="flex-1 overflow-y-auto relative z-10 transition-colors duration-300 px-5 pt-6"
    style={{ backgroundColor: 'var(--bg-main)', msOverflowStyle: 'none', scrollbarWidth: 'none' }}
  >
    <h2 className="text-2xl font-black tracking-tight uppercase mb-6" style={{ color: 'var(--text-primary)' }}>Settings</h2>
    <div className="flex flex-col gap-3">
      <div
        className="flex items-center justify-between p-4 border-2"
        style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
      >
        <span className="font-black uppercase tracking-widest text-xs" style={{ color: 'var(--text-primary)' }}>Theme</span>
        <button
          onClick={onToggleTheme}
          className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider"
          style={{ color: 'var(--accent)' }}
        >
          {isLight ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
      {['Audio Quality', 'Notifications', 'Privacy', 'About'].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between p-4 border-2 cursor-pointer"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
        >
          <span className="font-black uppercase tracking-widest text-xs" style={{ color: 'var(--text-primary)' }}>{item}</span>
          <ChevronIcon />
        </div>
      ))}
    </div>
  </main>
);

const App = () => {
  const [isLight, setIsLight] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchValue, setSearchValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      * { -webkit-tap-highlight-color: transparent; }
      ::selection { background-color: #ff3300; color: white; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const vars = isLight ? customStyles.rootLight : customStyles.root;
    Object.entries(vars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    document.body.style.backgroundColor = vars['--bg-base'];
    document.body.style.color = vars['--text-primary'];
  }, [isLight]);

  const toggleTheme = () => setIsLight(prev => !prev);

  const renderPage = () => {
    switch (activeTab) {
      case 'home': return <HomePage isLight={isLight} />;
      case 'explore': return <ExplorePage isLight={isLight} />;
      case 'library': return <LibraryPage isLight={isLight} />;
      case 'settings': return <SettingsPage isLight={isLight} onToggleTheme={toggleTheme} />;
      default: return <HomePage isLight={isLight} />;
    }
  };

  return (
    <Router basename="/">
      <div
        className="h-screen w-screen overflow-hidden flex flex-col font-sans antialiased"
        style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)', maxWidth: '430px', margin: '0 auto' }}
      >
        <Header
          isLight={isLight}
          onToggleTheme={toggleTheme}
          searchValue={searchValue}
          onSearchChange={e => setSearchValue(e.target.value)}
        />
        {renderPage()}
        <footer className="flex-shrink-0 flex flex-col w-full z-50 transition-colors duration-300">
          <MiniPlayer
            isLight={isLight}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(p => !p)}
            isLiked={isLiked}
            onToggleLike={() => setIsLiked(l => !l)}
          />
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </footer>
      </div>
    </Router>
  );
};

export default App;