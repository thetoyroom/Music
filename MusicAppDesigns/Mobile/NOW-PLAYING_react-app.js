import React, { useState, useEffect, useRef } from 'react';

const customStyles = {
  root: {
    '--bg-base': '#050505',
    '--bg-main': '#0a0a0c',
    '--bg-surface': '#141517',
    '--text-primary': '#ffffff',
    '--text-secondary': '#888b94',
    '--accent': '#ff3300',
    '--border': '#222328',
    '--dots-color': 'rgba(255, 255, 255, 0.05)',
  },
  bgDots: {
    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1.5px, transparent 1.5px)',
    backgroundSize: '24px 24px',
  },
  gradAlbum: {
    background: 'linear-gradient(135deg, #1a2a3a, #050505)',
  },
};

const generateWaveformBars = () => {
  const bars = [];
  for (let i = 0; i < 60; i++) {
    const h = Math.floor(Math.random() * 80) + 20;
    bars.push({ height: h, active: i < 24 });
  }
  return bars;
};

const WaveformBar = ({ height, active }) => (
  <div
    style={{
      width: '3px',
      height: `${height}%`,
      backgroundColor: active ? '#ff3300' : '#888b94',
      borderRadius: '1px',
      transition: 'height 0.2s ease',
      flexShrink: 0,
    }}
  />
);

const App = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isRepeat, setIsRepeat] = useState(true);
  const waveformBars = useRef(generateWaveformBars()).current;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * { -webkit-tap-highlight-color: transparent; }
      body { margin: 0; padding: 0; background-color: #050505; }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#050505',
        color: '#ffffff',
        fontFamily: "'Inter', sans-serif",
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        maxWidth: '430px',
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Header */}
      <header
        style={{
          flexShrink: 0,
          paddingTop: '56px',
          paddingBottom: '16px',
          paddingLeft: '24px',
          paddingRight: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 30,
        }}
      >
        <button
          style={{
            width: '40px',
            height: '40px',
            border: '2px solid #222328',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            backgroundColor: '#141517',
            boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
            cursor: 'pointer',
            transition: 'transform 0.1s',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onTouchStart={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.3em', color: '#888b94' }}>Now Playing</span>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Immersion Radio</span>
        </div>

        <button
          style={{
            width: '40px',
            height: '40px',
            border: '2px solid #222328',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            backgroundColor: '#141517',
            boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
            cursor: 'pointer',
            transition: 'transform 0.1s',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          onTouchStart={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '16px',
          paddingBottom: '16px',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        {/* Album Art */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1/1',
            border: '2px solid #222328',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              ...customStyles.bgDots,
              opacity: 0.4,
              zIndex: 10,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              ...customStyles.gradAlbum,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className="animate-pulse"
              style={{
                width: '192px',
                height: '192px',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '128px',
                height: '128px',
                border: '1px solid rgba(255,51,0,0.2)',
                borderRadius: '50%',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              zIndex: 20,
              backgroundColor: '#ff3300',
              color: '#ffffff',
              padding: '4px 12px',
              fontSize: '10px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              border: '2px solid #000000',
            }}
          >
            Hi-Res Lossless
          </div>
        </div>

        {/* Track Info */}
        <div style={{ marginTop: '32px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h1
                style={{
                  fontSize: '30px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: '#ffffff',
                  marginBottom: '8px',
                  margin: '0 0 8px 0',
                }}
              >
                Light Through The Veins
              </h1>
              <p
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#ff3300',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: 0,
                }}
              >
                Jon Hopkins
              </p>
            </div>
            <button
              onClick={() => setIsLiked(!isLiked)}
              style={{
                marginTop: '4px',
                color: isLiked ? '#ff3300' : '#888b94',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
                padding: 0,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill={isLiked ? '#ff3300' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Waveform */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              height: '48px',
              gap: '2px',
              paddingLeft: '4px',
              paddingRight: '4px',
            }}
          >
            {waveformBars.map((bar, i) => (
              <WaveformBar key={i} height={bar.height} active={bar.active} />
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '10px',
              fontWeight: 900,
              color: '#888b94',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            <span>03:42</span>
            <span>09:21</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingBottom: '40px' }}>
          {/* Playback Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button
              onClick={() => setIsRepeat(!isRepeat)}
              style={{
                color: isRepeat ? '#ff3300' : '#888b94',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
                padding: 0,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3h5v5"></path>
                <path d="M4 20 21 3"></path>
                <path d="M21 16v5h-5"></path>
                <path d="m4 4 5 5"></path>
              </svg>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              {/* Previous */}
              <button
                style={{
                  color: '#ffffff',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.1s',
                  padding: 0,
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                onTouchStart={e => e.currentTarget.style.transform = 'scale(0.9)'}
                onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="19 20 9 12 19 4 19 20"></polygon>
                  <rect width="2" height="16" x="5" y="4"></rect>
                </svg>
              </button>

              {/* Play/Pause */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#ff3300',
                  color: '#ffffff',
                  border: '2px solid #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '4px 4px 0px 0px #222',
                  cursor: 'pointer',
                  transition: 'all 0.1s',
                }}
                onMouseDown={e => {
                  e.currentTarget.style.transform = 'translate(2px, 2px)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseUp={e => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '4px 4px 0px 0px #222';
                }}
                onTouchStart={e => {
                  e.currentTarget.style.transform = 'translate(2px, 2px)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onTouchEnd={e => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '4px 4px 0px 0px #222';
                }}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </button>

              {/* Next */}
              <button
                style={{
                  color: '#ffffff',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'transform 0.1s',
                  padding: 0,
                }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                onTouchStart={e => e.currentTarget.style.transform = 'scale(0.9)'}
                onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 4 15 12 5 20 5 4"></polygon>
                  <rect width="2" height="16" x="17" y="4"></rect>
                </svg>
              </button>
            </div>

            <button
              style={{
                color: '#ff3300',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9"></polyline>
                <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                <polyline points="7 23 3 19 7 15"></polyline>
                <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
              </svg>
            </button>
          </div>

          {/* Bottom Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '2px solid #222328',
              paddingTop: '24px',
            }}
          >
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#888b94',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.2s',
                padding: 0,
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = '#888b94'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20v-6M9 20v-10M6 20v-4M15 20v-8M18 20v-12"></path>
              </svg>
              <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Audio Tech</span>
            </button>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#ffffff',
                backgroundColor: '#141517',
                border: '2px solid #222328',
                padding: '8px 16px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                transition: 'transform 0.1s',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onTouchStart={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Queue</span>
            </button>
          </div>
        </div>
      </main>

      {/* Home Indicator */}
      <div
        style={{
          height: '6px',
          width: '128px',
          backgroundColor: '#141517',
          margin: '0 auto 8px',
          borderRadius: '9999px',
          opacity: 0.2,
        }}
      />
    </div>
  );
};

export default App;