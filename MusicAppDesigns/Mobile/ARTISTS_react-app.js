import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const customStyles = {
  bgBase: { backgroundColor: '#050505' },
  bgMain: { backgroundColor: '#0a0a0c' },
  bgSurface: { backgroundColor: '#141517' },
  bgSurfaceHover: { backgroundColor: '#222326' },
  border: { borderColor: '#222328' },
  accent: { color: '#ff3300' },
  accentBg: { backgroundColor: '#ff3300' },
  gradJH: { background: 'linear-gradient(135deg, #1a1a1a, #000000)' },
  artistGradient: { background: 'linear-gradient(to bottom, transparent, #0a0a0c)' },
  dotsPattern: {
    backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.07) 1.5px, transparent 1.5px)',
    backgroundSize: '24px 24px',
    opacity: 0.3,
  },
};

const TrackItem = ({ number, title, album, duration, onClick }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      className="flex items-center gap-4 p-3 border-2 mb-2 transition-colors cursor-pointer"
      style={{
        backgroundColor: pressed ? '#222326' : '#141517',
        borderColor: '#222328',
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={onClick}
    >
      <span className="w-4 font-black text-xs" style={{ color: '#888b94' }}>{number}</span>
      <div className="w-10 h-10 border flex-shrink-0" style={{ ...customStyles.gradJH, borderColor: '#222328' }}></div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold truncate text-sm" style={{ color: '#ffffff' }}>{title}</h4>
        <p className="text-xs truncate mt-0.5 font-bold uppercase tracking-wide" style={{ color: '#888b94', fontSize: '10px' }}>{album}</p>
      </div>
      <span className="font-bold" style={{ color: '#888b94', fontSize: '10px' }}>{duration}</span>
    </div>
  );
};

const DiscographyItem = ({ title, year, type, opacity, isViewAll }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <div
      className="cursor-pointer"
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      style={{ opacity: pressed ? 0.7 : 1, transition: 'opacity 0.1s' }}
    >
      <div
        className="aspect-square border-2 mb-3 relative overflow-hidden"
        style={{ borderColor: '#222328', backgroundColor: '#141517' }}
      >
        {isViewAll ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-black uppercase tracking-widest" style={{ color: '#888b94', fontSize: '10px' }}>View All</span>
          </div>
        ) : (
          <>
            <div className="absolute inset-0" style={{ ...customStyles.gradJH, opacity: opacity }}></div>
            <div className="absolute inset-0 border-4" style={{ borderColor: 'rgba(0,0,0,0.2)' }}></div>
          </>
        )}
      </div>
      {!isViewAll && (
        <>
          <h3 className="font-bold text-sm truncate uppercase tracking-tight" style={{ color: '#ffffff' }}>{title}</h3>
          <p className="font-bold mt-1 uppercase tracking-wider" style={{ color: '#888b94', fontSize: '10px' }}>{year} • {type}</p>
        </>
      )}
    </div>
  );
};

