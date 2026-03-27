import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
  root: {
    dark: {
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
    light: {
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
  }
};

const ToggleSwitch = ({ id, checked, onChange }) => {
  const thumbStyle = {
    content: '',
    position: 'absolute',
    top: '4px',
    left: checked ? '24px' : '4px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: 'white',
    transition: 'left 0.3s ease',
  };

  return (
    <div className="relative inline-block w-12 h-6" style={{ position: 'relative' }}>
      <div
        onClick={onChange}
        style={{
          width: '48px',
          height: '24px',
          borderRadius: '9999px',
          backgroundColor: checked ? 'var(--accent)' : 'var(--border)',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          position: 'relative',
        }}
      >
        <div style={thumbStyle}></div>
      </div>
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-[260px] bg-base border-r border-bordercolor flex flex-col z-30 transition-colors duration-300 flex-shrink-0" style={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border)' }}>
      <div className="h-24 flex items-center px-8 border-b" style={{ borderColor: 'rgba(34,35,40,0.5)' }}>
        <a href="#" className="font-black text-2xl tracking-tighter uppercase flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
          STEQMUSIC<span style={{ color: 'var(--accent)', fontSize: '1.875rem', lineHeight: 1, marginTop: '-4px' }}>■</span>
        </a>
      </div>

      <div className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-10" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
        <div>
          <div className="px-4 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--text-secondary)' }}>Menu</div>
          <nav className="space-y-1">
            {['HOME', 'EXPLORE', 'TRENDING'].map((item) => (
              <a key={item} href="#" className="flex items-center gap-4 px-4 py-3 rounded-md font-semibold transition-all" style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <div className="px-4 mb-3 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: 'var(--text-secondary)' }}>Library</div>
          <nav className="space-y-1">
            {['RECENT', 'PLAYLISTS', 'ARTISTS', 'IMPORT'].map((item) => (
              <a key={item} href="#" className="flex items-center gap-4 px-4 py-3 rounded-md font-semibold transition-all" style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.backgroundColor = 'var(--bg-surface)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t" style={{ borderColor: 'rgba(34,35,40,0.5)' }}>
        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-md font-bold transition-all" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>
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

const Header = ({ theme, toggleTheme, searchValue, setSearchValue }) => {
  return (
    <header className="h-24 absolute top-0 w-full z-20 flex items-center justify-between px-10 backdrop-blur-xl border-b transition-colors duration-300" style={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--border)' }}>
      <div className="relative w-full max-w-xl group">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" style={{ color: 'var(--text-secondary)' }}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          placeholder="SEARCH ARTISTS, SONGS, PODCASTS..."
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="w-full border rounded-none py-3.5 pl-12 pr-4 focus:outline-none font-semibold text-xs tracking-wider transition-all shadow-sm"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
        />
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full flex items-center justify-center border transition-all"
          style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
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
          )}
        </button>
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold uppercase tracking-wider transition-colors" style={{ color: 'var(--text-primary)' }}>USER_992</div>
            <div className="text-[10px] uppercase font-semibold" style={{ color: 'var(--text-secondary)' }}>Premium</div>
          </div>
          <div className="w-12 h-12 border-2 flex items-center justify-center text-white transition-all shadow-sm" style={{ backgroundColor: 'var(--accent)', borderColor: 'var(--border)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

const ProfileSection = () => {
  return (
    <section className="mt-8 mb-12 flex flex-col md:flex-row gap-8 items-start">
      <div className="w-48 h-48 border-4 flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <div className="flex-1 pt-4">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-5xl font-black tracking-tighter uppercase" style={{ color: 'var(--text-primary)' }}>USER_992</h1>
          <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-sm" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>Premium Member</span>
        </div>
        <p className="font-medium text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          Member since October 2021 • <span style={{ color: 'var(--text-primary)' }}>user_992@steqmusic.io</span>
        </p>
        <div className="flex gap-3">
          <button
            className="border-2 px-6 py-3 text-xs font-black uppercase tracking-widest transition-all"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            Edit Profile
          </button>
          <button
            className="border-2 px-6 py-3 text-xs font-black uppercase tracking-widest transition-all"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            Share Profile
          </button>
        </div>
      </div>
    </section>
  );
};

const SubscriptionPlan = () => {
  return (
    <div>
      <h2 className="text-2xl font-black tracking-tight uppercase mb-6" style={{ color: 'var(--text-primary)' }}>Subscription Plan</h2>
      <div className="border-2 p-8 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--accent)' }}>
        <div className="absolute top-0 right-0 text-white px-6 py-2 font-black text-[10px] uppercase tracking-[0.2em]" style={{ backgroundColor: 'var(--accent)', transform: 'translateX(30%) translateY(50%) rotate(45deg)' }}>Active</div>
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-3xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>STEQ PREMIUM SOLO</h3>
            <p className="font-bold text-sm tracking-wide" style={{ color: 'var(--text-secondary)' }}>Next billing: Dec 12, 2024 • $9.99/mo</p>
          </div>
          <div className="w-12 h-12 border-2 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,51,0,0.1)', borderColor: 'var(--accent)', color: 'var(--accent)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {['Hi-Fi Lossless Streaming', 'Ad-free experience', 'Offline downloads', 'Multi-device support'].map((feature) => (
            <div key={feature} className="flex items-center gap-3 text-xs font-bold uppercase" style={{ color: 'var(--text-primary)' }}>
              <div className="w-1.5 h-1.5" style={{ backgroundColor: 'var(--accent)' }}></div> {feature}
            </div>
          ))}
        </div>
        <button
          className="w-full py-4 border-2 font-black text-xs uppercase tracking-widest transition-all"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          Manage Subscription
        </button>
      </div>
    </div>
  );
};

const SettingsPreferences = ({ audioQuality, setAudioQuality, pushNotifications, setPushNotifications, explicitContent, setExplicitContent }) => {
  const settings = [
    {
      id: 'audioQuality',
      title: 'Audio Quality',
      desc: 'Stream in lossless FLAC format when on Wi-Fi.',
      checked: audioQuality,
      onChange: () => setAudioQuality(!audioQuality),
    },
    {
      id: 'pushNotifications',
      title: 'Push Notifications',
      desc: 'Get alerts for new releases from artists you follow.',
      checked: pushNotifications,
      onChange: () => setPushNotifications(!pushNotifications),
    },
    {
      id: 'explicitContent',
      title: 'Explicit Content',
      desc: 'Allow playback of songs with explicit labels.',
      checked: explicitContent,
      onChange: () => setExplicitContent(!explicitContent),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-black tracking-tight uppercase mb-6" style={{ color: 'var(--text-primary)' }}>Settings &amp; Preferences</h2>
      <div className="border divide-y" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}>
        {settings.map((setting, index) => (
          <div key={setting.id} className="p-6 flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
            <div>
              <h4 className="font-black uppercase tracking-wide mb-1" style={{ color: 'var(--text-primary)' }}>{setting.title}</h4>
              <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{setting.desc}</p>
            </div>
            <ToggleSwitch id={setting.id} checked={setting.checked} onChange={setting.onChange} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ListeningStats = () => {
  const dotsStyle = {
    backgroundImage: 'radial-gradient(var(--dots-color) 1.5px, transparent 1.5px)',
    backgroundSize: '24px 24px',
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-black tracking-tight uppercase mb-6" style={{ color: 'var(--text-primary)' }}>Listening Stats</h2>
      <div className="border p-8 shadow-sm flex flex-col gap-10" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', ...dotsStyle }}>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--accent)' }}>Hours this week</div>
          <div className="text-5xl font-black" style={{ color: 'var(--text-primary)' }}>34.8</div>
          <div className="w-full h-1 mt-4 relative" style={{ backgroundColor: 'var(--border)' }}>
            <div className="absolute left-0 top-0 h-full" style={{ backgroundColor: 'var(--accent)', width: '72%' }}></div>
          </div>
          <p className="text-[10px] font-bold uppercase mt-2" style={{ color: 'var(--text-secondary)' }}>12% more than last week</p>
        </div>

        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--text-secondary)' }}>Top Genre</div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border flex items-center justify-center text-white font-black text-xs" style={{ backgroundColor: '#1abc9c', borderColor: 'var(--border)' }}>E</div>
            <div>
              <div className="text-lg font-black uppercase" style={{ color: 'var(--text-primary)' }}>Electronic</div>
              <div className="text-xs font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>412 Tracks played</div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--text-secondary)' }}>Top Artist</div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 p-0.5" style={{ borderColor: 'var(--accent)' }}>
              <div className="w-full h-full" style={{ backgroundColor: '#2980b9' }}></div>
            </div>
            <div>
              <div className="text-lg font-black uppercase" style={{ color: 'var(--text-primary)' }}>Jon Hopkins</div>
              <div className="text-xs font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>Heavy rotation</div>
            </div>
          </div>
        </div>

        <button
          className="text-center w-full py-3 text-[10px] font-black uppercase tracking-widest transition-colors border-t pt-8 mt-4"
          style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          View Full Wrapped Report
        </button>
      </div>
    </div>
  );
};

const Footer = ({ isPlaying, setIsPlaying, progress, setProgress }) => {
  return (
    <footer
      className="h-[100px] border-t-2 w-full flex items-center justify-between px-8 z-50 transition-colors duration-300 flex-shrink-0"
      style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)', boxShadow: '0 -4px 20px rgba(0,0,0,0.2)' }}
    >
      <div className="flex items-center gap-6 w-1/3 min-w-[250px]">
        <div className="w-16 h-16 border-2 flex-shrink-0 shadow-sm" style={{ background: 'linear-gradient(to bottom right, #2c3e50, black)', borderColor: 'var(--border)' }}></div>
        <div className="flex flex-col truncate pr-4">
          <a
            href="#"
            className="font-black text-sm hover:text-accent transition-colors truncate uppercase tracking-wide"
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
          >Light Through The Veins</a>
          <a
            href="#"
            className="text-xs font-semibold transition-colors truncate mt-1"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >Jon Hopkins</a>
        </div>
        <div className="flex items-center gap-3 ml-2">
          <button
            className="transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          <button
            className="transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </button>
          <button
            className="transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 flex items-center justify-center text-white hover:scale-105 transition-transform shadow-sm border-2 border-transparent"
            style={{ backgroundColor: 'var(--accent)' }}
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
          <button
            className="transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
          <button
            className="transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
          </button>
        </div>
        <div className="w-full flex items-center gap-3">
          <span className="text-[10px] font-bold" style={{ color: 'var(--accent)' }}>3:14</span>
          <div
            className="h-2 flex-1 relative cursor-pointer group border overflow-hidden"
            style={{ backgroundColor: 'var(--bg-surface-hover)', borderColor: 'var(--border)' }}
            onClick={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              setProgress((x / rect.width) * 100);
            }}
          >
            <div className="absolute left-0 top-0 h-full transition-colors" style={{ backgroundColor: 'var(--accent)', width: `${progress}%` }}></div>
          </div>
          <span className="text-[10px] font-bold" style={{ color: 'var(--text-secondary)' }}>9:21</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-5 w-1/3 min-w-[200px]">
        <button
          className="transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
          </svg>
        </button>
        <div className="flex items-center gap-3 group w-32">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-secondary)' }}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
          <div className="h-2 flex-1 relative cursor-pointer border" style={{ backgroundColor: 'var(--bg-surface-hover)', borderColor: 'var(--border)' }}>
            <div className="absolute left-0 top-0 h-full" style={{ backgroundColor: 'var(--text-primary)', width: '66.66%' }}></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ProfilePage = ({ theme, toggleTheme }) => {
  const [searchValue, setSearchValue] = useState('');
  const [audioQuality, setAudioQuality] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [explicitContent, setExplicitContent] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(33);

  return (
    <div className="flex flex-1 overflow-hidden h-full relative">
      <Sidebar />
      <main className="flex-1 flex flex-col relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-main)' }}>
        <Header theme={theme} toggleTheme={toggleTheme} searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="flex-1 overflow-y-auto pb-40 pt-24 px-10 relative z-10" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <ProfileSection />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
            <div className="lg:col-span-2 space-y-8">
              <SubscriptionPlan />
              <SettingsPreferences
                audioQuality={audioQuality}
                setAudioQuality={setAudioQuality}
                pushNotifications={pushNotifications}
                setPushNotifications={setPushNotifications}
                explicitContent={explicitContent}
                setExplicitContent={setExplicitContent}
              />
            </div>
            <div className="space-y-8">
              <ListeningStats />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(33);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
  }, []);

  useEffect(() => {
    const vars = theme === 'light' ? customStyles.root.light : customStyles.root.dark;
    Object.entries(vars).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body { background-color: var(--bg-base); color: var(--text-primary); transition: background-color 0.3s ease, color 0.3s ease; }
      .scrollbar-hide::-webkit-scrollbar { display: none; }
      .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      * { box-sizing: border-box; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router basename="/">
      <div
        className="h-screen w-screen overflow-hidden flex flex-col font-sans antialiased"
        style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
      >
        <Routes>
          <Route path="/" element={
            <ProfilePage theme={theme} toggleTheme={toggleTheme} />
          } />
        </Routes>
        <Footer isPlaying={isPlaying} setIsPlaying={setIsPlaying} progress={progress} setProgress={setProgress} />
      </div>
    </Router>
  );
};

export default App;