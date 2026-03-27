import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const customStyles = {
  dotPatternLight: {
    backgroundImage: 'radial-gradient(circle, #D8D4CA 1px, transparent 1px)',
    backgroundSize: '24px 24px',
  },
  dotPatternDark: {
    backgroundImage: 'radial-gradient(circle, #2A2A2A 1px, transparent 1px)',
    backgroundSize: '24px 24px',
  },
};

const genres = [
  { id: 1, label: 'Techno / IDM' },
  { id: 2, label: 'Hyperpop' },
  { id: 3, label: 'Lo-Fi Jazz' },
  { id: 4, label: 'Post-Punk' },
];

const artists = [
  {
    id: 1,
    name: 'Aphex Twin',
    img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 2,
    name: 'Burial',
    img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    name: 'KAYTRANADA',
    img: 'https://images.unsplash.com/photo-1514525253361-bee87184919a?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
];

const MusicOnboardingPage = () => {
  const [selectedGenres, setSelectedGenres] = useState([1, 3]);
  const [selectedArtists, setSelectedArtists] = useState([1, 3]);
  const [searchQuery, setSearchQuery] = useState('');
  const [initialized, setInitialized] = useState(false);

  const toggleGenre = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const toggleArtist = (id) => {
    setSelectedArtists((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const filteredArtists = artists.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInitialize = () => {
    setInitialized(true);
  };

  return (
    <div className="bg-[#EBE8E3] dark:bg-[#0A0A0A] text-black dark:text-white font-sans h-[812px] w-[375px] overflow-hidden flex flex-col transition-colors duration-300 antialiased select-none rounded-[40px] border border-[#D8D4CA] dark:border-[#1F1F1F]">
      {initialized && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 rounded-[40px]">
          <div className="bg-[#121212] border border-[#1F1F1F] rounded-2xl p-8 mx-6 text-center">
            <div className="w-12 h-12 bg-[#FF3300] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-2 text-white">Stream Ready</h3>
            <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-6">Your preferences have been saved</p>
            <button
              onClick={() => setInitialized(false)}
              className="text-[10px] font-bold tracking-widest uppercase text-[#FF3300] hover:text-red-400 transition-colors"
            >
              Edit Preferences
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between px-6 h-[70px] shrink-0 bg-transparent z-10">
        <div className="flex items-center gap-1 font-black text-xl tracking-tighter uppercase">
          STEQMUSIC
          <div className="w-3.5 h-3.5 bg-[#FF3300]"></div>
        </div>
        <button className="text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-[#FF3300] transition-colors">
          Skip
        </button>
      </header>

      {/* Main */}
      <main
        className="flex-1 overflow-y-auto px-6 pb-10"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        {/* Welcome Section */}
        <section className="mb-10 pt-4">
          <h1 className="text-[48px] font-black tracking-tighter leading-[0.9] uppercase mb-4">
            Welcome,<br />
            Listener.
          </h1>
          <div className="flex gap-3">
            <div className="w-1 bg-[#FF3300] shrink-0"></div>
            <p className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 leading-relaxed uppercase tracking-wider">
              Help us calibrate your experience.<br />
              What's your sonic profile?
            </p>
          </div>
        </section>

        {/* Genre Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black tracking-widest uppercase text-[#FF3300]">01. Choose Genres</h2>
            <span className="text-[10px] font-bold text-gray-400">Select 3 or more</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => toggleGenre(genre.id)}
                className="h-14 bg-white dark:bg-[#111] flex items-center justify-center transition-all"
                style={{
                  border: selectedGenres.includes(genre.id)
                    ? '2px solid #FF3300'
                    : '1px solid #D8D4CA',
                }}
              >
                <span className="text-[11px] font-black uppercase tracking-widest">
                  {genre.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Artists Section */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black tracking-widest uppercase text-[#FF3300]">02. Pick Artists</h2>
            <div className="h-6 w-32 border border-[#D8D4CA] dark:border-[#1F1F1F] bg-white dark:bg-[#111] flex items-center px-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-[8px] font-bold px-1 uppercase text-black dark:text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div
            className="flex gap-4 overflow-x-auto pb-4"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {filteredArtists.map((artist) => {
              const isSelected = selectedArtists.includes(artist.id);
              return (
                <div
                  key={artist.id}
                  className="flex-shrink-0 w-24 flex flex-col items-center cursor-pointer"
                  style={{ opacity: isSelected ? 1 : 0.6 }}
                  onClick={() => toggleArtist(artist.id)}
                >
                  <div
                    className="w-20 h-20 rounded-full p-1 mb-2"
                    style={{
                      border: isSelected ? '2px solid #FF3300' : '2px solid transparent',
                    }}
                  >
                    <img
                      src={artist.img}
                      alt={artist.name}
                      className="w-full h-full rounded-full object-cover grayscale brightness-75"
                    />
                  </div>
                  <span className="text-[9px] font-bold uppercase text-center tracking-tight">
                    {artist.name}
                  </span>
                </div>
              );
            })}
            {filteredArtists.length === 0 && (
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold py-4">
                No artists found
              </p>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-6 pt-2 bg-[#EBE8E3] dark:bg-[#0A0A0A] border-t border-[#D8D4CA] dark:border-[#1F1F1F] shrink-0">
        <button
          onClick={handleInitialize}
          className="w-full bg-[#FF3300] text-white text-xs font-bold uppercase tracking-[0.2em] py-5 flex items-center justify-center gap-3 hover:bg-red-600 transition-colors shadow-lg active:scale-95"
        >
          Initialize Stream
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="mt-4 flex justify-center">
          <div className="flex gap-1.5">
            <div className="w-6 h-1 bg-[#FF3300]"></div>
            <div className="w-6 h-1 bg-gray-300 dark:bg-[#1F1F1F]"></div>
            <div className="w-6 h-1 bg-gray-300 dark:bg-[#1F1F1F]"></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    const style = document.createElement('style');
    style.textContent = `
      .no-scrollbar::-webkit-scrollbar { display: none; }
      body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0A0A0A; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Router basename="/">
      <div className="flex items-center justify-center min-h-screen bg-[#0A0A0A]">
        <Routes>
          <Route path="/" element={<MusicOnboardingPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;