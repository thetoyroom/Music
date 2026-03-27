import React, { useState, useEffect } from 'react';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      
      .dark-theme {
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
        --dots-color: rgba(255, 255, 255, 0.07);
      }
      .light-theme {
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
        --dots-color: rgba(10, 10, 12, 0.1);
      }
      .theme-root {
        background-color: var(--bg-base);
        color: var(--text-primary);
        transition: background-color 0.3s ease;
        font-family: 'Inter', sans-serif;
      }
      .bg-base-var { background-color: var(--bg-base); }
      .bg-main-var { background-color: var(--bg-main); }
      .bg-surface-var { background-color: var(--bg-surface); }
      .text-primary-var { color: var(--text-primary); }
      .text-secondary-var { color: var(--text-secondary); }
      .accent-var { color: var(--accent); }
      .bg-accent-var { background-color: var(--accent); }
      .border-color-var { border-color: var(--border); }
      .border-accent-var { border-color: var(--accent); }
      .shadow-brutal-var { box-shadow: var(--shadow-brutal); }
      .bg-dots-var {
        background-image: radial-gradient(var(--dots-color) 1.5px, transparent 1.5px);
        background-size: 24px 24px;
      }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      .genre-tile {
        transition: all 0.2s ease;
      }
      .genre-tile-selected {
        border-color: var(--accent) !important;
        transform: translateY(-2px);
      }
      .check-icon-hidden { opacity: 0; }
      .check-icon-visible { opacity: 1; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const themeClass = isDarkTheme ? 'dark-theme' : 'light-theme';

  const genres = [
    { id: 'electronic', label: 'Electronic', bg: '#1abc9c', textColor: 'white' },
    { id: 'hiphop', label: 'Hip Hop', bg: '#e74c3c', textColor: 'white' },
    { id: 'poprock', label: 'Pop Rock', bg: '#3498db', textColor: 'white' },
    { id: 'darkwave', label: 'Dark Wave', bg: '#9b59b6', textColor: 'white' },
    { id: 'hyperpop', label: 'Hyperpop', bg: '#f1c40f', textColor: 'black' },
    { id: 'ambient', label: 'Ambient', bg: '#34495e', textColor: 'white' },
    { id: 'jazzfusion', label: 'Jazz Fusion', bg: '#e67e22', textColor: 'white' },
    { id: 'folktronica', label: 'Folktronica', bg: '#27ae60', textColor: 'white' },
  ];

  const GenreTile = ({ genre }) => {
    const isSelected = selectedGenres.includes(genre.id);
    return (
      <div
        className="relative cursor-pointer"
        onClick={() => toggleGenre(genre.id)}
      >
        <div
          className={`h-24 border-2 border-color-var flex flex-col items-center justify-center genre-tile shadow-sm ${isSelected ? 'genre-tile-selected' : ''}`}
          style={{ backgroundColor: genre.bg, borderColor: isSelected ? 'var(--accent)' : 'var(--border)' }}
        >
          <span
            className="font-black uppercase tracking-widest text-[10px]"
            style={{ color: genre.textColor }}
          >
            {genre.label}
          </span>
          <div
            className={`mt-2 ${isSelected ? 'check-icon-visible' : 'check-icon-hidden'}`}
            style={{ color: genre.textColor }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`theme-root ${themeClass}`}
      style={{
        height: '844px',
        width: '390px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', sans-serif",
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        margin: '0 auto',
        border: '8px solid black',
        borderRadius: '40px',
        position: 'relative',
      }}
    >
      {/* Header */}
      <header
        className="flex-shrink-0 bg-base-var border-b-2 border-color-var z-30"
        style={{
          paddingTop: '48px',
          paddingBottom: '16px',
          paddingLeft: '24px',
          paddingRight: '24px',
          transition: 'background-color 0.3s ease',
        }}
      >
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="font-black text-2xl tracking-tighter uppercase flex items-center gap-1 text-primary-var"
            style={{ textDecoration: 'none' }}
          >
            STEQMUSIC
            <span className="accent-var text-3xl leading-none" style={{ marginTop: '-4px' }}>■</span>
          </a>
          <button
            onClick={toggleTheme}
            className="bg-surface-var border-2 border-color-var text-secondary-var"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            {isDarkTheme ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
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
            )}
          </button>
        </div>
      </header>

      {/* Main */}
      <main
        className="flex-1 bg-main-var relative z-10 scrollbar-hide flex flex-col"
        style={{
          overflowY: 'auto',
          transition: 'background-color 0.3s ease',
        }}
      >
        {/* Hero Section */}
        <section
          className="bg-dots-var flex-shrink-0"
          style={{ padding: '24px' }}
        >
          <div
            className="flex items-center gap-0 mb-4 bg-surface-var border-2 border-color-var shadow-sm"
            style={{ width: 'max-content' }}
          >
            <div
              className="bg-accent-var flex items-center justify-center"
              style={{ width: '24px', height: '24px', color: 'white' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
            <span
              className="text-primary-var font-black uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.2em', paddingLeft: '8px', paddingRight: '8px' }}
            >
              New Listener
            </span>
          </div>

          <h1
            className="font-black uppercase text-primary-var"
            style={{
              fontSize: '48px',
              lineHeight: '0.85',
              letterSpacing: '-0.05em',
              marginBottom: '24px',
            }}
          >
            Define Your<br />Sonic<br />Identity
          </h1>

          <div
            className="border-accent-var"
            style={{
              borderLeftWidth: '4px',
              borderLeftStyle: 'solid',
              borderLeftColor: 'var(--accent)',
              paddingLeft: '16px',
              marginBottom: '8px',
            }}
          >
            <p
              className="text-secondary-var font-medium"
              style={{ fontSize: '14px', lineHeight: '1.625' }}
            >
              Your feed is currently a blank slate. Choose at least 3 genres to start your journey.
            </p>
          </div>
        </section>

        {/* Genre Grid */}
        <section style={{ paddingLeft: '24px', paddingRight: '24px', paddingBottom: '96px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            {genres.map(genre => (
              <GenreTile key={genre.id} genre={genre} />
            ))}
          </div>
        </section>
      </main>

      {/* Bottom CTA */}
      <div
        className="z-40"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '24px',
          background: 'linear-gradient(to top, var(--bg-base) 60%, var(--bg-base) 80%, transparent 100%)',
        }}
      >
        <button
          className="bg-accent-var shadow-brutal-var"
          style={{
            width: '100%',
            color: 'white',
            fontWeight: '900',
            paddingTop: '20px',
            paddingBottom: '20px',
            paddingLeft: '24px',
            paddingRight: '24px',
            fontSize: '14px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            border: '2px solid transparent',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            borderRadius: 0,
          }}
          onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.95)'; }}
          onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          onTouchStart={e => { e.currentTarget.style.transform = 'scale(0.95)'; }}
          onTouchEnd={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          BUILD MY FEED
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default App;