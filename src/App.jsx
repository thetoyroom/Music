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
import PlaylistPage from './pages/PlaylistPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import NowPlayingScreen from './components/player/NowPlayingScreen.jsx';
import StarterPage from './pages/StarterPage.jsx';

import { useAppStore } from './store/appStore.js';
import { DownloadBar } from './components/layout/DownloadBar.jsx';
import { onAuthChange } from './services/authService.js';
import { startSync } from './services/syncService.js';
import { motion, AnimatePresence } from 'framer-motion';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: 5 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 1.02, y: -5 }}
    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    style={{ height: '100%' }}
  >
    {children}
  </motion.div>
);

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

  // Screen width & orientation observer for responsive rendering
  const checkIsDesktop = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscape = width > height;
    // Standard desktop breakpoint or landscape on mobile
    return width >= 768 || (isLandscape && width >= 480);
  };

  const [isDesktop, setIsDesktop] = useState(checkIsDesktop());

  useEffect(() => {
    const handleResize = () => setIsDesktop(checkIsDesktop());
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
    return onAuthChange((user) => {
      if (user) {
        startSync(user.uid);
      }
    });
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

  // Standardized Route Content (Unified to prevent Hook violations on viewport/layout shifts)
  const routeContent = (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
        <Route path="/search" element={<PageWrapper><SearchPage /></PageWrapper>} />
        <Route path="/album/:id" element={<PageWrapper><AlbumPage /></PageWrapper>} />
        <Route path="/artist/:id" element={<PageWrapper><ArtistPage /></PageWrapper>} />
        <Route path="/playlist/:id" element={<PageWrapper><PlaylistPage /></PageWrapper>} />
        <Route path="/library/*" element={<PageWrapper><LibraryPage /></PageWrapper>} />
        <Route path="/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
        <Route path="/now-playing" element={<NowPlayingScreen />} />
        <Route path="/starter" element={<StarterPage />} />
      </Routes>
    </AnimatePresence>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <DownloadBar />
      
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {isDesktop ? <Sidebar /> : null}
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {!isNowPlayingRoute && <Header />}
          
          <main style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
            {routeContent}
          </main>

          {!isDesktop && !isNowPlayingRoute && (
            <>
              <MiniPlayer />
              <BottomNav />
            </>
          )}
        </div>
      </div>
      
      {isDesktop && <PlayerFooter />}
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