const MiniPlayer = ({ isPlaying, onTogglePlay, isLiked, onToggleLike }) => {
  const progress = 25;
  return (
    <div className="h-16 flex items-center px-4 justify-between relative" style={{ backgroundColor: '#141517', borderTop: '2px solid #222328', boxShadow: '0 -8px 20px rgba(0,0,0,0.4)' }}>
      <div className="absolute top-0 left-0 w-full h-0.5" style={{ backgroundColor: '#222326' }}>
        <div className="h-full" style={{ backgroundColor: '#ff3300', width: `${progress}%` }}></div>
      </div>
      <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
        <div className="w-10 h-10 border-2 flex-shrink-0" style={{ ...customStyles.gradJH, borderColor: '#222328' }}></div>
        <div className="flex flex-col truncate">
          <span className="font-black text-xs truncate uppercase tracking-wide" style={{ color: '#ffffff' }}>Emerald Rush</span>
          <span className="font-bold truncate mt-0.5 uppercase tracking-wider" style={{ color: '#888b94', fontSize: '10px' }}>Jon Hopkins</span>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        <button
          onClick={onToggleLike}
          style={{ color: isLiked ? '#ff3300' : '#888b94', transition: 'color 0.15s' }}
          className="active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
        <button
          onClick={onTogglePlay}
          className="transition-transform active:scale-90"
          style={{ color: '#ffffff' }}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

const BottomNav = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'home', label: 'Home',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
      )
    },
    {
      id: 'explore', label: 'Explore',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      id: 'library', label: 'Library',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
      )
    },
    {
      id: 'settings', label: 'Settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      )
    }
  ];

  return (
    <nav className="h-[72px] flex items-center justify-around pb-2" style={{ backgroundColor: '#050505', borderTop: '2px solid #222328' }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className="flex flex-col items-center justify-center w-full h-full gap-1"
          style={{ color: activeTab === tab.id ? '#ff3300' : '#888b94', transition: 'color 0.15s' }}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.icon}
          <span className="font-black uppercase tracking-widest" style={{ fontSize: '9px' }}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

const ArtistPage = ({ onBack }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showAllTracks, setShowAllTracks] = useState(false);

  const allTracks = [
    { number: '01', title: 'Emerald Rush', album: 'Singularity', duration: '5:36' },
    { number: '02', title: 'Luminous Beings', album: 'Singularity', duration: '11:51' },
    { number: '03', title: 'Abandon Window', album: 'Immunity', duration: '4:57' },
    { number: '04', title: 'Open Eye Signal', album: 'Immunity', duration: '9:33' },
    { number: '05', title: 'Breathe This Air', album: 'Immunity', duration: '6:14' },
  ];

  const visibleTracks = showAllTracks ? allTracks : allTracks.slice(0, 3);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col font-sans" style={{ backgroundColor: '#050505', color: '#ffffff' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-12 pb-4 px-5 flex items-center justify-between pointer-events-none">
        <button
          className="w-10 h-10 backdrop-blur-md border-2 flex items-center justify-center pointer-events-auto transition-transform active:scale-95"
          style={{ backgroundColor: 'rgba(20,21,23,0.8)', borderColor: '#222328', color: '#ffffff' }}
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button
          className="w-10 h-10 backdrop-blur-md border-2 flex items-center justify-center pointer-events-auto transition-transform active:scale-95"
          style={{ backgroundColor: 'rgba(20,21,23,0.8)', borderColor: '#222328', color: '#ffffff' }}
          onClick={() => setShowMoreOptions(!showMoreOptions)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </header>

      {/* More Options Modal */}
      {showMoreOptions && (
        <div
          className="fixed inset-0 z-[100] flex items-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={() => setShowMoreOptions(false)}
        >
          <div
            className="w-full p-5 pb-8"
            style={{ backgroundColor: '#141517', borderTop: '2px solid #222328' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="font-black text-sm uppercase tracking-widest mb-4" style={{ color: '#888b94' }}>Jon Hopkins</h3>
            {['Share Artist', 'Add to Playlist', 'Report'].map(option => (
              <button
                key={option}
                className="w-full text-left py-3 font-bold text-sm uppercase tracking-wide border-b"
                style={{ color: '#ffffff', borderColor: '#222328' }}
                onClick={() => setShowMoreOptions(false)}
              >
                {option}
              </button>
            ))}
            <button
              className="w-full text-center pt-4 font-black text-sm uppercase tracking-widest"
              style={{ color: '#ff3300' }}
              onClick={() => setShowMoreOptions(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10" style={{ backgroundColor: '#0a0a0c', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Hero Section */}
        <section className="relative overflow-hidden" style={{ height: '440px', width: '100%' }}>
          <div className="absolute inset-0 z-10" style={customStyles.dotsPattern}></div>
          <div className="absolute inset-0" style={customStyles.gradJH}></div>
          <div className="absolute inset-0 z-20" style={customStyles.artistGradient}></div>
          <div className="absolute bottom-0 left-0 w-full p-6 z-30">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-2 py-0.5" style={{ backgroundColor: '#ff3300' }}>
                <span className="font-black uppercase tracking-widest text-white" style={{ fontSize: '10px' }}>Verified Artist</span>
              </div>
            </div>
            <h1 className="font-black leading-none tracking-tighter uppercase mb-4" style={{ fontSize: '60px', lineHeight: '0.85', color: '#ffffff' }}>
              Jon<br />Hopkins
            </h1>
            <div className="flex items-center gap-6">
              <div>
                <p className="font-black uppercase" style={{ fontSize: '10px', color: '#888b94', letterSpacing: '0.2em' }}>Monthly Listeners</p>
                <p className="text-lg font-bold" style={{ color: '#ffffff' }}>2,842,109</p>
              </div>
              <button
                className="font-black px-6 py-2 border-2 uppercase text-xs tracking-widest transition-colors"
                style={{
                  backgroundColor: isFollowing ? 'transparent' : '#ffffff',
                  color: isFollowing ? '#ffffff' : '#050505',
                  borderColor: '#ffffff',
                }}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          </div>
        </section>

        {/* Top Tracks Section */}
        <section className="px-5 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black tracking-tight uppercase" style={{ color: '#ffffff' }}>Top Tracks</h2>
            <button
              className="font-black uppercase border-b-2 pb-1 transition-colors"
              style={{ fontSize: '10px', color: '#888b94', borderColor: '#222328', letterSpacing: '0.1em' }}
              onClick={() => setShowAllTracks(!showAllTracks)}
            >
              {showAllTracks ? 'Show Less' : 'See All'}
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {visibleTracks.map(track => (
              <TrackItem
                key={track.number}
                number={track.number}
                title={track.title}
                album={track.album}
                duration={track.duration}
                onClick={() => setIsPlaying(true)}
              />
            ))}
          </div>
        </section>

        {/* Discography Section */}
        <section className="px-5 pb-32">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black tracking-tight uppercase" style={{ color: '#ffffff' }}>Discography</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <DiscographyItem title="Music for Psychedelic Therapy" year="2021" type="Album" opacity={0.8} />
            <DiscographyItem title="Singularity" year="2018" type="Album" opacity={0.6} />
            <DiscographyItem title="Immunity" year="2013" type="Album" opacity={0.4} />
            <DiscographyItem isViewAll={true} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 flex flex-col w-full">
        <MiniPlayer
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          isLiked={isLiked}
          onToggleLike={() => setIsLiked(!isLiked)}
        />
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </footer>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; }
      body { margin: 0; padding: 0; }
      ::-webkit-scrollbar { display: none; }
      * { -ms-overflow-style: none; scrollbar-width: none; }
      ::selection { background-color: #ff3300; color: #ffffff; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<ArtistPage onBack={() => {}} />} />
      </Routes>
    </Router>
  );
};

export default App;