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

const TrackRow = ({ number, gradClass, title, album, plays, duration, isPlaying, onPlay }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-center gap-6 p-4 border border-bordercolor hover:bg-surface-hover transition-colors group cursor-pointer shadow-sm"
      style={{ backgroundColor: 'var(--bg-surface)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPlay}
    >
      {hovered ? (
        <button className="w-4 flex text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
      ) : (
        <span className="w-4 text-xs font-bold text-secondary">{number}</span>
      )}
      <div className={`w-12 h-12 ${gradClass} flex-shrink-0 border border-bordercolor`}></div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold truncate text-sm uppercase" style={{ color: 'var(--text-primary)' }}>{title}</h4>
        <p className="text-[10px] truncate mt-1 font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{album}</p>
      </div>
      <span className="hidden md:block text-xs font-medium tabular-nums" style={{ color: 'var(--text-secondary)' }}>{plays}</span>
      <span className="text-xs font-bold w-12 text-right tabular-nums" style={{ color: 'var(--text-secondary)' }}>{duration}</span>
    </div>
  );
};

const AlbumCard = ({ gradClass, title, year, type }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="group cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div
        className={`aspect-square border-2 border-bordercolor ${gradClass} mb-4 relative transition-transform duration-300`}
        style={{ transform: hovered ? 'translateY(-8px)' : 'translateY(0)', boxShadow: hovered ? 'var(--shadow-brutal)' : 'none' }}
      >
        {hovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button className="w-12 h-12 flex items-center justify-center text-white" style={{ backgroundColor: 'var(--accent)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
          </div>
        )}
      </div>
      <h3 className="font-black text-sm uppercase" style={{ color: 'var(--text-primary)' }}>{title}</h3>
      <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-secondary)' }}>{year} • {type}</p>
    </div>
  );
};

const ArtistCard = ({ gradClass, name }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex-none w-44 text-center cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div
        className="w-full aspect-square border-2 border-bordercolor mb-4 overflow-hidden shadow-sm"
        style={{
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform 0.3s',
          boxShadow: hovered ? 'var(--shadow-brutal)' : ''
        }}
      >
        <div className={`w-full h-full ${gradClass}`}></div>
      </div>
      <h3 className="font-bold text-xs uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>{name}</h3>
    </div>
  );
};

