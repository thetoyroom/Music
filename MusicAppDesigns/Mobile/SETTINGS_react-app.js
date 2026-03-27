import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const styles = {
  root: {
    '--bg-base': '#050505',
    '--bg-main': '#0a0a0c',
    '--bg-surface': '#141517',
    '--bg-surface-hover': '#222326',
    '--text-primary': '#ffffff',
    '--text-secondary': '#888b94',
    '--accent': '#ff3300',
    '--border': '#222328',
    '--dots-color': 'rgba(255, 255, 255, 0.07)',
  },
  rootLight: {
    '--bg-base': '#e6e4dc',
    '--bg-main': '#f3f2ee',
    '--bg-surface': '#ffffff',
    '--bg-surface-hover': '#eae8e1',
    '--text-primary': '#0a0a0c',
    '--text-secondary': '#666870',
    '--border': '#d0ceca',
    '--dots-color': 'rgba(10, 10, 12, 0.1)',
  },
};

const SettingsPage = ({ theme, setTheme }) => {
  const navigate = useNavigate();
  const isLight = theme === 'light';

  const [audioQuality, setAudioQuality] = useState('extreme');
  const [notifications, setNotifications] = useState({
    newReleases: true,
    playlistUpdates: true,
    directMessages: false,
  });

  const cssVars = isLight ? styles.rootLight : styles.root;

  const bg = (varName) => `var(${varName})`;

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      style={{
        ...cssVars,
        backgroundColor: 'var(--bg-base)',
        color: 'var(--text-primary)',
        height: '844px',
        width: '390px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      {/* Header */}
      <header
        style={{
          flexShrink: 0,
          paddingTop: '48px',
          paddingBottom: '16px',
          paddingLeft: '20px',
          paddingRight: '20px',
          backgroundColor: 'var(--bg-base)',
          borderBottom: '2px solid var(--border)',
          zIndex: 30,
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--bg-surface)',
              border: '2px solid var(--border)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'transform 0.1s',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <h1 style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
            Account Settings
          </h1>
          <div style={{ width: '40px', height: '40px' }}></div>
        </div>
      </header>

      {/* Main */}
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: 'var(--bg-main)',
          backgroundImage: `radial-gradient(var(--dots-color) 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px',
          scrollbarWidth: 'none',
        }}
      >
        {/* Profile Card */}
        <section style={{ padding: '20px' }}>
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '2px solid var(--border)',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative', zIndex: 10 }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#ff3300',
                  border: '2px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '30px',
                  fontWeight: 900,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  flexShrink: 0,
                }}
              >
                JD
              </div>
              <div>
                <h2
                  style={{
                    fontSize: '24px',
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                  }}
                >
                  John Doe
                </h2>
                <p
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: 'var(--text-secondary)',
                    marginTop: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}
                >
                  j.doe@steqmusic.com
                </p>
                <div
                  style={{
                    marginTop: '12px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255,51,0,0.1)',
                    border: '1px solid rgba(255,51,0,0.3)',
                    padding: '4px 8px',
                  }}
                >
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#ff3300',
                      borderRadius: '50%',
                      animation: 'pulse 2s infinite',
                    }}
                  ></div>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 900,
                      color: '#ff3300',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.05em',
                    }}
                  >
                    Platinum Subscription
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                right: '-16px',
                bottom: '-16px',
                width: '96px',
                height: '96px',
                borderTop: '2px solid var(--border)',
                borderLeft: '2px solid var(--border)',
                opacity: 0.2,
              }}
            ></div>
          </div>
        </section>

        {/* Preferences */}
        <section style={{ padding: '0 20px', marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '10px',
              fontWeight: 900,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '12px',
              marginLeft: '4px',
            }}
          >
            Preferences
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Light Mode Toggle */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '2px solid var(--border)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-secondary)' }}>
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
                <span style={{ fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Light Mode
                </span>
              </div>
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '48px',
                  height: '24px',
                  cursor: 'pointer',
                }}
                onClick={() => setTheme(isLight ? 'dark' : 'light')}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: isLight ? '#ff3300' : 'var(--bg-base)',
                    border: '2px solid var(--border)',
                    transition: 'background-color 0.3s',
                  }}
                ></div>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: isLight ? '24px' : '0px',
                    width: '24px',
                    height: '24px',
                    backgroundColor: 'var(--bg-surface)',
                    border: '2px solid var(--border)',
                    transition: 'left 0.3s',
                    zIndex: 1,
                  }}
                ></div>
              </div>
            </div>

            {/* Audio Quality */}
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '2px solid var(--border)',
                padding: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-secondary)' }}>
                    <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                  <span style={{ fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Audio Quality
                  </span>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 900, color: '#ff3300', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  Hi-Fi Lossless
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {[
                  { label: 'Data Saver', value: 'datasaver' },
                  { label: 'Standard', value: 'standard' },
                  { label: 'Extreme', value: 'extreme' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAudioQuality(option.value)}
                    style={{
                      padding: '8px 0',
                      border: audioQuality === option.value ? '2px solid #ff3300' : '2px solid var(--border)',
                      backgroundColor: audioQuality === option.value ? 'rgba(255,51,0,0.05)' : 'transparent',
                      color: audioQuality === option.value ? '#ff3300' : 'var(--text-primary)',
                      fontSize: '9px',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '-0.05em',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section style={{ padding: '0 20px', marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '10px',
              fontWeight: 900,
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '12px',
              marginLeft: '4px',
            }}
          >
            Notifications
          </h3>
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '2px solid var(--border)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {[
              { key: 'newReleases', label: 'New Releases' },
              { key: 'playlistUpdates', label: 'Playlist Updates' },
              { key: 'directMessages', label: 'Direct Messages' },
            ].map((item, index) => (
              <div
                key={item.key}
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: index > 0 ? '2px solid var(--border)' : 'none',
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {item.label}
                </span>
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => toggleNotification(item.key)}
                  style={{
                    width: '20px',
                    height: '20px',
                    accentColor: '#ff3300',
                    cursor: 'pointer',
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Logout */}
        <section style={{ padding: '0 20px 40px' }}>
          <button
            style={{
              width: '100%',
              backgroundColor: 'var(--bg-base)',
              border: '2px solid var(--border)',
              color: 'var(--text-secondary)',
              fontWeight: 900,
              padding: '16px 24px',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'background-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ff3300';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-base)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            LOGOUT OF ALL DEVICES
          </button>
          <p
            style={{
              textAlign: 'center',
              fontSize: '9px',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              marginTop: '24px',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              opacity: 0.4,
            }}
          >
            SteqMusic v2.4.0 Build 1092
          </p>
        </section>
      </main>

      {/* Footer Nav */}
      <footer
        style={{
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          zIndex: 50,
          backgroundColor: 'var(--bg-base)',
          borderTop: '2px solid var(--border)',
        }}
      >
        <nav
          style={{
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingBottom: '8px',
            position: 'relative',
          }}
        >
          {[
            {
              label: 'Home',
              active: false,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
              ),
            },
            {
              label: 'Explore',
              active: false,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              ),
            },
            {
              label: 'Library',
              active: false,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              ),
            },
            {
              label: 'Settings',
              active: true,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              ),
            },
          ].map((item) => (
            <button
              key={item.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                color: item.active ? '#ff3300' : 'var(--text-secondary)',
                gap: '4px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {item.icon}
              <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </footer>
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      ::-webkit-scrollbar { display: none; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#000',
        }}
      >
        <Routes>
          <Route path="/" element={<SettingsPage theme={theme} setTheme={setTheme} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;