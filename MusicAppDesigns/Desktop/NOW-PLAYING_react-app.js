import React, { useState, useEffect, useRef } from 'react';

const waveformHeights = [25, 40, 80, 60, 90, 70, 100, 85, 50, 65, 75, 40, 95, 80];
const remainingHeights = [50, 30, 70, 90, 60, 40, 85, 100, 75, 55, 80, 95, 65, 45, 70, 50, 80, 90, 75, 40];

const lyricsLines = [
  { id: 1, text: 'A spark in the dark', active: false },
  { id: 2, text: 'Cells are divided', active: false },
  { id: 3, text: 'Light through\nthe veins', active: true },
  { id: 4, text: 'Skin starts to glow', active: false },
  { id: 5, text: 'Pulse begins to rise', active: false },
  { id: 6, text: 'Awake in the stream', active: false },
  { id: 7, text: 'Into the light', active: false },
  { id: 8, text: 'Forever drifting', active: false },
];

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [lyricsOpen, setLyricsOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(true);
  const lyricsRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
      .bg-dots {
        background-image: radial-gradient(currentColor 1px, transparent 1px);
        background-size: 24px 24px;
      }
      .mask-y {
        -webkit-mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
        mask-image: linear-gradient(to bottom, transparent, black 15%, black 85%, transparent);
      }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    if (lyricsRef.current) {
      lyricsRef.current.scrollTop = 50;
    }
  }, [lyricsOpen]);

  const bgColor = isDark ? '#0A0A0A' : '#F5F5F0';
  const textColor = isDark ? 'white' : '#171717';

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: bgColor,
        color: textColor,
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'background-color 0.5s, color 0.5s',
        userSelect: 'none',
      }}
    >
      {/* Dot background */}
      <div
        className="bg-dots"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          color: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
          transition: 'color 0.5s',
        }}
      />

      {/* Header */}
      <header
        style={{
          position: 'relative',
          zIndex: 50,
          width: '100%',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Back button */}
        <button
          style={{
            width: '2.5rem',
            height: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0.5rem',
            background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            border: 'none',
            cursor: 'pointer',
            color: isDark ? '#a3a3a3' : '#525252',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Center label */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: isDark ? '#737373' : '#a3a3a3' }}>
            Now Playing
          </span>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: isDark ? 'white' : '#171717' }}>
            Immersion Radio
          </span>
        </div>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Lyrics toggle */}
          <button
            onClick={() => setLyricsOpen(!lyricsOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              background: lyricsOpen ? '#FF4422' : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              border: 'none',
              cursor: 'pointer',
              color: lyricsOpen ? 'white' : isDark ? '#a3a3a3' : '#525252',
              transition: 'all 0.2s',
            }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Lyrics
            </span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              width: '2.5rem',
              height: '2.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '0.5rem',
              background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              border: 'none',
              cursor: 'pointer',
              color: isDark ? '#a3a3a3' : '#525252',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}
          >
            {isDark ? (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main layout */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          flex: 1,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 3rem 3rem',
          transition: 'all 0.7s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        {/* Player panel */}
        <div
          style={{
            width: '440px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            transition: 'all 0.7s',
          }}
        >
          {/* Album art */}
          <div
            style={{
              width: '100%',
              aspectRatio: '1/1',
              background: '#0f1115',
              borderRadius: '0.75rem',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: isDark ? '0 32px 64px -12px rgba(0,0,0,0.8)' : '0 32px 64px -12px rgba(0,0,0,0.3)',
              border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <div
              className="bg-dots"
              style={{
                position: 'absolute',
                inset: 0,
                color: 'rgba(255,255,255,0.02)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                width: '14rem',
                height: '14rem',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '50%',
                position: 'relative',
                zIndex: 10,
                transition: 'transform 0.7s ease-out',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                left: '1.25rem',
                zIndex: 20,
                background: '#FF4422',
                color: 'white',
                fontSize: '10px',
                fontWeight: 900,
                padding: '0.25rem 0.625rem',
                borderRadius: '3px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 6px rgba(255,68,34,0.2)',
              }}
            >
              Hi-Res Lossless
            </div>
          </div>

          {/* Info + controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', padding: '0 0.5rem' }}>
            {/* Title + like */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <h1
                  style={{
                    fontSize: '2.5rem',
                    lineHeight: 0.95,
                    fontWeight: 900,
                    letterSpacing: '-0.025em',
                    color: isDark ? 'white' : '#171717',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  Light Through<br />The Veins
                </h1>
                <h2
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    color: '#FF4422',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginTop: '0.5rem',
                    margin: '0.5rem 0 0',
                  }}
                >
                  Jon Hopkins
                </h2>
              </div>
              <button
                onClick={() => setIsLiked(!isLiked)}
                style={{
                  marginTop: '0.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isLiked ? '#FF4422' : isDark ? '#a3a3a3' : '#737373',
                  transition: 'color 0.2s',
                  padding: 0,
                }}
              >
                <svg width="32" height="32" fill={isLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Waveform */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              <div
                style={{
                  width: '100%',
                  height: '3rem',
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '3px',
                  cursor: 'pointer',
                }}
              >
                {waveformHeights.map((h, i) => (
                  <div
                    key={`played-${i}`}
                    style={{
                      width: '6px',
                      background: '#FF4422',
                      borderRadius: '2px 2px 0 0',
                      height: `${h}%`,
                      transition: 'opacity 0.2s',
                      flexShrink: 0,
                    }}
                  />
                ))}
                {remainingHeights.map((h, i) => (
                  <div
                    key={`remaining-${i}`}
                    style={{
                      width: '6px',
                      background: isDark ? '#262626' : '#d4d4d4',
                      borderRadius: '2px 2px 0 0',
                      height: `${h}%`,
                      transition: 'background 0.5s',
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: isDark ? '#a3a3a3' : '#737373',
                  letterSpacing: '0.1em',
                  fontFamily: 'monospace',
                }}
              >
                <span>03:42</span>
                <span>09:21</span>
              </div>
            </div>

            {/* Playback controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
              {/* Shuffle */}
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isDark ? '#a3a3a3' : '#737373',
                  padding: 0,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = isDark ? 'white' : '#171717'}
                onMouseLeave={e => e.currentTarget.style.color = isDark ? '#a3a3a3' : '#737373'}
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>

              {/* Prev */}
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isDark ? '#e5e5e5' : '#262626',
                  padding: 0,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#FF4422'}
                onMouseLeave={e => e.currentTarget.style.color = isDark ? '#e5e5e5' : '#262626'}
              >
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              {/* Play/Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  width: '5rem',
                  height: '5rem',
                  background: '#FF4422',
                  border: 'none',
                  borderRadius: '4px',
                  boxShadow: isDark ? '4px 4px 0px rgba(0,0,0,0.8)' : '4px 4px 0px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  color: 'white',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#E63E1F';
                  e.currentTarget.style.transform = 'translate(2px, 2px)';
                  e.currentTarget.style.boxShadow = isDark ? '2px 2px 0px rgba(0,0,0,0.8)' : '2px 2px 0px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#FF4422';
                  e.currentTarget.style.transform = 'translate(0,0)';
                  e.currentTarget.style.boxShadow = isDark ? '4px 4px 0px rgba(0,0,0,0.8)' : '4px 4px 0px rgba(0,0,0,0.15)';
                }}
              >
                {isPlaying ? (
                  <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Next */}
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isDark ? '#e5e5e5' : '#262626',
                  padding: 0,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#FF4422'}
                onMouseLeave={e => e.currentTarget.style.color = isDark ? '#e5e5e5' : '#262626'}
              >
                <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 6h2v12h-2zm-10 6l8.5-6v12z" />
                </svg>
              </button>

              {/* Repeat */}
              <button
                onClick={() => setIsRepeat(!isRepeat)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isRepeat ? '#FF4422' : isDark ? '#a3a3a3' : '#737373',
                  padding: 0,
                  transition: 'color 0.2s',
                }}
              >
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Lyrics panel */}
        <div
          ref={lyricsRef}
          className="no-scrollbar mask-y"
          style={{
            height: '75vh',
            width: lyricsOpen ? '600px' : '0px',
            opacity: lyricsOpen ? 1 : 0,
            overflowY: 'auto',
            transition: 'all 0.7s cubic-bezier(0.23,1,0.32,1)',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '30vh',
            paddingBottom: '40vh',
            gap: '2.5rem',
            marginLeft: lyricsOpen ? '6rem' : '0',
          }}
        >
          {lyricsLines.map((line) =>
            line.active ? (
              <div
                key={line.id}
                style={{
                  position: 'relative',
                  padding: '1rem 0',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '-2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '6px',
                    height: '4rem',
                    background: '#FF4422',
                    borderRadius: '9999px',
                    boxShadow: '0 0 15px rgba(255,68,34,0.5)',
                  }}
                />
                <h3
                  style={{
                    fontSize: '4rem',
                    fontWeight: 900,
                    letterSpacing: '-0.025em',
                    color: isDark ? 'white' : '#171717',
                    transition: 'color 0.2s',
                    textTransform: 'uppercase',
                    lineHeight: 1.05,
                    margin: 0,
                  }}
                >
                  {line.text.split('\n').map((t, i) => (
                    <span key={i}>
                      {t}
                      {i < line.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </h3>
              </div>
            ) : (
              <p
                key={line.id}
                style={{
                  fontSize: '1.875rem',
                  fontWeight: 700,
                  color: isDark ? '#404040' : '#d4d4d4',
                  transition: 'color 0.2s',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.color = isDark ? '#737373' : '#a3a3a3'}
                onMouseLeave={e => e.currentTarget.style.color = isDark ? '#404040' : '#d4d4d4'}
              >
                {line.text}
              </p>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default App;