const HomePage = ({ isLight, currentTrack, setCurrentTrack }) => {
  const tracks = [
    { number: '01', gradClass: 'grad-1', title: 'Emerald Rush', album: 'Singularity', plays: '124,502,910', duration: '5:36' },
    { number: '02', gradClass: 'grad-4', title: 'Light Through The Veins', album: 'Immunity', plays: '98,211,043', duration: '9:21' },
    { number: '03', gradClass: 'grad-7', title: 'Sit Around The Fire', album: 'Music for Psychedelic Therapy', plays: '84,103,441', duration: '8:22' },
    { number: '04', gradClass: 'grad-2', title: 'Luminous Beings', album: 'Singularity', plays: '72,001,832', duration: '11:51' },
  ];

  const albums = [
    { gradClass: 'grad-1', title: 'Singularity', year: '2018', type: 'Album' },
    { gradClass: 'grad-4', title: 'Immunity', year: '2013', type: 'Album' },
    { gradClass: 'grad-7', title: 'Music for Psychedelics', year: '2021', type: 'Album' },
    { gradClass: 'grad-2', title: 'Asleep Versions', year: '2014', type: 'EP' },
    { gradClass: 'grad-3', title: 'Insides', year: '2009', type: 'Album' },
  ];

  const similarArtists = [
    { gradClass: 'grad-5', name: 'Max Cooper' },
    { gradClass: 'grad-6', name: 'Nils Frahm' },
    { gradClass: 'grad-7', name: 'Rival Consoles' },
    { gradClass: 'grad-1', name: 'Kiasmos' },
    { gradClass: 'grad-4', name: 'Bonobo' },
  ];

  const [following, setFollowing] = useState(true);

  return (
    <div className="flex-1 overflow-y-auto pb-40 pt-24 px-10 scrollbar-hide relative z-10">
      <section
        className="mt-8 mb-16 relative w-full border-2 border-bordercolor overflow-hidden flex"
        style={{ backgroundColor: 'var(--hero-bg)', height: '400px', boxShadow: 'var(--shadow-brutal)', transition: 'all 0.3s' }}
      >
        <div className="flex-1 p-10 md:p-16 relative z-10 flex flex-col justify-end bg-dots">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent)' }}></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: 'var(--text-primary)' }}>Verified Artist</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase mb-6" style={{ color: 'var(--text-primary)' }}>
            Jon Hopkins
          </h1>
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>2,841,902</span>
              <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Monthly Listeners</span>
            </div>
            <div className="h-10 w-px" style={{ backgroundColor: 'var(--border)', opacity: 0.5 }}></div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setFollowing(!following)}
                className="font-black py-3 px-8 text-xs tracking-widest uppercase flex items-center gap-3 hover:opacity-90 transition-all"
                style={{
                  backgroundColor: following ? 'var(--accent)' : 'var(--bg-surface)',
                  color: following ? '#ffffff' : 'var(--text-primary)',
                  boxShadow: 'var(--shadow-brutal)',
                  border: '2px solid transparent'
                }}
              >
                {following ? 'FOLLOWING' : 'FOLLOW'}
              </button>
              <button
                className="w-12 h-12 flex items-center justify-center border-2 border-bordercolor transition-colors hover:border-accent"
                style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 absolute right-0 top-0 h-full overflow-hidden artist-hero-mask">
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-surface)' }}>
            <div className="w-3/4 h-3/4 grad-4 opacity-40 blur-3xl rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/10" style={{ animation: 'spin 20s linear infinite', color: 'var(--text-primary)', opacity: 0.1 }}>
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2v20M2 12h20"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col xl:flex-row gap-16">
        <div className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>Popular Tracks</h2>
            <button className="text-xs font-bold tracking-widest uppercase transition-colors hover:text-accent" style={{ color: 'var(--text-secondary)' }}>View Discography</button>
          </div>
          <div className="space-y-2">
            {tracks.map((track, idx) => (
              <TrackRow
                key={idx}
                {...track}
                onPlay={() => setCurrentTrack(track)}
              />
            ))}
          </div>
        </div>

        <div className="w-full xl:w-[320px]">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-lg font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>About</h2>
          </div>
          <div
            className="border-2 border-bordercolor p-6 relative overflow-hidden shadow-sm group transition-all"
            style={{ backgroundColor: 'var(--bg-surface)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-brutal)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = ''}
          >
            <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
              </svg>
            </div>
            <p className="text-sm font-medium leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              English musician, producer and DJ who writes and performs electronic music. He began his career playing keyboard for Imogen Heap, and has produced or contributed to albums by Brian Eno, Coldplay, and David Lynch.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Ambient', 'Idm', 'Techno'].map(tag => (
                <span key={tag} className="px-2 py-1 border border-bordercolor text-[9px] font-black uppercase tracking-wider" style={{ color: 'var(--text-primary)' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20 mb-14">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>Essential Albums</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {albums.map((album, idx) => (
            <AlbumCard key={idx} {...album} />
          ))}
        </div>
      </section>

      <section className="mt-20 mb-14">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>Fans also like</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-hide -mx-10 px-10">
          {similarArtists.map((artist, idx) => (
            <ArtistCard key={idx} {...artist} />
          ))}
        </div>
      </section>
    </div>
  );
};

