import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Providers & Engine
import { ThemeProvider } from './components/providers/ThemeProvider.jsx';
import { instanceManager } from './api/instanceManager.js';
import { audioEngine } from './engine/AudioEngine.js';

// Layout Components
import { Header } from './components/layout/Header.jsx';
import { Sidebar } from './components/layout/Sidebar.jsx';
import { BottomNav } from './components/layout/BottomNav.jsx';
import { PlayerFooter } from './components/player/PlayerFooter.jsx';
import { MiniPlayer } from './components/player/MiniPlayer.jsx';

// Pages
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import AlbumPage from './pages/AlbumPage.jsx';
import ArtistPage from './pages/ArtistPage.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import NowPlayingScreen from './components/player/NowPlayingScreen.jsx';
import StarterPage from './pages/StarterPage.jsx';

import { useAppStore } from './store/appStore.js';

import { DownloadBar } from './components/layout/DownloadBar.jsx';

/**
 * AppShell handles the responsive layout breakpoints.
 * Desktop: Sidebar + Header + Main + PlayerFooter
 * Mobile: Header + Main + MiniPlayer + BottomNav
 */
function AppShell() {
  const [init, setInit] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const hasCompletedOnboarding = useAppStore(s => s.hasCompletedOnboarding);
  
  const isNowPlayingRoute = location.pathname === '/now-playing';
  const isStarterRoute = location.pathname === '/starter';

  // Screen width observer for responsive rendering
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function boot() {
      await instanceManager.initialize();
      await audioEngine.init();
      setInit(true);
    }
    boot();
    return () => audioEngine.destroy();
  }, []);

  useEffect(() => {
    if (init && !hasCompletedOnboarding && !isStarterRoute) {
      navigate('/starter');
    }
  }, [init, hasCompletedOnboarding, isStarterRoute, navigate]);

  if (!init) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
        <div className="spinner" style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (isStarterRoute) {
    return <StarterPage />;
  }

  // Mobile layout
  if (!isDesktop) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        <DownloadBar />
        {!isNowPlayingRoute && <Header />}
        
        <main style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }} className="scrollbar-hide">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/artist/:id" element={<ArtistPage />} />
            <Route path="/library/*" element={<LibraryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/now-playing" element={<NowPlayingScreen />} />
            <Route path="/starter" element={<StarterPage />} />
          </Routes>
        </main>
        
        {!isNowPlayingRoute && (
          <>
            <MiniPlayer />
            <BottomNav />
          </>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <DownloadBar />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>
          <Header />
          <main style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/album/:id" element={<AlbumPage />} />
              <Route path="/artist/:id" element={<ArtistPage />} />
              <Route path="/library/*" element={<LibraryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/now-playing" element={<NowPlayingScreen />} />
              <Route path="/starter" element={<StarterPage />} />
            </Routes>
          </main>
        </div>
      </div>
      <PlayerFooter />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeProvider>
  );
}
