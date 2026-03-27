import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
  bgDots: {
    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px)',
    backgroundSize: '24px 24px',
  },
  brutalShadow: {
    boxShadow: '4px 4px 0px 0px #222328',
  },
  brutalShadowAccent: {
    boxShadow: '4px 4px 0px 0px #000000',
  },
  glowText: {
    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
  },
  glowAccent: {
    boxShadow: '0 0 15px rgba(255, 51, 0, 0.5)',
  },
};

const WaveformBar = ({ delay }) => {
  const [height, setHeight] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeight(Math.random() * 12 + 4);
    }, 300 + delay * 200);
    return () => clearInterval(interval);
  }, [delay]);

  return (
    <div
      style={{
        width: '3px',
        height: `${height}px`,
        backgroundColor: '#ff3300',
        borderRadius: '1px',
        transition: 'height 0.3s ease-in-out',
        animationDelay: `${delay}s`,
      }}
    />
  );
};

const LyricsPage = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const [activeButtonStyle, setActiveButtonStyle] = useState({});

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body {
        background-color: #050505;
        -webkit-tap-highlight-color: transparent;
      }
      .brutal-shadow-active:active {
        transform: translate(4px, 4px);
        box-shadow: 0px 0px 0px 0px #222328 !important;
      }
      .brutal-shadow-accent-active:active {
        transform: translate(2px, 2px);
        box-shadow: 0px 0px 0px 0px #000000 !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      className="h-screen w-screen overflow-hidden flex flex-col font-sans antialiased relative"
      style={{ backgroundColor: '#050505', color: '#ffffff' }}
    >
      {/* Background dots */}
      <div
        className="absolute inset-0 opacity-40 z-0 pointer-events-none"
        style={customStyles.bgDots}
      />

      {/* Header */}
      <header
        className="flex-shrink-0 pt-14 pb-4 px-6 flex items-center justify-between z-30 relative backdrop-blur-sm border-b-2"
        style={{
          backgroundColor: 'rgba(5, 5, 5, 0.8)',
          borderColor: 'rgba(34, 35, 40, 0.5)',
        }}
      >
        <button
          className="w-10 h-10 border-2 flex items-center justify-center active:scale-95 transition-all"
          style={{
            borderColor: '#222328',
            color: '#ffffff',
            backgroundColor: '#141517',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
          <span
            className="text-[10px] font-black uppercase tracking-[0.3em]"
            style={{ color: '#888b94' }}
          >
            Now Playing
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#ffffff' }}>
            Lyrics
          </span>
        </div>
        <button
          className="w-10 h-10 border-2 flex items-center justify-center active:scale-95 transition-all"
          style={{
            borderColor: '#222328',
            color: '#ffffff',
            backgroundColor: '#141517',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </header>

      {/* Song info bar */}
      <div
        className="px-6 py-4 z-20 relative flex items-center justify-between border-b-2"
        style={{
          borderColor: 'rgba(34, 35, 40, 0.5)',
          backgroundColor: 'rgba(10, 10, 12, 0.5)',
        }}
      >
        <div className="flex-1 pr-4">
          <h2
            className="text-xl font-black uppercase tracking-tighter leading-none mb-1 truncate"
            style={{ color: '#ffffff' }}
          >
            Light Through The Veins
          </h2>
          <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#ff3300' }}>
            Jon Hopkins
          </p>
        </div>
        <div className="flex items-end h-4 gap-[2px]">
          <WaveformBar delay={0.0} />
          <WaveformBar delay={0.2} />
          <WaveformBar delay={0.4} />
          <WaveformBar delay={0.1} />
          <WaveformBar delay={0.5} />
        </div>
      </div>

      {/* Main lyrics area */}
      <main className="flex-1 flex flex-col justify-center px-6 relative z-10 overflow-hidden py-8">
        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 h-24 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #050505, transparent)',
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, #050505, transparent)',
          }}
        />

        <div className="flex flex-col gap-12 relative z-10">
          {/* Previous lyric */}
          <div className="transform transition-all duration-500 origin-left pl-6">
            <p
              className="text-2xl font-bold uppercase tracking-tight leading-tight"
              style={{ color: '#888b94', opacity: 0.4 }}
            >
              Cells are divided
            </p>
          </div>

          {/* Active lyric */}
          <div className="flex items-stretch gap-4 transform transition-all duration-500 scale-100">
            <div
              className="w-2 shrink-0 animate-pulse"
              style={{
                backgroundColor: '#ff3300',
                ...customStyles.glowAccent,
              }}
            />
            <div className="flex-1 flex flex-col justify-center py-2">
              <p
                className="text-5xl font-black uppercase tracking-tighter leading-[1.05] break-words"
                style={{
                  color: '#ffffff',
                  ...customStyles.glowText,
                }}
              >
                Light through the veins
              </p>
              {/* Progress bar */}
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="h-1 flex-1 rounded-none overflow-hidden border"
                  style={{
                    backgroundColor: '#141517',
                    borderColor: '#222328',
                  }}
                >
                  <div
                    className="h-full relative"
                    style={{
                      backgroundColor: '#ff3300',
                      width: '65%',
                      ...customStyles.glowAccent,
                    }}
                  >
                    <div
                      className="absolute right-0 top-0 bottom-0 w-2"
                      style={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next lyric */}
          <div className="transform transition-all duration-500 origin-left pl-6">
            <p
              className="text-2xl font-bold uppercase tracking-tight leading-tight"
              style={{ color: '#888b94', opacity: 0.4 }}
            >
              Skin starts to glow
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="px-6 pb-10 pt-6 z-20 relative flex flex-col gap-8 border-t-2"
        style={{
          backgroundColor: '#050505',
          borderColor: '#222328',
        }}
      >
        {/* Playback controls */}
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-black tracking-widest w-12"
            style={{ color: '#888b94' }}
          >
            03:42
          </span>

          <div className="flex items-center gap-8">
            <button
              className="active:scale-90 transition-all"
              style={{ color: '#888b94' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#888b94')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="19 20 9 12 19 4 19 20" />
                <rect width="2" height="16" x="5" y="4" />
              </svg>
            </button>

            <button
              className="w-14 h-14 text-white border-2 flex items-center justify-center brutal-shadow-accent-active transition-all"
              style={{
                backgroundColor: '#ff3300',
                borderColor: '#000000',
                ...customStyles.brutalShadowAccent,
              }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
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

            <button
              className="active:scale-90 transition-all"
              style={{ color: '#ffffff' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 4 15 12 5 20 5 4" />
                <rect width="2" height="16" x="17" y="4" />
              </svg>
            </button>
          </div>

          <span
            className="text-[10px] font-black tracking-widest w-12 text-right"
            style={{ color: '#888b94' }}
          >
            09:21
          </span>
        </div>

        {/* Read full lyrics button */}
        <button
          className="w-full border-2 py-4 px-6 flex items-center justify-between brutal-shadow-active transition-all group"
          style={{
            backgroundColor: '#141517',
            borderColor: '#222328',
            color: '#ffffff',
            ...customStyles.brutalShadow,
          }}
          onClick={() => setShowFullLyrics(!showFullLyrics)}
        >
          <div className="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: '#888b94' }}
            >
              <line x1="21" y1="10" x2="3" y2="10" />
              <line x1="21" y1="6" x2="3" y2="6" />
              <line x1="21" y1="14" x2="3" y2="14" />
              <line x1="21" y1="18" x2="3" y2="18" />
            </svg>
            <span className="text-[12px] font-black uppercase tracking-[0.2em] pt-0.5">
              Read Full Lyrics
            </span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: '#888b94' }}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>

        {/* Home indicator */}
        <div
          className="h-1.5 w-32 mx-auto absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full opacity-20"
          style={{ backgroundColor: '#141517' }}
        />
      </footer>

      {/* Full Lyrics Modal */}
      {showFullLyrics && (
        <div
          className="absolute inset-0 z-50 flex flex-col"
          style={{ backgroundColor: '#050505' }}
        >
          <div
            className="flex-shrink-0 pt-14 pb-4 px-6 flex items-center justify-between border-b-2"
            style={{ borderColor: '#222328' }}
          >
            <button
              className="w-10 h-10 border-2 flex items-center justify-center active:scale-95 transition-all"
              style={{
                borderColor: '#222328',
                color: '#ffffff',
                backgroundColor: '#141517',
              }}
              onClick={() => setShowFullLyrics(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#888b94' }}>
                Full Lyrics
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#ffffff' }}>
                Light Through The Veins
              </span>
            </div>
            <div className="w-10 h-10" />
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={customStyles.bgDots}
            />
            <div className="relative z-10 flex flex-col gap-6">
              {[
                'Cells are divided',
                'Light through the veins',
                'Skin starts to glow',
                'A pulse in the dark',
                'We move like water',
                'Through corridors of light',
                'The body remembers',
                'What the mind forgot',
                'Breathing in silence',
                'The world falls away',
                'Only this moment',
                'Only this place',
                'Light through the veins',
                'Light through the veins',
              ].map((line, index) => (
                <p
                  key={index}
                  className="text-2xl font-black uppercase tracking-tighter leading-tight"
                  style={{
                    color: index === 1 || index === 12 || index === 13 ? '#ff3300' : '#ffffff',
                    opacity: index === 1 || index === 12 || index === 13 ? 1 : 0.7,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<LyricsPage />} />
      </Routes>
    </Router>
  );
};

export default App;