const App = () => {
  const [isLight, setIsLight] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Light Through The Veins',
    album: 'Jon Hopkins',
    gradClass: 'grad-4',
    duration: '9:21',
    plays: '98,211,043'
  });
  const [searchValue, setSearchValue] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .bg-dots {
        background-image: radial-gradient(var(--dots-color) 1.5px, transparent 1.5px);
        background-size: 24px 24px;
      }
      .grad-1 { background: linear-gradient(135deg, #2c3e50, #000000); }
      .grad-2 { background: linear-gradient(135deg, #8e44ad, #2c3e50); }
      .grad-3 { background: linear-gradient(135deg, #d35400, #c0392b); }
      .grad-4 { background: linear-gradient(135deg, #16a085, #2980b9); }
      .grad-5 { background: linear-gradient(135deg, #7f8c8d, #2c3e50); }
      .grad-6 { background: linear-gradient(135deg, #c0392b, #8e44ad); }
      .grad-7 { background: linear-gradient(135deg, #2980b9, #2c3e50); }
      .artist-hero-mask {
        mask-image: linear-gradient(to right, black 60%, transparent 100%);
        -webkit-mask-image: linear-gradient(to right, black 60%, transparent 100%);
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      * { transition-property: background-color, border-color, color; transition-duration: 0.3s; }
    `;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  useEffect(() => {
    const vars = isLight ? customStyles.rootLight : customStyles.root;
    Object.entries(vars).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });
  }, [isLight]);

  const themeVars = isLight ? customStyles.rootLight : customStyles.root;

  return (
    <Router basename="/">
      <div
        className="h-screen w-screen overflow-hidden flex flex-col font-sans antialiased"
        style={{
          backgroundColor: 'var(--bg-base)',
          color: 'var(--text-primary)',
          fontFamily: 'Inter, sans-serif',
          ...Object.fromEntries(Object.entries(themeVars).map(([k, v]) => [k, v]))
        }}
      >
        <div className="flex flex-1 overflow-hidden h-full relative">
          {/* Sidebar */}
          <aside
            className="w-[260px] border-r border-bordercolor flex flex-col z-30 flex-shrink-0"
            style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}
          >
            <div className="h-24 flex items-center px-8 border-b border-bordercolor/50" style={{ borderColor: 'var(--border)' }}>
              <a href="#" className="font-black text-2xl tracking-tighter uppercase flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                STEQMUSIC<span className="text-3xl leading-none -mt-1" style={{ color: 'var(--accent)' }}>■</span>
              </a>
            </div>

            <div className="flex-1 overflow-y-auto py-8 px-4 scrollbar-hide flex flex-col gap-10">
              <div>
                <div className="px-4 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--text-secondary)' }}>Menu</div>
                <nav className="space-y-1">
                  {['HOME', 'EXPLORE', 'TRENDING'].map(item => (
                    <a
                      key={item}
                      href="#"
                      className="flex items-center gap-4 px-4 py-3 rounded-md font-semibold transition-all"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = ''; }}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>

              <div>
                <div className="px-4 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--text-secondary)' }}>Library</div>
                <nav className="space-y-1">
                  {['RECENT', 'PLAYLISTS'].map(item => (
                    <a
                      key={item}
                      href="#"
                      className="flex items-center gap-4 px-4 py-3 rounded-md font-semibold transition-all"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = ''; }}
                    >
                      {item}
                    </a>
                  ))}
                  <a
                    href="#"
                    className="flex items-center gap-4 px-4 py-3 rounded-md font-bold transition-all"
                    style={{ backgroundColor: 'var(--accent)', color: '#ffffff', boxShadow: 'var(--shadow-brutal)' }}
                  >
                    ARTISTS
                  </a>
                  {['IMPORT'].map(item => (
                    <a
                      key={item}
                      href="#"
                      className="flex items-center gap-4 px-4 py-3 rounded-md font-semibold transition-all"
                      style={{ color: 'var(--text-secondary)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = ''; }}
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            <div className="p-4 border-t border-bordercolor/50" style={{ borderColor: 'var(--border)' }}>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-md font-bold transition-all"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = ''; }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                SETTINGS
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col relative overflow-hidden" style={{ backgroundColor: 'var(--bg-main)' }}>
            {/* Header */}
            <header
              className="h-24 absolute top-0 w-full z-20 flex items-center justify-between px-10 border-b border-bordercolor backdrop-blur-xl"
              style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--border)' }}
            >
              <div className="relative w-full max-w-xl group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: searchValue ? 'var(--accent)' : 'var(--text-secondary)' }}>
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="SEARCH ARTISTS, SONGS, PODCASTS..."
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  className="w-full border rounded-none py-3.5 pl-12 pr-4 focus:outline-none font-semibold text-xs tracking-wider transition-all shadow-sm"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: searchValue ? 'var(--accent)' : 'var(--border)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              <div className="flex items-center gap-6">
                <button
                  onClick={() => setIsLight(!isLight)}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-bordercolor transition-all"
                  style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
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
                    <div className="text-xs font-bold uppercase tracking-wider transition-colors group-hover:text-accent" style={{ color: 'var(--text-primary)' }}>USER_992</div>
                    <div className="text-[10px] uppercase font-semibold" style={{ color: 'var(--text-secondary)' }}>Premium</div>
                  </div>
                  <div
                    className="w-12 h-12 border-2 border-bordercolor flex items-center justify-center transition-all shadow-sm"
                    style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
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

            <Routes>
              <Route path="/" element={<HomePage isLight={isLight} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} />} />
            </Routes>
          </main>
        </div>

        {/* Footer Player */}
        <footer
          className="h-[100px] border-t-2 border-bordercolor w-full flex items-center justify-between px-8 z-50 flex-shrink-0"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-6 w-1/3 min-w-[250px]">
            <div className={`w-16 h-16 ${currentTrack.gradClass} border-2 border-bordercolor flex-shrink-0 shadow-sm`} style={{ borderColor: 'var(--border)' }}></div>
            <div className="flex flex-col truncate pr-4">
              <a href="#" className="font-black text-sm truncate uppercase tracking-wide transition-colors hover:text-accent" style={{ color: 'var(--text-primary)' }}>{currentTrack.title}</a>
              <a href="#" className="text-xs font-semibold truncate mt-1 transition-colors hover:text-primary" style={{ color: 'var(--text-secondary)' }}>{currentTrack.album}</a>
            </div>
            <div className="flex items-center gap-3 ml-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="transition-colors"
                style={{ color: isLiked ? 'var(--accent)' : 'var(--text-secondary)' }}
                onMouseEnter={e => !isLiked && (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={e => !isLiked && (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>
              <button
                className="transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-1/3 max-w-[500px]">
            <div className="flex items-center gap-6 mb-2">
              <button className="transition-colors" style={{ color: 'var(--text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 3 21 3 21 8"></polyline>
                  <line x1="4" y1="20" x2="21" y2="3"></line>
                </svg>
              </button>
              <button className="transition-colors" style={{ color: 'var(--text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="19 20 9 12 19 4 19 20"></polygon>
                </svg>
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 flex items-center justify-center text-white hover:scale-105 transition-transform"
                style={{ backgroundColor: 'var(--accent)', boxShadow: 'var(--shadow-brutal)', border: '2px solid transparent' }}
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
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                </svg>
              </button>
              <button className="transition-colors" style={{ color: 'var(--text-secondary)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                </svg>
              </button>
            </div>
            <div className="w-full flex items-center gap-3">
              <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>3:14</span>
              <div className="h-2 flex-1 relative border border-bordercolor overflow-hidden" style={{ backgroundColor: 'var(--bg-surface-hover)', borderColor: 'var(--border)' }}>
                <div className="absolute left-0 top-0 h-full w-1/3" style={{ backgroundColor: 'var(--accent)' }}></div>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              </svg>
              <div className="h-2 flex-1 relative border border-bordercolor" style={{ backgroundColor: 'var(--bg-surface-hover)', borderColor: 'var(--border)' }}>
                <div className="absolute left-0 top-0 h-full w-2/3" style={{ backgroundColor: 'var(--text-primary)' }}></div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;