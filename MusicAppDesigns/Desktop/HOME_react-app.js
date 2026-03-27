import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
  bgBase: { backgroundColor: 'var(--bg-base)' },
  bgMain: { backgroundColor: 'var(--bg-main)' },
  bgSurface: { backgroundColor: 'var(--bg-surface)' },
  bgSurfaceHover: { backgroundColor: 'var(--bg-surface-hover)' },
  textPrimary: { color: 'var(--text-primary)' },
  textSecondary: { color: 'var(--text-secondary)' },
  borderColor: { borderColor: 'var(--border)' },
  glassBg: { background: 'var(--glass-bg)' },
};

const gradStyles = {
  grad1: { background: 'linear-gradient(135deg, #2c3e50, #000000)' },
  grad2: { background: 'linear-gradient(135deg, #8e44ad, #2c3e50)' },
  grad3: { background: 'linear-gradient(135deg, #d35400, #c0392b)' },
  grad4: { background: 'linear-gradient(135deg, #16a085, #2980b9)' },
  grad5: { background: 'linear-gradient(135deg, #7f8c8d, #2c3e50)' },
  grad6: { background: 'linear-gradient(135deg, #c0392b, #8e44ad)' },
  grad7: { background: 'linear-gradient(135deg, #2980b9, #2c3e50)' },
  grad8: { background: 'linear-gradient(135deg, #f39c12, #d35400)' },
  gradHero: { background: 'radial-gradient(circle at center, #1a0a0a 0%, #000000 100%)' },
};

const recentItems = [
  { id: 1, title: 'Midnight City', subtitle: 'Electronic Focus', grad: gradStyles.grad1 },
  { id: 2, title: 'Acoustic Mornings', subtitle: 'Chill • Coffee', grad: gradStyles.grad2 },
  { id: 3, title: 'Daily Mix 1', subtitle: 'Made for User_992', grad: gradStyles.grad3 },
  { id: 4, title: 'Jon Hopkins', subtitle: 'Artist', grad: gradStyles.grad4 },
  { id: 5, title: 'Deep Focus', subtitle: 'Ambient Space', grad: gradStyles.grad5 },
  { id: 6, title: 'Release Radar', subtitle: 'Catch up on new', grad: gradStyles.grad6 },
];

const trendingItems = [
  { id: 1, title: 'Starboy', artist: 'The Weeknd, Daft Punk', duration: '3:50', grad: gradStyles.grad7 },
  { id: 2, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', grad: gradStyles.grad8 },
  { id: 3, title: 'As It Was', artist: 'Harry Styles', duration: '2:47', grad: gradStyles.grad1 },
  { id: 4, title: 'Bad Habit', artist: 'Steve Lacy', duration: '3:52', grad: gradStyles.grad4 },
  { id: 5, title: 'Anti-Hero', artist: 'Taylor Swift', duration: '3:20', grad: gradStyles.grad5 },
  { id: 6, title: 'Kill Bill', artist: 'SZA', duration: '2:33', grad: gradStyles.grad6 },
];

const genres = [
  { label: 'Electronic', bg: '#1abc9c', textClass: 'text-white' },
  { label: 'Hip Hop', bg: '#e74c3c', textClass: 'text-white' },
  { label: 'Pop', bg: '#3498db', textClass: 'text-white' },
  { label: 'R&B', bg: '#9b59b6', textClass: 'text-white' },
  { label: 'Indie', bg: '#f1c40f', textClass: 'text-black' },
  { label: 'Jazz', bg: '#34495e', textClass: 'text-white' },
];

const PlayIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const HeartIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const RecentCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex-none w-48 group cursor-pointer snap-start"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-full aspect-square mb-4 relative overflow-hidden border-2"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border)',
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform 0.3s',
          boxShadow: hovered ? 'var(--shadow-brutal)' : '0 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        <div className="absolute inset-0 opacity-80 transition-opacity" style={{ ...item.grad, opacity: hovered ? 1 : 0.8 }} />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s',
            backdropFilter: 'blur(2px)',
          }}
        >
          <button
            className="w-14 h-14 bg-accent flex items-center justify-center text-white shadow-xl border-2 border-transparent"
            style={{
              backgroundColor: '#ff3300',
              transform: hovered ? 'scale(1)' : 'scale(0.75)',
              transition: 'transform 0.3s',
            }}
          >
            <PlayIcon size={24} />
          </button>
        </div>
      </div>
      <h3 className="font-bold text-base truncate" style={customStyles.textPrimary}>{item.title}</h3>
      <p className="text-xs font-medium mt-1 truncate uppercase tracking-wider" style={customStyles.textSecondary}>{item.subtitle}</p>
    </div>
  );
};

