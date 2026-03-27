import React, { useState } from 'react';

const customStyles = {
  grad1: { background: 'linear-gradient(135deg, #2c3e50, #000000)' },
  grad2: { background: 'linear-gradient(135deg, #8e44ad, #2c3e50)' },
  grad3: { background: 'linear-gradient(135deg, #d35400, #c0392b)' },
  grad4: { background: 'linear-gradient(135deg, #16a085, #2980b9)' },
  grad5: { background: 'linear-gradient(135deg, #7f8c8d, #2c3e50)' },
};

const cssVars = `
  :root {
    --bg-base: #050505;
    --bg-main: #0a0a0c;
    --bg-surface: #141517;
    --bg-surface-hover: #222326;
    --text-primary: #ffffff;
    --text-secondary: #888b94;
    --accent: #ff3300;
    --border: #222328;
    --shadow-brutal: none;
  }
  body { background-color: #050505; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  .mobile-card { transition: all 0.2s ease; }
`;

const LibraryItem = ({ gradStyle, bgColor, title, subtitle, showDot }) => (
  <div className="flex items-center gap-4 p-3 mobile-card shadow-sm"
    style={{ backgroundColor: '#141517', border: '2px solid #222328' }}>
    <div
      className="w-14 h-14 flex-shrink-0"
      style={{ ...(gradStyle || (bgColor ? { backgroundColor: bgColor } : {})), border: '1px solid #222328' }}
    >
      {!gradStyle && !bgColor && null}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-black text-sm uppercase tracking-wide truncate" style={{ color: '#ffffff' }}>{title}</h4>
      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#888b94' }}>{subtitle}</p>
    </div>
    {showDot && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#ff3300' }}></div>}
  </div>
);

const LikedSongsItem = () => (
  <div className="flex items-center gap-4 p-3 mobile-card shadow-sm"
    style={{ backgroundColor: '#141517', border: '2px solid #222328' }}>
    <div
      className="w-14 h-14 flex-shrink-0 flex items-center justify-center"
      style={{ ...customStyles.grad3, border: '1px solid #222328' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-black text-sm uppercase tracking-wide" style={{ color: '#ffffff' }}>Liked Songs</h4>
      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#888b94' }}>Playlist • 428 tracks</p>
    </div>
    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: '#ff3300' }}></div>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('Playlists');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNav, setActiveNav] = useState('Library');

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = cssVars;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const tabs = ['Playlists', 'Albums', 'Artists', 'Podcasts'];

  const libraryItems = [
    { id: 2, gradStyle: customStyles.grad1, title: 'Techno Bunker 2024', subtitle: 'Playlist • SteqMusic' },
    { id: 3, gradStyle: customStyles.grad5, title: 'Singularity', subtitle: 'Album • Jon Hopkins' },
    { id: 4, gradStyle: customStyles.grad4, title: 'Late Night Lo-Fi', subtitle: 'Playlist • Made for you' },
    { id: 5, gradStyle: customStyles.grad2, title: 'Modern Jazz Giants', subtitle: 'Playlist • SteqMusic' },
    { id: 6, bgColor: '#34495e', title: 'Discovery Weekly', subtitle: 'Playlist • New music' },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#000', fontFamily: 'Inter, sans-serif' }}>
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          height: '844px',
          width: '390px',
          backgroundColor: '#050505',
          color: '#ffffff',
          border: '8px solid black',
          borderRadius: '40px',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {/* Header */}
        <header
          className="flex-shrink-0 pt-12 pb-4 px-5 relative z-30"
          style={{ backgroundColor: '#050505', borderBottom: '2px solid #222328' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-black text-2xl tracking-tighter uppercase flex items-center gap-2" style={{ color: '#ffffff' }}>
              Your Library
              <span className="text-3xl leading-none -mt-1" style={{ color: '#ff3300' }}>■</span>
            </h1>
            <div className="flex items-center gap-3">
              <button
                className="w-10 h-10 flex items-center justify-center shadow-sm"
                style={{ backgroundColor: '#141517', border: '2px solid #222328', color: '#ffffff' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tab filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-2.5 font-black text-[10px] uppercase tracking-widest flex-shrink-0"
                style={
                  activeTab === tab
                    ? { backgroundColor: '#ff3300', color: '#ffffff', border: '2px solid transparent' }
                    : { backgroundColor: '#141517', color: '#888b94', border: '2px solid #222328' }
                }
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        {/* Main content */}
        <main
          className="flex-1 overflow-y-auto scrollbar-hide relative z-10"
          style={{ backgroundColor: '#0a0a0c' }}
        >
          {/* Create new playlist button */}
          <section className="p-5">
            <button
              className="w-full p-4 flex items-center gap-4 shadow-sm active:scale-[0.98] mobile-card"
              style={{ backgroundColor: '#141517', border: '2px solid #222328' }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#0a0a0c', border: '2px dashed rgba(136,139,148,0.3)', color: '#888b94' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="font-black text-sm uppercase tracking-wide" style={{ color: '#ffffff' }}>Create new playlist</h3>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#888b94' }}>Build your own collection</p>
              </div>
            </button>
          </section>

          {/* Recently Added section */}
          <section className="mb-6">
            <div className="px-5 mb-4 flex justify-between items-end">
              <h2 className="text-lg font-black tracking-tight uppercase" style={{ color: '#ffffff' }}>Recently Added</h2>
              <button className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: '#888b94' }}>Sort By ▼</button>
            </div>

            <div className="flex flex-col gap-1 px-5">
              <LikedSongsItem />
              {libraryItems.map(item => (
                <LibraryItem
                  key={item.id}
                  gradStyle={item.gradStyle}
                  bgColor={item.bgColor}
                  title={item.title}
                  subtitle={item.subtitle}
                  showDot={item.showDot}
                />
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="flex-shrink-0 flex flex-col w-full z-50">
          {/* Mini player */}
          <div
            className="h-16 flex items-center px-4 justify-between relative z-20"
            style={{ backgroundColor: '#141517', borderTop: '2px solid #222328' }}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
              <div
                className="w-10 h-10 flex-shrink-0 shadow-sm"
                style={{ ...customStyles.grad1, border: '2px solid #222328' }}
              ></div>
              <div className="flex flex-col min-w-0">
                <span className="font-black text-xs truncate uppercase tracking-wide" style={{ color: '#ffffff' }}>Light Through The Veins</span>
                <span className="text-[10px] font-bold truncate mt-0.5 uppercase tracking-wider" style={{ color: '#888b94' }}>Jon Hopkins</span>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <button style={{ color: '#ffffff' }} onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Bottom nav */}
          <nav
            className="h-[72px] flex items-center justify-around pb-6 z-10 relative"
            style={{ backgroundColor: '#050505', borderTop: '2px solid #222328' }}
          >
            {[
              {
                id: 'Home',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                )
              },
              {
                id: 'Explore',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                )
              },
              {
                id: 'Library',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                )
              },
              {
                id: 'Settings',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                )
              },
            ].map(navItem => (
              <button
                key={navItem.id}
                className="flex flex-col items-center justify-center w-full h-full gap-1"
                style={{ color: activeNav === navItem.id ? '#ff3300' : '#888b94' }}
                onClick={() => setActiveNav(navItem.id)}
              >
                {navItem.icon}
                <span className="text-[8px] font-black tracking-widest uppercase">{navItem.id}</span>
              </button>
            ))}
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default App;