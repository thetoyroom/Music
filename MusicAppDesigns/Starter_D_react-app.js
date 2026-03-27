import React, { useState, useEffect, useRef } from 'react';

// Style injections
const globalStyles = `
  .dot-pattern {
    background-image: radial-gradient(circle, #D8D4CA 1.5px, transparent 1.5px);
    background-size: 32px 32px;
  }
  .dark-dot-pattern {
    background-image: radial-gradient(circle, #2A2A2A 1.5px, transparent 1.5px);
    background-size: 32px 32px;
  }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .success-anim { animation: pulse-border 2s infinite; }
  @keyframes pulse-border {
    0% { border-color: transparent; transform: scale(0.95); }
    50% { border-color: #FF3300; transform: scale(1); }
    100% { border-color: transparent; transform: scale(0.95); }
  }
  .marquee-container { overflow: hidden; white-space: nowrap; }
  .marquee-content { display: inline-block; animation: marquee 15s linear infinite; }
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .now-playing-enter { transform: translateY(0) !important; }
  .now-playing-exit { transform: translateY(100%) !important; }
`;

// ─── Reusable Components ───────────────────────────────────────────────────────

const AlbumCard = ({ img, title, artist, onClick }) => (
  <div className="group cursor-pointer" onClick={onClick}>
    <div className="aspect-square bg-[#111] border border-[#1F1F1F] mb-4 overflow-hidden relative">
      <img src={img} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
        <button className="w-16 h-16 bg-[#FF3300] flex items-center justify-center text-white rounded-full hover:scale-110 transition-transform">
          <i className="ph-fill ph-play text-2xl"></i>
        </button>
      </div>
    </div>
    <h3 className="text-xs font-black uppercase tracking-wider truncate mb-1 text-black dark:text-white">{title}</h3>
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 truncate">{artist}</p>
  </div>
);