const TrendingRow = ({ item }) => {
  const [liked, setLiked] = useState(false);
  return (
    <div
      className="flex items-center gap-4 p-3 border group cursor-pointer"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border)',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--bg-surface)'}
    >
      <div className="w-16 h-16 flex-shrink-0 relative flex items-center justify-center" style={item.grad}>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0}
        >
          <PlayIcon size={20} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold truncate text-sm" style={customStyles.textPrimary}>{item.title}</h4>
        <p className="text-xs truncate mt-1 font-medium" style={customStyles.textSecondary}>{item.artist}</p>
      </div>
      <button
        className="p-2 transition-all opacity-0 group-hover:opacity-100"
        style={{ color: liked ? '#ff3300' : 'var(--text-secondary)', transition: 'color 0.2s, opacity 0.2s' }}
        onClick={() => setLiked(!liked)}
      >
        <HeartIcon size={18} />
      </button>
      <span className="text-xs font-bold w-8 text-right" style={customStyles.textSecondary}>{item.duration}</span>
    </div>
  );
};

const Sidebar = ({ activeNav, setActiveNav }) => {
  const menuItems = ['HOME', 'EXPLORE', 'TRENDING'];
  const libraryItems = ['RECENT', 'PLAYLISTS', 'ARTISTS', 'IMPORT'];

  return (
    <aside
      className="w-[260px] border-r flex flex-col z-30 flex-shrink-0"
      style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)', transition: 'background-color 0.3s, color 0.3s' }}
    >
      <div className="h-24 flex items-center px-8 border-b" style={{ borderColor: 'rgba(34,35,40,0.5)' }}>
        <a href="#" className="font-black text-2xl tracking-tighter uppercase flex items-center gap-1" style={customStyles.textPrimary}>
          STEQMUSIC<span style={{ color: '#ff3300', fontSize: '1.875rem', lineHeight: 1, marginTop: '-4px' }}>■</span>
        </a>
      </div>

      <div className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-10" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <div>
          <div className="px-4 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase" style={customStyles.textSecondary}>Menu</div>
          <nav className="space-y-1">
            {menuItems.map(item => (
              <a
                key={item}
                href="#"
                className="flex items-center gap-4 px-4 py-3 rounded-md font-bold transition-all"
                style={
                  activeNav === item
                    ? { backgroundColor: '#ff3300', color: '#ffffff' }
                    : { color: 'var(--text-secondary)', transition: 'color 0.2s, background-color 0.2s' }
                }
                onClick={e => { e.preventDefault(); setActiveNav(item); }}
                onMouseEnter={e => { if (activeNav !== item) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; } }}
                onMouseLeave={e => { if (activeNav !== item) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'transparent'; } }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <div className="px-4 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase" style={customStyles.textSecondary}>Library</div>
          <nav className="space-y-1">
            {libraryItems.map(item => (
              <a
                key={item}
                href="#"
                className="flex items-center gap-4 px-4 py-3 rounded-md font-semibold transition-all"
                style={{ color: 'var(--text-secondary)' }}
                onClick={e => e.preventDefault()}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t" style={{ borderColor: 'rgba(34,35,40,0.5)' }}>
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-md font-bold transition-all"
          style={{ color: 'var(--text-secondary)' }}
          onClick={e => e.preventDefault()}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          SETTINGS
        </a>
      </div>
    </aside>
  );
};

const Header = ({ isDark, toggleTheme, searchValue, setSearchValue }) => {
  return (
    <header
      className="h-24 absolute top-0 w-full z-20 flex items-center justify-between px-10 backdrop-blur-xl border-b"
      style={{ background: 'var(--glass-bg)', borderColor: 'var(--border)', transition: 'background-color 0.3s' }}
    >
      <div className="relative w-full max-w-xl group">
        <svg
          xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
          style={{ color: searchValue ? '#ff3300' : 'var(--text-secondary)' }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="SEARCH ARTISTS, SONGS, PODCASTS..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="w-full border rounded-none py-3.5 pl-12 pr-4 focus:outline-none font-semibold text-xs tracking-wider transition-all shadow-sm"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: searchValue ? '#ff3300' : 'var(--border)',
            color: 'var(--text-primary)',
          }}
        />
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center border transition-all"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          {isDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="text-right hidden md:block">
            <div
              className="text-xs font-bold uppercase tracking-wider transition-colors"
              style={{ color: 'var(--text-primary)' }}
              onMouseEnter={e => e.currentTarget.style.color = '#ff3300'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
            >USER_992</div>
            <div className="text-[10px] uppercase font-semibold" style={customStyles.textSecondary}>Premium</div>
          </div>
          <div
            className="w-12 h-12 border-2 flex items-center justify-center transition-all shadow-sm"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#ff3300'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

const HeroSection = () => (
  <section
    className="mt-8 mb-16 relative w-full border-2 overflow-hidden flex flex-col md:flex-row transition-all"
    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--hero-bg)', boxShadow: 'var(--shadow-brutal)' }}
  >
    <div
      className="flex-1 p-10 md:p-16 relative z-10 flex flex-col justify-center"
      style={{
        backgroundImage: 'radial-gradient(var(--dots-color) 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="flex items-center gap-0 mb-6 w-max border-2" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-surface)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        <div className="w-8 h-8 flex items-center justify-center text-white" style={{ backgroundColor: '#ff3300' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3" style={customStyles.textPrimary}>Trending Global</span>
      </div>

      <h1 className="text-6xl md:text-[5.5rem] lg:text-[7rem] font-black leading-[0.85] tracking-tighter uppercase mb-8 break-words" style={customStyles.textPrimary}>
        Winter<br />Audio<br />Sessions
      </h1>

      <div className="border-l-4 pl-5 mb-10 max-w-lg" style={{ borderColor: '#ff3300' }}>
        <p className="text-base md:text-lg font-medium leading-relaxed" style={customStyles.textSecondary}>
          The cold is here. Immerse yourself in the dark atmospheric soundscapes dominating the charts this week. First playlist is out now.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          className="text-white font-black py-4 px-8 text-sm tracking-widest uppercase flex items-center gap-3 border-2 border-transparent transition-all"
          style={{ backgroundColor: '#ff3300', boxShadow: 'var(--shadow-brutal)' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg-base)'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ff3300'; e.currentTarget.style.color = '#ffffff'; }}
        >
          PLAY PLAYLIST
          <PlayIcon size={16} />
        </button>
        <div
          className="border-2 py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
        >
          Updated 9 AM
        </div>
      </div>
    </div>

    <div className="hidden lg:flex w-2/5 border-l-2 relative items-center justify-center overflow-hidden p-12" style={{ ...gradStyles.gradHero, borderColor: 'var(--border)' }}>
      <div
        className="w-full aspect-square border-4 relative flex items-center justify-center"
        style={{ borderColor: 'rgba(255,51,0,0.2)', backdropFilter: 'blur(48px)', animation: 'pulse 8s ease-in-out infinite' }}
      >
        <div className="w-3/4 aspect-square border-2" style={{ borderColor: 'rgba(255,51,0,0.4)', transform: 'rotate(12deg)' }} />
        <div className="w-1/2 aspect-square border absolute" style={{ borderColor: 'rgba(255,51,0,0.6)', transform: 'rotate(-6deg)', backgroundColor: 'rgba(255,51,0,0.05)', backdropFilter: 'blur(12px)' }} />
      </div>
    </div>
  </section>
);

const JumpBackIn = () => (
  <section className="mb-14">
    <div className="flex justify-between items-end mb-6">
      <h2 className="text-3xl font-black tracking-tight uppercase" style={customStyles.textPrimary}>Jump Back In</h2>
      <button
        className="text-xs font-bold tracking-widest uppercase transition-colors"
        style={customStyles.textSecondary}
        onMouseEnter={e => e.currentTarget.style.color = '#ff3300'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
      >See All</button>
    </div>
    <div
      className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x -mx-10 px-10"
      style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
    >
      {recentItems.map(item => <RecentCard key={item.id} item={item} />)}
      <div className="flex-none w-48 group cursor-pointer snap-start pr-10">
        <div
          className="w-full aspect-square mb-4 relative overflow-hidden border-2 flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
        >
          <span className="font-black uppercase tracking-widest" style={customStyles.textSecondary}>View All</span>
        </div>
      </div>
    </div>
  </section>
);

const TrendingNow = () => (
  <section className="mb-14">
    <div className="flex justify-between items-end mb-6">
      <h2 className="text-3xl font-black tracking-tight uppercase" style={customStyles.textPrimary}>Trending Now</h2>
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center border transition-colors"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center border transition-colors"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {trendingItems.map(item => <TrendingRow key={item.id} item={item} />)}
    </div>
  </section>
);

const ExploreGenres = () => (
  <section className="mb-14">
    <div className="flex justify-between items-end mb-6">
      <h2 className="text-3xl font-black tracking-tight uppercase" style={customStyles.textPrimary}>Explore Genres</h2>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
      {genres.map(genre => (
        <div
          key={genre.label}
          className="h-24 border-2 flex items-center justify-center cursor-pointer transition-transform"
          style={{ backgroundColor: genre.bg, borderColor: 'var(--border)', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-brutal)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'; }}
        >
          <span className={`font-black uppercase tracking-widest text-sm ${genre.textClass}`}>{genre.label}</span>
        </div>
      ))}
    </div>
  </section>
);

const PlayerFooter = ({ isPlaying, setIsPlaying }) => {
  const [progress, setProgress] = useState(33);
  const [volume, setVolume] = useState(66);

  return (
    <footer
      className="h-[100px] border-t-2 w-full flex items-center justify-between px-8 z-50 flex-shrink-0"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border)',
        transition: 'background-color 0.3s',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.2)',
      }}
    >
      <div className="flex items-center gap-6 w-1/3 min-w-[250px]">
        <div className="w-16 h-16 flex-shrink-0 border-2" style={{ ...gradStyles.grad1, borderColor: 'var(--border)' }} />
        <div className="flex flex-col truncate pr-4">
          <a
            href="#"
            className="font-black text-sm truncate uppercase tracking-wide transition-colors"
            style={customStyles.textPrimary}
            onClick={e => e.preventDefault()}
            onMouseEnter={e => e.currentTarget.style.color = '#ff3300'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >Light Through The Veins</a>
          <a
            href="#"
            className="text-xs font-semibold truncate mt-1 transition-colors"
            style={customStyles.textSecondary}
            onClick={e => e.preventDefault()}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >Jon Hopkins</a>
        </div>
        <div className="flex items-center gap-3 ml-2">
          <button className="transition-colors" style={customStyles.textSecondary} onMouseEnter={e => e.currentTarget.style.color = '#ff3300'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <HeartIcon size={20} />
          </button>
          <button className="transition-colors" style={customStyles.textSecondary} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-1/3 max-w-[500px]">
        <div className="flex items-center gap-6 mb-2">
          <button className="transition-colors" style={customStyles.textSecondary} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
          </button>
          <button className="transition-colors" style={customStyles.textSecondary} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" />
            </svg>
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center text-white transition-transform border-2 border-transparent"
            style={{ backgroundColor: '#ff3300', boxShadow: 'var(--shadow-brutal)' }}
            onClick={() => setIsPlaying(!isPlaying)}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <PlayIcon size={20} />
            )}
          </button>
          <button className="transition-colors" style={customStyles.textSecondary} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          </button>
          <button className="transition-colors" style={customStyles.textSecondary} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
          </button>
        </div>

        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] font-bold" style={{ color: '#ff3300' }}>3:14</span>
          <div
            className="h-2 flex-1 relative cursor-pointer border overflow-hidden"
            style={{ backgroundColor: 'var(--bg-surface-hover)', borderColor: 'var(--border)' }}
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
              setProgress(pct);
            }}
          >
            <div className="absolute left-0 top-0 h-full" style={{ backgroundColor: '#ff3300', width: `${progress}%` }} />
          </div>
          <span className="text-[10px] font-bold" style={customStyles.textSecondary}>9:21</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-5 w-1/3 min-w-[200px]">
        <button className="transition-colors" style={customStyles.textSecondary} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>
        <div className="flex items-center gap-3 group w-32">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={customStyles.textSecondary}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <div
            className="h-2 flex-1 relative cursor-pointer border"
            style={{ backgroundColor: 'var(--bg-surface-hover)', borderColor: 'var(--border)' }}
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
              setVolume(pct);
            }}
          >
            <div className="absolute left-0 top-0 h-full" style={{ backgroundColor: 'var(--text-primary)', width: `${volume}%` }} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const HomePage = ({ isDark, toggleTheme, searchValue, setSearchValue, isPlaying, setIsPlaying, activeNav, setActiveNav }) => (
  <div className="h-screen w-screen overflow-hidden flex flex-col font-sans antialiased" style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
    <div className="flex flex-1 overflow-hidden h-full relative">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
      <main className="flex-1 flex flex-col relative overflow-hidden" style={{ backgroundColor: 'var(--bg-main)', transition: 'background-color 0.3s' }}>
        <Header isDark={isDark} toggleTheme={toggleTheme} searchValue={searchValue} setSearchValue={setSearchValue} />
        <div
          className="flex-1 overflow-y-auto pb-40 pt-24 px-10 relative z-10"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          <HeroSection />
          <JumpBackIn />
          <TrendingNow />
          <ExploreGenres />
        </div>
      </main>
    </div>
    <PlayerFooter isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
  </div>
);

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNav, setActiveNav] = useState('HOME');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const preferLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const isLight = savedTheme === 'light' || (!savedTheme && preferLight);
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.removeAttribute('data-theme');
      setIsDark(true);
    }
  }, []);

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
      body { background-color: var(--bg-base); color: var(--text-primary); transition: background-color 0.3s ease, color 0.3s ease; }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggleTheme = () => {
    const currentlyLight = document.documentElement.hasAttribute('data-theme');
    if (currentlyLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    }
  };

  return (
    <Router basename="/">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isDark={isDark}
              toggleTheme={toggleTheme}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              activeNav={activeNav}
              setActiveNav={setActiveNav}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;