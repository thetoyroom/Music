import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
  },
};

const gradients = {
  mood1: { background: 'linear-gradient(45deg, #FF3300, #991F00)' },
  mood2: { background: 'linear-gradient(45deg, #00C2FF, #004E66)' },
  mood3: { background: 'linear-gradient(45deg, #8A2BE2, #4B0082)' },
  mood4: { background: 'linear-gradient(45deg, #FFD700, #B8860B)' },
  mood5: { background: 'linear-gradient(45deg, #00FF7F, #006400)' },
  grad1: { background: 'linear-gradient(135deg, #2c3e50, #000000)' },
  grad4: { background: 'linear-gradient(135deg, #16a085, #2980b9)' },
};

const Sidebar = ({ activeNav, setActiveNav }) => {
  return (
    <aside
      style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}
      className="w-[260px] border-r flex flex-col z-30 flex-shrink-0"
    >
      <div
        style={{ borderColor: 'var(--border)' }}
        className="h-24 flex items-center px-8 border-b border-opacity-50"
      >
        <a href="#" className="font-black text-2xl tracking-tighter uppercase flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
          STEQMUSIC<span style={{ color: 'var(--accent)' }} className="text-3xl leading-none -mt-1">■</span>
        </a>
      </div>
      <div className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div>
          <div className="px-4 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--text-secondary)' }}>Menu</div>
          <nav className="space-y-1">
            {['HOME', 'EXPLORE', 'TRENDING'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveNav(item); }}
                className="flex items-center gap-4 px-4 py-3 rounded-md font-bold transition-all"
                style={
                  activeNav === item
                    ? { backgroundColor: 'var(--accent)', color: '#ffffff', boxShadow: 'var(--shadow-brutal)' }
                    : { color: 'var(--text-secondary)' }
                }
                onMouseEnter={(e) => {
                  if (activeNav !== item) {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeNav !== item) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <div className="px-4 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--text-secondary)' }}>Library</div>
          <nav className="space-y-1">
            {['RECENT', 'PLAYLISTS', 'ARTISTS', 'IMPORT'].map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex items-center gap-4 px-4 py-3 rounded-md font-semibold transition-all"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex items-center gap-3 px-4 py-3 rounded-md font-bold transition-all"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
            e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
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
};

const Header = ({ isLight, toggleTheme, searchValue, setSearchValue }) => {
  return (
    <header
      className="h-24 absolute top-0 w-full z-20 flex items-center justify-between px-10 backdrop-blur-xl border-b"
      style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--border)' }}
    >
      <div className="relative w-full max-w-xl group">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
          style={{ color: searchValue ? 'var(--accent)' : 'var(--text-secondary)' }}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="EXPLORE SOUNDS, PODCASTS, MIXES..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full rounded-none py-3.5 pl-12 pr-4 focus:outline-none font-semibold text-xs tracking-wider"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: searchValue ? 'var(--accent)' : 'var(--border)',
            color: 'var(--text-primary)',
            border: '1px solid',
          }}
        />
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center border transition-all"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          {isLight ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold uppercase tracking-wider transition-colors" style={{ color: 'var(--text-primary)' }}>USER_992</div>
            <div className="text-[10px] uppercase font-semibold" style={{ color: 'var(--text-secondary)' }}>Premium</div>
          </div>
          <div
            className="w-12 h-12 border-2 flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

const MoodCard = ({ gradientStyle, label, title, textClass = 'text-white', labelClass = 'text-white/50' }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="aspect-square border-2 p-6 flex flex-col justify-between cursor-pointer transition-transform"
      style={{
        ...gradientStyle,
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow-brutal)',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={`text-xs font-black tracking-widest uppercase ${labelClass}`}>{label}</span>
      <h3 className={`text-3xl font-black leading-none uppercase ${textClass}`} dangerouslySetInnerHTML={{ __html: title }}></h3>
    </div>
  );
};

const NewReleaseCard = ({ gradientStyle, type, title, subtitle, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex-none w-[320px] border-2 p-4 cursor-pointer transition-all"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border)',
        boxShadow: hovered ? 'var(--shadow-brutal)' : '0 1px 2px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-full aspect-video border mb-4 relative overflow-hidden"
        style={{ ...gradientStyle, borderColor: 'rgba(34,35,40,0.5)' }}
      >
        {children}
        <div
          className="absolute bottom-2 left-2 px-2 py-1 text-[8px] font-black text-white uppercase"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          {type}
        </div>
      </div>
      <h3 className="font-black uppercase truncate" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <p className="text-xs font-bold uppercase tracking-wider mt-1" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
    </div>
  );
};

const PodcastCard = ({ accentColor, number, series, title, description }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex gap-6 p-6 border-2 transition-all"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: hovered ? accentColor : 'var(--border)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-32 h-32 border-2 flex-shrink-0 relative overflow-hidden"
        style={{ backgroundColor: '#000', borderColor: 'var(--border)' }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: `${accentColor}1a` }}></div>
        <div className="h-full w-full flex items-center justify-center font-black text-4xl opacity-50" style={{ color: accentColor }}>
          {number}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-[10px] font-black tracking-[0.3em] uppercase mb-1" style={{ color: accentColor }}>{series}</span>
        <h3 className="text-2xl font-black uppercase leading-none mb-2" style={{ color: 'var(--text-primary)' }}>{title}</h3>
        <p className="text-sm font-medium line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{description}</p>
        <button
          className="mt-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-colors"
          style={{ color: 'var(--text-primary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
        >
          Listen Now
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

const DotsOverlay = () => (
  <div
    className="absolute inset-0 opacity-30"
    style={{
      backgroundImage: 'radial-gradient(var(--dots-color) 1.5px, transparent 1.5px)',
      backgroundSize: '24px 24px',
    }}
  ></div>
);

const ExplorePage = () => {
  return (
    <div className="flex-1 overflow-y-auto pb-40 pt-28 px-10 relative z-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {/* Mood Discovery */}
      <section className="mb-16">
        <h2 className="text-3xl font-black tracking-tight uppercase mb-8" style={{ color: 'var(--text-primary)' }}>Mood Discovery</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <MoodCard gradientStyle={gradients.mood1} label="Energy" title="High<br/>Focus" />
          <MoodCard gradientStyle={gradients.mood2} label="Vibe" title="Deep<br/>Blue" />
          <MoodCard gradientStyle={gradients.mood3} label="Atmosphere" title="Dark<br/>City" />
          <MoodCard gradientStyle={gradients.mood4} label="Spirit" title="Pure<br/>Gold" textClass="text-black" labelClass="text-black/50" />
          <MoodCard gradientStyle={gradients.mood5} label="Nature" title="Lush<br/>Echo" />
        </div>
      </section>

      {/* New This Week */}
      <section className="mb-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>New This Week</h2>
          <button
            className="text-xs font-bold tracking-widest uppercase transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            View Timeline
          </button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 -mx-10 px-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <NewReleaseCard
            gradientStyle={gradients.grad1}
            type="Album"
            title="OXYGEN DEPLETED"
            subtitle="Silent Echo • Industrial"
          >
            <DotsOverlay />
          </NewReleaseCard>
          <NewReleaseCard
            gradientStyle={gradients.grad4}
            type="EP"
            title="KINETIC PULSE"
            subtitle="Neuro-Dancer • Techno"
          >
            <DotsOverlay />
          </NewReleaseCard>
          <NewReleaseCard
            gradientStyle={{ backgroundColor: '#000' }}
            type="Single"
            title="GHOST IN THE MACHINE"
            subtitle="Void Crawler • Ambient"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-20 h-20 border-2 animate-pulse"
                style={{ borderColor: 'rgba(255,51,0,0.3)' }}
              ></div>
            </div>
          </NewReleaseCard>
        </div>
      </section>

      {/* Original Podcasts */}
      <section className="mb-16">
        <h2 className="text-3xl font-black tracking-tight uppercase mb-8" style={{ color: 'var(--text-primary)' }}>Original Podcasts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PodcastCard
            accentColor="#ff3300"
            number="#01"
            series="Weekly series"
            title="The Producers Log"
            description="Behind the scenes with the world's leading sound designers and engineers."
          />
          <PodcastCard
            accentColor="#3b82f6"
            number="#04"
            series="Deep Dive"
            title="Sonic Architecture"
            description="Exploring the relationship between physical spaces and acoustic perception."
          />
        </div>
      </section>

      {/* Editorial Curation */}
      <section className="mb-20">
        <h2 className="text-3xl font-black tracking-tight uppercase mb-8" style={{ color: 'var(--text-primary)' }}>Editorial Curation</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gridAutoRows: '10px',
            gap: '24px',
          }}
        >
          {/* Large card - Heavy Hitters */}
          <div
            className="border-2 p-8 flex flex-col justify-end relative cursor-pointer"
            style={{
              gridRowEnd: 'span 35',
              backgroundColor: 'var(--accent)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow-brutal)',
              backgroundImage: 'radial-gradient(var(--dots-color) 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px',
            }}
          >
            <div className="absolute top-8 left-8 border-2 p-1" style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 className="text-5xl font-black text-white leading-[0.9] uppercase tracking-tighter">
              The<br />Heavy<br />Hitters
            </h3>
            <p className="text-white/70 font-bold uppercase text-xs tracking-widest mt-4">Curated by Steq Team</p>
          </div>

          {/* Small card - Glitch Mobility */}
          <div
            className="border-2 p-8 flex flex-col justify-between cursor-pointer transition-all"
            style={{
              gridRowEnd: 'span 22',
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface)')}
          >
            <div className="font-black text-xs tracking-[0.4em] uppercase" style={{ color: 'var(--accent)' }}>Genre / 01</div>
            <div>
              <h3 className="text-3xl font-black uppercase leading-tight" style={{ color: 'var(--text-primary)' }}>
                Glitch<br />Mobility
              </h3>
              <p className="text-xs mt-2 uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>24 Tracks • New update</p>
            </div>
          </div>

          {/* Large card - Minimalist */}
          <div
            className="border-2 p-8 flex flex-col items-center justify-center text-center cursor-pointer"
            style={{
              gridRowEnd: 'span 35',
              backgroundColor: '#000',
              borderColor: 'var(--border)',
            }}
          >
            <div className="w-full h-1/2 flex items-center justify-center mb-6">
              <div className="w-24 h-24 border-b-4 border-r-4 -rotate-45" style={{ borderColor: 'var(--accent)' }}></div>
            </div>
            <h3 className="text-3xl font-black uppercase" style={{ color: 'var(--text-primary)' }}>
              Minimalist<br />Structures
            </h3>
            <p className="text-xs mt-4 uppercase font-bold tracking-widest px-4 border-t pt-4" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}>
              Ambient • Techno • Modern
            </p>
          </div>

          {/* Small card - Underground */}
          <div
            className="border-2 p-8 flex flex-col justify-end cursor-pointer"
            style={{
              gridRowEnd: 'span 22',
              backgroundColor: 'var(--text-primary)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow-brutal)',
            }}
          >
            <h3 className="text-3xl font-black uppercase leading-none" style={{ color: 'var(--bg-base)' }}>
              Under<br />Ground
            </h3>
            <p className="font-black uppercase text-[10px] mt-4" style={{ color: 'var(--bg-base)', opacity: 0.6 }}>Restricted access</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const PlayerFooter = ({ isPlaying, setIsPlaying, progress, setProgress }) => {
  const [liked, setLiked] = useState(false);
  const [volume, setVolume] = useState(0.67);

  return (
    <footer
      className="h-[100px] border-t-2 w-full flex items-center justify-between px-8 z-50 flex-shrink-0"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.2)',
      }}
    >
      {/* Track Info */}
      <div className="flex items-center gap-6 w-1/3 min-w-[250px]">
        <div className="w-16 h-16 flex-shrink-0" style={gradients.grad1}></div>
        <div className="flex flex-col truncate pr-4">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="font-black text-sm uppercase tracking-wide truncate transition-colors"
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          >
            Light Through The Veins
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-xs font-semibold truncate mt-1 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Jon Hopkins
          </a>
        </div>
        <div className="flex items-center gap-3 ml-2">
          <button
            onClick={() => setLiked(!liked)}
            className="transition-colors"
            style={{ color: liked ? 'var(--accent)' : 'var(--text-secondary)' }}
            onMouseEnter={(e) => { if (!liked) e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { if (!liked) e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center justify-center w-1/3 max-w-[500px]">
        <div className="flex items-center gap-6 mb-2">
          <button
            className="transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
            </svg>
          </button>
          <button
            className="transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 flex items-center justify-center text-white hover:scale-105 transition-transform border-2 border-transparent"
            style={{ backgroundColor: 'var(--accent)', boxShadow: 'var(--shadow-brutal)' }}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16"></rect>
                <rect x="14" y="4" width="4" height="16"></rect>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
          <button
            className="transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
          <button
            className="transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            </svg>
          </button>
        </div>
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>3:14</span>
          <div
            className="h-2 flex-1 relative cursor-pointer border overflow-hidden"
            style={{ backgroundColor: 'var(--bg-surface-hover)', borderColor: 'var(--border)' }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              setProgress((x / rect.width) * 100);
            }}
          >
            <div
              className="absolute left-0 top-0 h-full transition-all"
              style={{ backgroundColor: 'var(--accent)', width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>9:21</span>
        </div>
      </div>

      {/* Volume Controls */}
      <div className="flex items-center justify-end gap-5 w-1/3 min-w-[200px]">
        <button
          className="transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3"></path>
          </svg>
        </button>
        <div className="flex items-center gap-3 group w-32">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-secondary)' }}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          </svg>
          <div
            className="h-2 flex-1 relative cursor-pointer border"
            style={{ backgroundColor: 'var(--bg-surface-hover)', borderColor: 'var(--border)' }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              setVolume(x / rect.width);
            }}
          >
            <div
              className="absolute left-0 top-0 h-full"
              style={{ backgroundColor: 'var(--text-primary)', width: `${volume * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [isLight, setIsLight] = useState(false);
  const [activeNav, setActiveNav] = useState('EXPLORE');
  const [searchValue, setSearchValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(33);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setIsLight(true);
  }, []);

  const toggleTheme = () => {
    const newIsLight = !isLight;
    setIsLight(newIsLight);
    localStorage.setItem('theme', newIsLight ? 'light' : 'dark');
  };

  const cssVars = isLight ? customStyles.rootLight : customStyles.root;

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      :root {
        color-scheme: ${isLight ? 'light' : 'dark'};
      }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      ::selection { background-color: #ff3300; color: white; }
      * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      body { font-family: 'Inter', sans-serif; }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  return (
    <Router basename="/">
      <div
        style={{
          ...cssVars,
          backgroundColor: 'var(--bg-base)',
          color: 'var(--text-primary)',
          fontFamily: 'Inter, sans-serif',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="flex flex-1 overflow-hidden h-full relative">
          <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />
          <main
            className="flex-1 flex flex-col relative overflow-hidden"
            style={{ backgroundColor: 'var(--bg-main)' }}
          >
            <Header
              isLight={isLight}
              toggleTheme={toggleTheme}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
            <Routes>
              <Route path="/" element={<ExplorePage />} />
              <Route path="*" element={<ExplorePage />} />
            </Routes>
          </main>
        </div>
        <PlayerFooter
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          progress={progress}
          setProgress={setProgress}
        />
      </div>
    </Router>
  );
};

export default App;