const PlaylistCard = ({ img, badge, badgeStyle, title, description, tracks, duration }) => (
  <div className="h-40 border border-[#D8D4CA] dark:border-[#1F1F1F] bg-white dark:bg-[#111] flex overflow-hidden group cursor-pointer hover:border-[#FF3300] transition-colors">
    <div className="w-40 h-full shrink-0 border-r border-[#D8D4CA] dark:border-[#1F1F1F] relative overflow-hidden">
      <img src={img} alt={title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
      <div className={`absolute top-2 left-2 text-[9px] font-black uppercase tracking-widest px-2 py-1 ${badgeStyle}`}>{badge}</div>
    </div>
    <div className="p-6 flex flex-col justify-center flex-1">
      <h3 className="text-xl font-black uppercase tracking-widest mb-2 group-hover:text-[#FF3300] transition-colors">{title}</h3>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 line-clamp-2">{description}</p>
      <div className="text-[9px] font-black uppercase tracking-widest flex gap-4 text-black dark:text-white">
        <span>{tracks} TRACKS</span>
        <span className="text-gray-400">|</span>
        <span>{duration}</span>
      </div>
    </div>
  </div>
);

// ─── Onboarding View ──────────────────────────────────────────────────────────

const OnboardingView = ({ onComplete, isDark }) => {
  const genres = ['Techno / IDM', 'Hyperpop', 'Lo-Fi Jazz', 'Post-Punk', 'Ambient', 'UK Garage'];
  const [selectedGenres, setSelectedGenres] = useState(['Techno / IDM', 'Lo-Fi Jazz', 'Ambient']);

  const artists = [
    { name: 'Aphex Twin', img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { name: 'Burial', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { name: 'KAYTRANADA', img: 'https://images.unsplash.com/photo-1514525253361-bee87184919a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { name: 'Bicep', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { name: 'Four Tet', img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { name: 'Floating Points', img: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { name: 'Jon Hopkins', img: 'https://images.unsplash.com/photo-1525362081669-2b476bb628c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
    { name: 'Overmono', img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
  ];
  const [selectedArtists, setSelectedArtists] = useState(['Aphex Twin', 'KAYTRANADA', 'Floating Points']);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleArtist = (artist) => {
    setSelectedArtists(prev =>
      prev.includes(artist) ? prev.filter(a => a !== artist) : [...prev, artist]
    );
  };

  const filteredArtists = artists.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const patternStyle = isDark
    ? { backgroundImage: 'radial-gradient(circle, #2A2A2A 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }
    : { backgroundImage: 'radial-gradient(circle, #D8D4CA 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' };

  return (
    <div className="absolute inset-0 z-50 bg-[#EBE8E3] dark:bg-[#0A0A0A] w-full h-full flex flex-col md:flex-row" style={patternStyle}>
      {/* Left panel */}
      <div className="w-full md:w-5/12 p-12 lg:p-24 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#D8D4CA] dark:border-[#1F1F1F] bg-[#EBE8E3]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-sm">
        <header className="mb-auto flex items-center gap-1 font-black text-2xl tracking-tighter uppercase">
          STEQMUSIC<div className="w-4 h-4 bg-[#FF3300]"></div>
        </header>
        <div className="my-auto">
          <h1 className="text-6xl lg:text-[80px] font-black tracking-tighter leading-[0.85] uppercase mb-8">
            Welcome,<br />Listener.
          </h1>
          <div className="flex gap-4">
            <div className="w-2 bg-[#FF3300] shrink-0"></div>
            <p className="text-sm lg:text-base font-semibold text-gray-600 dark:text-gray-400 leading-relaxed uppercase tracking-widest max-w-sm">
              SYSTEM CALIBRATION REQUIRED.<br /><br />DEFINE YOUR SONIC PARAMETERS TO INITIALIZE THE STREAM.
            </p>
          </div>
        </div>
        <div className="mt-auto pt-12">
          <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-2">SYSTEM STATUS</div>
          <div className="flex gap-2 w-full max-w-xs">
            <div className="h-1 flex-1 bg-[#FF3300]"></div>
            <div className="h-1 flex-1 bg-[#D8D4CA] dark:bg-[#1F1F1F]"></div>
            <div className="h-1 flex-1 bg-[#D8D4CA] dark:bg-[#1F1F1F]"></div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full md:w-7/12 flex flex-col bg-[#F4F2EE] dark:bg-[#121212] relative">
        <div className="flex-1 overflow-y-auto p-12 lg:p-24 pb-40 no-scrollbar">

          {/* Genres */}
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8 border-b border-[#D8D4CA] dark:border-[#1F1F1F] pb-4">
              <h2 className="text-xl font-black tracking-widest uppercase text-[#FF3300] flex items-center gap-3">
                <span className="text-xs text-gray-500">01.</span> CHOOSE GENRES
              </h2>
              <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Select minimum 3</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {genres.map(genre => {
                const isSelected = selectedGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`h-20 flex items-center justify-center transition-colors group cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'bg-white dark:bg-[#111] border-2 border-[#FF3300] hover:bg-[#FF3300] hover:text-white'
                        : 'bg-white dark:bg-[#111] border border-[#D8D4CA] dark:border-[#1F1F1F] hover:border-[#FF3300]'
                    }`}
                  >
                    <span className={`text-xs font-black uppercase tracking-[0.2em] relative z-10 ${isSelected ? 'group-hover:text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-[#FF3300]'}`}>{genre}</span>
                    {isSelected && <i className="ph-fill ph-check-circle absolute top-2 right-2 text-[#FF3300] group-hover:text-white text-lg"></i>}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Artists */}
          <section>
            <div className="flex items-end justify-between mb-8 border-b border-[#D8D4CA] dark:border-[#1F1F1F] pb-4">
              <h2 className="text-xl font-black tracking-widest uppercase text-[#FF3300] flex items-center gap-3">
                <span className="text-xs text-gray-500">02.</span> PICK ARTISTS
              </h2>
              <div className="h-10 w-64 border border-[#D8D4CA] dark:border-[#1F1F1F] bg-white dark:bg-[#111] flex items-center px-4 focus-within:border-[#FF3300] transition-colors">
                <i className="ph ph-magnifying-glass text-sm text-gray-500"></i>
                <input
                  type="text"
                  placeholder="SEARCH DATABASE..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-[10px] font-bold px-3 uppercase text-black dark:text-white placeholder-gray-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {filteredArtists.map(artist => {
                const isSelected = selectedArtists.includes(artist.name);
                return (
                  <div
                    key={artist.name}
                    onClick={() => toggleArtist(artist.name)}
                    className={`flex flex-col items-center group cursor-pointer ${!isSelected ? 'opacity-50 hover:opacity-100 transition-opacity' : ''}`}
                  >
                    <div className={`w-32 h-32 rounded-full p-1 mb-4 relative transition-transform duration-300 group-hover:scale-105 ${isSelected ? 'border-4 border-[#FF3300]' : 'border-2 border-transparent hover:border-[#FF3300]'}`}>
                      <img src={artist.img} alt={artist.name} className="w-full h-full rounded-full object-cover grayscale" />
                      {isSelected && <div className="absolute inset-0 bg-[#FF3300]/20 rounded-full"></div>}
                      {isSelected && (
                        <div className="absolute -bottom-2 -right-2 bg-[#FF3300] text-white rounded-full p-1.5 border-4 border-[#F4F2EE] dark:border-[#121212]">
                          <i className="ph-fill ph-check text-sm"></i>
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] font-black uppercase text-center tracking-[0.1em]">{artist.name}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-[#F4F2EE] dark:bg-[#121212] border-t border-[#D8D4CA] dark:border-[#1F1F1F]">
          <button
            onClick={onComplete}
            className="w-full bg-[#FF3300] text-white text-sm lg:text-base font-black uppercase tracking-[0.3em] py-6 flex items-center justify-center gap-4 hover:bg-red-600 transition-all active:scale-[0.99]"
            style={{ boxShadow: '0 0 30px rgba(255,51,0,0.3)' }}
          >
            Initialize Stream
            <i className="ph ph-arrow-right text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Success View ─────────────────────────────────────────────────────────────

const SuccessView = ({ onDone }) => {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setBarWidth(100), 100);
    const t2 = setTimeout(() => onDone(), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className="absolute inset-0 z-50 bg-[#0A0A0A] text-white flex flex-col items-center justify-center">
      <div className="w-48 h-48 border-2 rounded-full flex items-center justify-center success-anim mb-12 relative">
        <div className="absolute inset-0 bg-[#FF3300]/10 rounded-full animate-ping opacity-75"></div>
        <i className="ph ph-check text-[80px] text-[#FF3300]"></i>
      </div>
      <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-6 text-center">
        Stream<br />Initialized
      </h1>
      <p className="text-gray-400 tracking-[0.3em] text-xs uppercase font-bold mb-16 animate-pulse">Establishing connection to mainframe...</p>
      <div className="w-64 h-1 bg-[#1F1F1F] overflow-hidden">
        <div
          className="h-full bg-[#FF3300] transition-all ease-linear"
          style={{ width: `${barWidth}%`, transitionDuration: '2.3s' }}
        ></div>
      </div>
    </div>
  );
};

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const Sidebar = ({ activeView, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Dashboard', icon: 'ph ph-house' },
    { id: 'search', label: 'Database', icon: 'ph ph-magnifying-glass' },
    { id: 'settings', label: 'Settings', icon: 'ph ph-faders' },
  ];

  return (
    <aside className="w-[280px] border-r border-[#D8D4CA] dark:border-[#1F1F1F] flex-col justify-between shrink-0 bg-[#EBE8E3] dark:bg-[#0A0A0A] z-20 hidden md:flex">
      <div className="p-8 pb-0">
        <div
          className="flex items-center gap-1 font-black text-xl tracking-tighter uppercase mb-16 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          STEQMUSIC<div className="w-3.5 h-3.5 bg-[#FF3300]"></div>
        </div>

        <nav className="flex flex-col gap-2">
          <div className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Core Modules</div>
          {navItems.map(item => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-4 py-4 px-4 text-left border transition-all group ${
                  isActive
                    ? 'border-transparent border-l-4 border-l-[#FF3300] bg-white dark:bg-[#111] text-black dark:text-white shadow-sm'
                    : 'border-transparent hover:border-[#D8D4CA] dark:hover:border-[#1F1F1F] hover:bg-white dark:hover:bg-[#111] text-gray-600 dark:text-gray-400'
                }`}
                style={isActive ? { borderLeftWidth: '4px', borderLeftColor: '#FF3300' } : {}}
              >
                <i className={`${item.icon} text-xl ${isActive ? 'text-[#FF3300]' : ''} group-hover:scale-110 transition-transform`}></i>
                <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <nav className="flex flex-col gap-2 mt-12">
          <div className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Your Matrices</div>
          <div className="flex flex-col gap-4 px-4">
            {['Liked Tracks', 'Focus Void', 'Nocturnal Shift', 'Raw Inputs'].map(label => (
              <a key={label} href="#" className="text-[11px] font-bold uppercase tracking-wider text-gray-500 hover:text-[#FF3300] transition-colors">{label}</a>
            ))}
          </div>
        </nav>
      </div>

      <div className="p-8 border-t border-[#D8D4CA] dark:border-[#1F1F1F] bg-[#F4F2EE] dark:bg-[#121212] mt-auto">
        <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-[#FF3300] flex items-center justify-center text-white font-black text-lg">U</div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">USER_001</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#FF3300]">Pro Tier</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

// ─── Mini Player ──────────────────────────────────────────────────────────────

const MiniPlayer = ({ onExpand, isPlaying, onTogglePlay }) => (
  <footer
    onClick={onExpand}
    className="h-[100px] border-t border-[#D8D4CA] dark:border-[#1F1F1F] bg-[#F4F2EE] dark:bg-[#121212] absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 lg:px-12 cursor-pointer hover:bg-white dark:hover:bg-[#111] transition-colors group"
  >
    {/* Progress bar */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-[#D8D4CA] dark:bg-[#1F1F1F]">
      <div className="h-full bg-[#FF3300] w-1/3 relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FF3300] opacity-0 group-hover:opacity-100 transition-opacity" style={{ boxShadow: '0 0 10px #FF3300' }}></div>
      </div>
    </div>

    {/* Track info */}
    <div className="flex items-center gap-6 w-1/3">
      <img
        src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
        alt="Xtal"
        className="w-14 h-14 object-cover border border-[#D8D4CA] dark:border-[#1F1F1F] grayscale group-hover:grayscale-0 transition-all"
      />
      <div className="flex flex-col justify-center min-w-0">
        <div className="text-sm font-black uppercase tracking-widest truncate">Xtal</div>
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 truncate">Aphex Twin</div>
      </div>
      <button className="text-gray-400 hover:text-[#FF3300] ml-4 hidden md:block" onClick={e => e.stopPropagation()}>
        <i className="ph ph-heart text-xl"></i>
      </button>
    </div>

    {/* Controls */}
    <div className="flex items-center justify-center gap-8 w-1/3" onClick={e => e.stopPropagation()}>
      <button className="text-gray-400 hover:text-black dark:hover:text-white transition-colors hidden sm:block"><i className="ph ph-shuffle text-lg"></i></button>
      <button className="text-black dark:text-white hover:text-[#FF3300] transition-colors"><i className="ph-fill ph-skip-back text-2xl"></i></button>
      <button
        onClick={onTogglePlay}
        className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center rounded-full hover:scale-110 transition-transform shadow-lg"
      >
        <i className={`ph-fill ${isPlaying ? 'ph-pause' : 'ph-play'} text-xl`}></i>
      </button>
      <button className="text-black dark:text-white hover:text-[#FF3300] transition-colors"><i className="ph-fill ph-skip-forward text-2xl"></i></button>
      <button className="text-[#FF3300] hover:text-[#FF3300] transition-colors hidden sm:block"><i className="ph ph-repeat text-lg"></i></button>
    </div>

    {/* Time / Volume */}
    <div className="flex items-center justify-end gap-6 w-1/3 text-[10px] font-mono tracking-widest font-bold text-gray-500">
      <div className="hidden lg:flex items-center gap-2 w-32" onClick={e => e.stopPropagation()}>
        <i className="ph ph-speaker-high text-sm"></i>
        <div className="flex-1 h-1 bg-[#D8D4CA] dark:bg-[#1F1F1F] relative cursor-pointer">
          <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-black dark:bg-white"></div>
        </div>
      </div>
      <div className="hidden sm:block">01:42 / 04:54</div>
      <button className="text-black dark:text-white border border-[#D8D4CA] dark:border-[#1F1F1F] p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors" title="Expand">
        <i className="ph ph-arrows-out-simple text-sm"></i>
      </button>
    </div>
  </footer>
);

// ─── Now Playing View ─────────────────────────────────────────────────────────

const NowPlayingView = ({ isOpen, onClose, isPlaying, onTogglePlay }) => {
  const style = {
    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
    transition: 'transform 0.5s ease-in-out',
  };

  return (
    <div
      className="absolute inset-0 z-50 bg-[#EBE8E3] dark:bg-[#0A0A0A] flex flex-col xl:flex-row overflow-hidden"
      style={style}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 z-50 w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-[#FF3300] dark:hover:bg-[#FF3300] hover:text-white transition-colors"
      >
        <i className="ph ph-x text-xl font-bold"></i>
      </button>

      {/* Album art */}
      <div className="w-full xl:w-1/2 h-1/2 xl:h-full relative flex items-center justify-center p-12 lg:p-24 border-b xl:border-b-0 xl:border-r border-[#D8D4CA] dark:border-[#1F1F1F] bg-[#050505] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black opacity-50 z-0"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF3300]/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="w-full max-w-[600px] aspect-square relative z-10 border border-white/10 group-hover:scale-[1.02] transition-transform duration-700 ease-out" style={{ boxShadow: '0 0 50px rgba(0,0,0,0.8)' }}>
          <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Xtal" className="w-full h-full object-cover" />
          <div className="absolute inset-0 border border-black/50 pointer-events-none"></div>
        </div>
        <div className="absolute bottom-8 left-8 z-10 text-white/50 text-[10px] font-mono tracking-[0.3em] uppercase hidden md:block">SRC: 24BIT / 96KHZ ALAC</div>
      </div>

      {/* Track details & controls */}
      <div className="w-full xl:w-1/2 h-1/2 xl:h-full flex flex-col p-12 lg:p-24 relative bg-[#F4F2EE] dark:bg-[#121212]">
        <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
          <div className="mb-12">
            <h2 className="text-sm font-black tracking-[0.3em] uppercase text-[#FF3300] mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF3300] animate-ping"></div> Now Transmitting
            </h2>
            <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-2 leading-none">Xtal</h1>
            <p className="text-xl lg:text-2xl font-bold uppercase tracking-widest text-gray-500">Aphex Twin</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mt-4 bg-[#EBE8E3] dark:bg-[#0A0A0A] inline-block px-3 py-1 border border-[#D8D4CA] dark:border-[#1F1F1F]">
              Selected Ambient Works 85-92
            </p>
          </div>

          {/* Lyrics */}
          <div className="flex-1 min-h-[150px] mb-12 border-l-4 border-[#D8D4CA] dark:border-[#1F1F1F] pl-6 relative overflow-hidden">
            <div className="absolute top-0 left-6 text-[9px] font-bold tracking-[0.4em] uppercase text-gray-400 bg-[#F4F2EE] dark:bg-[#121212] pb-2 z-10 w-full">System Output / Lyrics</div>
            <div className="pt-8 flex flex-col gap-4 text-sm lg:text-base font-bold uppercase tracking-widest text-gray-400">
              <p className="opacity-30">[Instrumental sequence initialized]</p>
              <p className="opacity-50">Atmospheric pressure building.</p>
              <p className="text-black dark:text-white text-lg lg:text-xl font-black border-l-2 border-[#FF3300] pl-4 -ml-[26px]">Vocal sample processing...</p>
              <p className="opacity-50">Rhythm parameters locked.</p>
              <p className="opacity-30">[Sequence continues]</p>
            </div>
          </div>

          {/* Progress & controls */}
          <div className="mt-auto">
            <div className="mb-8 flex items-center gap-4">
              <span className="text-[10px] font-mono font-bold text-gray-500">01:42</span>
              <div className="flex-1 h-2 bg-[#D8D4CA] dark:bg-[#1F1F1F] relative cursor-pointer group">
                <div className="absolute top-0 left-0 bottom-0 bg-[#FF3300] w-1/3"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-1/3 -ml-2 w-4 h-6 bg-black dark:bg-white border-2 border-[#FF3300] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-500">04:54</span>
            </div>

            <div className="flex items-center justify-between border-t border-b border-[#D8D4CA] dark:border-[#1F1F1F] py-6">
              <button className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"><i className="ph ph-shuffle text-2xl"></i></button>
              <div className="flex items-center gap-6 lg:gap-12">
                <button className="text-black dark:text-white hover:text-[#FF3300] transition-colors"><i className="ph-fill ph-skip-back text-4xl"></i></button>
                <button
                  onClick={onTogglePlay}
                  className="w-20 h-20 bg-[#FF3300] text-white flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-[#FF3300] dark:hover:text-black transition-colors"
                  style={{ boxShadow: '0 0 30px rgba(255,51,0,0.2)' }}
                >
                  <i className={`ph-fill ${isPlaying ? 'ph-pause' : 'ph-play'} text-3xl`}></i>
                </button>
                <button className="text-black dark:text-white hover:text-[#FF3300] transition-colors"><i className="ph-fill ph-skip-forward text-4xl"></i></button>
              </div>
              <button className="text-[#FF3300] hover:text-[#FF3300] transition-colors"><i className="ph ph-repeat text-2xl"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Home View ────────────────────────────────────────────────────────────────

const HomeView = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const albums = [
    { img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', title: 'Selected Ambient Works', artist: 'Aphex Twin' },
    { img: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', title: 'Untrue', artist: 'Burial' },
    { img: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', title: 'BUBBA', artist: 'KAYTRANADA' },
    { img: 'https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', title: 'Isles', artist: 'Bicep', extraClass: 'hidden md:block' },
    { img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80', title: 'Promises', artist: 'Floating Points', extraClass: 'hidden lg:block' },
  ];

  return (
    <section className="flex flex-col p-12 lg:p-16">
      <header className="mb-16 flex justify-between items-end border-b border-[#D8D4CA] dark:border-[#1F1F1F] pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-3 h-3 bg-[#FF3300] animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#FF3300]">System Online</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase">Stream<br />Active.</h1>
        </div>
        <div className="text-right hidden xl:block">
          <div className="text-[10px] font-bold tracking-[0.2em] text-gray-500 mb-1">LOCAL TIME</div>
          <div className="text-2xl font-black tracking-tighter font-mono">{time}</div>
        </div>
      </header>

      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-sm font-black tracking-widest uppercase text-black dark:text-white border-l-4 border-[#FF3300] pl-4">Recently Processed</h2>
          <button className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-[#FF3300]">View All</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {albums.map((album, i) => (
            <div key={i} className={album.extraClass || ''}>
              <AlbumCard img={album.img} title={album.title} artist={album.artist} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-sm font-black tracking-widest uppercase text-black dark:text-white border-l-4 border-[#FF3300] pl-4">Suggested Modules</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PlaylistCard
            img="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            badge="MIX"
            badgeStyle="bg-[#FF3300] text-white"
            title="Industrial Focus"
            description="High-BPM sequences for maximum cognitive output. Featuring Overmono, Joy Orbison, and more."
            tracks={24}
            duration="1H 45M"
          />
          <PlaylistCard
            img="https://images.unsplash.com/photo-1534067783941-51c9c231f6f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            badge="DAILY"
            badgeStyle="bg-black text-white border border-white/20"
            title="Ambient Void v.2"
            description="Texture-heavy landscapes. Designed for decompression."
            tracks={18}
            duration="2H 10M"
          />
        </div>
      </section>
    </section>
  );
};

// ─── Search View ──────────────────────────────────────────────────────────────

const SearchView = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Top Results');
  const [liked, setLiked] = useState({ 2: true });

  const tabs = ['Top Results', 'Artists', 'Albums', 'Tracks'];

  const tracks = [
    { num: '01', img: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', title: '10%', artist: 'KAYTRANADA, Kali Uchis', duration: '03:06' },
    { num: '02', img: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', title: "YOU'RE THE ONE", artist: 'KAYTRANADA, Syd', duration: '03:47' },
    { num: '03', img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', title: 'Xtal', artist: 'Aphex Twin', duration: '04:54' },
    { num: '04', img: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', title: 'Archangel', artist: 'Burial', duration: '03:58' },
  ];

  const toggleLike = (idx) => {
    setLiked(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section className="flex flex-col p-12 lg:p-16">
      <header className="mb-12">
        <div className="flex items-center border-b-[3px] border-black dark:border-white pb-4 focus-within:border-[#FF3300] dark:focus-within:border-[#FF3300] transition-colors">
          <i className="ph ph-magnifying-glass text-4xl mr-6 text-gray-400"></i>
          <input
            type="text"
            placeholder="QUERY DATABASE..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-4xl md:text-5xl font-black uppercase tracking-tighter text-black dark:text-white placeholder-gray-300 dark:placeholder-gray-700"
          />
        </div>
      </header>

      <div className="flex gap-8 border-b border-[#D8D4CA] dark:border-[#1F1F1F] mb-12 overflow-x-auto no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 border-b-[3px] text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'border-[#FF3300] text-[#FF3300]'
                : 'border-transparent hover:border-gray-400 text-gray-500 hover:text-black dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col xl:flex-row gap-12">
        {/* Top match */}
        <div className="xl:w-1/3 shrink-0">
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-6">Top Match</h2>
          <div className="bg-white dark:bg-[#111] border border-[#D8D4CA] dark:border-[#1F1F1F] p-8 group cursor-pointer hover:border-[#FF3300] transition-colors h-[340px] flex flex-col">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-black dark:border-white">
              <img src="https://images.unsplash.com/photo-1514525253361-bee87184919a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" alt="KAYTRANADA" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
            </div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">KAYTRANADA</h3>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase bg-black text-white dark:bg-white dark:text-black self-start px-2 py-1 mb-auto">Artist</p>
            <button className="w-12 h-12 bg-[#FF3300] flex items-center justify-center text-white hover:scale-110 transition-transform self-end rounded-full shadow-lg">
              <i className="ph-fill ph-play text-xl"></i>
            </button>
          </div>
        </div>

        {/* Track list */}
        <div className="xl:w-2/3 flex-1">
          <h2 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gray-500 mb-6">Relevant Tracks</h2>
          <div className="flex flex-col gap-2">
            {tracks.map((track, idx) => (
              <div key={idx} className="flex items-center bg-white dark:bg-[#111] border border-transparent hover:border-[#FF3300] p-3 group cursor-pointer transition-colors">
                <div className="w-10 h-10 bg-[#EBE8E3] dark:bg-[#0A0A0A] flex items-center justify-center shrink-0 mr-4 group-hover:bg-[#FF3300] group-hover:text-white transition-colors">
                  <i className="ph-fill ph-play text-lg opacity-0 group-hover:opacity-100 absolute"></i>
                  <span className="text-[10px] font-black group-hover:opacity-0">{track.num}</span>
                </div>
                <img src={track.img} alt={track.title} className="w-10 h-10 object-cover mr-4 grayscale group-hover:grayscale-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black uppercase tracking-widest truncate group-hover:text-[#FF3300]">{track.title}</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 truncate">{track.artist}</div>
                </div>
                <div className="text-[10px] font-mono tracking-widest text-gray-400 mr-4">{track.duration}</div>
                <button
                  className={`px-2 ${liked[idx] ? 'text-[#FF3300]' : 'text-gray-400 hover:text-[#FF3300]'}`}
                  onClick={() => toggleLike(idx)}
                >
                  <i className={`${liked[idx] ? 'ph-fill ph-heart' : 'ph ph-heart'} text-lg`}></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Settings View ────────────────────────────────────────────────────────────

const SettingsView = ({ isDark, onToggleTheme }) => {
  const [quality, setQuality] = useState('high');

  const qualities = [
    { id: 'standard', label: 'Standard', sub: 'AAC 128kbps', pro: false },
    { id: 'high', label: 'High (Default)', sub: 'AAC 256kbps', pro: false },
    { id: 'lossless', label: 'Lossless', sub: 'ALAC up to 24-bit/192kHz', pro: true },
  ];

  return (
    <section className="flex flex-col p-12 lg:p-16 max-w-5xl mx-auto w-full">
      <header className="mb-16 border-b border-[#D8D4CA] dark:border-[#1F1F1F] pb-8">
        <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">Calibration</h1>
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-500">System Preferences & Account</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-12">
          {/* Theme toggle */}
          <div className="bg-white dark:bg-[#111] border border-[#D8D4CA] dark:border-[#1F1F1F] p-8">
            <h2 className="text-sm font-black tracking-widest uppercase mb-6 flex items-center gap-3">
              <i className="ph ph-palette text-xl text-[#FF3300]"></i> Interface Mode
            </h2>
            <div className="flex border-2 border-black dark:border-white p-1 bg-[#EBE8E3] dark:bg-[#0A0A0A]">
              <button
                onClick={() => onToggleTheme(false)}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-colors focus:outline-none ${!isDark ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-gray-500 hover:text-black dark:hover:text-white'}`}
              >
                Light
              </button>
              <button
                onClick={() => onToggleTheme(true)}
                className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-colors focus:outline-none ${isDark ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-transparent text-gray-500 hover:text-black dark:hover:text-white'}`}
              >
                Dark
              </button>
            </div>
            <p className="text-[10px] font-bold text-gray-500 mt-4 uppercase tracking-widest">Select your preferred visual environment.</p>
          </div>

          {/* Stream quality */}
          <div className="bg-white dark:bg-[#111] border border-[#D8D4CA] dark:border-[#1F1F1F] p-8">
            <h2 className="text-sm font-black tracking-widest uppercase mb-6 flex items-center gap-3">
              <i className="ph ph-speaker-high text-xl text-[#FF3300]"></i> Stream Quality
            </h2>
            <div className="flex flex-col gap-3">
              {qualities.map(q => (
                <label
                  key={q.id}
                  onClick={() => setQuality(q.id)}
                  className={`flex items-center justify-between p-4 cursor-pointer transition-colors group ${
                    quality === q.id
                      ? 'border-2 border-[#FF3300] bg-[#FF3300]/5'
                      : 'border border-[#D8D4CA] dark:border-[#1F1F1F] hover:border-[#FF3300]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${quality === q.id ? 'border-[#FF3300]' : 'border-gray-400 group-hover:border-[#FF3300]'}`}>
                      {quality === q.id && <div className="w-2 h-2 bg-[#FF3300] rounded-full"></div>}
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                        {q.label}
                        {q.pro && <span className="bg-[#FF3300] text-white text-[8px] px-1.5 py-0.5 rounded-sm">PRO</span>}
                      </div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{q.sub}</div>
                    </div>
                  </div>
                  {quality === q.id && <i className="ph-fill ph-check-circle text-[#FF3300] text-lg"></i>}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          {/* Account */}
          <div className="bg-white dark:bg-[#111] border border-[#D8D4CA] dark:border-[#1F1F1F] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF3300]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <h2 className="text-sm font-black tracking-widest uppercase mb-8 flex items-center gap-3 relative z-10">
              <i className="ph ph-user text-xl text-[#FF3300]"></i> Identification
            </h2>
            <div className="flex items-center gap-6 mb-8 relative z-10">
              <div className="w-20 h-20 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-3xl font-black">U</div>
              <div>
                <div className="text-2xl font-black uppercase tracking-tighter mb-1">USER_001</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">user.001@steq.sys</div>
              </div>
            </div>
            <div className="border-t border-[#D8D4CA] dark:border-[#1F1F1F] pt-6 relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-black uppercase tracking-widest">Subscription Status</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-[#FF3300] text-white px-2 py-1">Active / Pro</span>
              </div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Renews in 14 days.</p>
            </div>
            <button className="w-full mt-8 border-2 border-black dark:border-white py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
              Manage Account
            </button>
          </div>

          {/* Danger zone */}
          <div className="border border-red-900/30 dark:border-red-900/50 p-8 bg-red-50/50 dark:bg-red-900/10">
            <h2 className="text-xs font-black tracking-widest uppercase text-red-600 mb-4">Danger Zone</h2>
            <p className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-6 leading-relaxed">
              Purging local data will reset all algorithms and remove downloaded matrices.
            </p>
            <button className="text-xs font-black uppercase tracking-[0.2em] text-red-600 border border-red-600 py-3 px-6 hover:bg-red-600 hover:text-white transition-colors">
              Purge System Data
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── App ──────────────────────────────────────────────────────────────────────

const App = () => {
  const [phase, setPhase] = useState('onboarding'); // 'onboarding' | 'success' | 'app'
  const [activeView, setActiveView] = useState('home');
  const [isDark, setIsDark] = useState(true);
  const [nowPlayingOpen, setNowPlayingOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // Inject global styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = globalStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Apply dark mode to html element
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  const handleOnboardingComplete = () => {
    setPhase('success');
  };

  const handleSuccessDone = () => {
    setPhase('app');
    setActiveView('home');
  };

  const handleToggleTheme = (forceDark) => {
    setIsDark(forceDark);
  };

  return (
    <div className={`bg-[#EBE8E3] dark:bg-[#0A0A0A] text-black dark:text-white font-sans w-screen h-screen overflow-hidden flex transition-colors duration-300 antialiased select-none relative`}>
      {/* Onboarding */}
      {phase === 'onboarding' && (
        <OnboardingView onComplete={handleOnboardingComplete} isDark={isDark} />
      )}

      {/* Success */}
      {phase === 'success' && (
        <SuccessView onDone={handleSuccessDone} />
      )}

      {/* App shell */}
      {phase === 'app' && (
        <>
          <Sidebar activeView={activeView} onNavigate={setActiveView} />

          <main className="flex-1 flex flex-col relative overflow-hidden bg-[#EBE8E3] dark:bg-[#0A0A0A]">
            <div className="flex-1 overflow-y-auto no-scrollbar relative pb-[100px]">
              {activeView === 'home' && <HomeView />}
              {activeView === 'search' && <SearchView />}
              {activeView === 'settings' && <SettingsView isDark={isDark} onToggleTheme={handleToggleTheme} />}
            </div>

            <MiniPlayer
              onExpand={() => setNowPlayingOpen(true)}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(p => !p)}
            />
          </main>

          <NowPlayingView
            isOpen={nowPlayingOpen}
            onClose={() => setNowPlayingOpen(false)}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying(p => !p)}
          />
        </>
      )}
    </div>
  );
};

export default App;