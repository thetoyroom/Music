import { useEffect, useRef, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { usePlayerStore } from '../../store/playerStore.js';
import { useAppStore } from '../../store/appStore.js';
import { audioEngine } from '../../engine/AudioEngine.js';
import { getLyrics } from '../../api/monochrome.js';
import {
  ChevronLeftIcon, PlayIcon, PauseIcon, SkipNextIcon, SkipPrevIcon,
  ShuffleIcon, RepeatIcon, Repeat1Icon, HeartIcon, SpinnerIcon, DotsIcon,
  LyricsIcon
} from '../Icons.jsx';
import styles from './NowPlayingScreen.module.css';

function formatTime(s) {
  if (!s || !isFinite(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function NowPlayingScreen() {
  const navigate = useNavigate();
  const {
    currentTrack, isPlaying, isLoading, progress, duration,
    shuffle, repeat, lyrics,
    setIsPlaying, toggleShuffle, toggleRepeat, next, prev, setLyrics
  } = usePlayerStore();
  
  const isLiked = useAppStore((s) => s.isLiked(currentTrack?.id));
  const toggleLike = useAppStore((s) => s.toggleLike);
  const progressRef = useRef(null);
  const lyricsListRef = useRef(null);
  
  const [showLyricsMobile, setShowLyricsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  console.log('[NowPlaying] Render', { trackId: currentTrack?.id, isDesktop, showLyricsMobile });

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Fetch lyrics when track changes
  useEffect(() => {
    if (currentTrack) {
      setLyrics(null);
      getLyrics(currentTrack).then(setLyrics);
    }
  }, [currentTrack?.id, setLyrics]);

  // Scroll active lyric into view
  let activeLineIndex = -1;
  if (lyrics?.synced) {
    for (let i = lyrics.synced.length - 1; i >= 0; i--) {
      if (progress >= lyrics.synced[i].time) {
        activeLineIndex = i;
        break;
      }
    }
  }
  
  useEffect(() => {
    if (activeLineIndex !== -1 && lyricsListRef.current) {
      const activeEl = lyricsListRef.current.children[activeLineIndex];
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeLineIndex]);

  if (!currentTrack) {
    navigate(-1);
    return null;
  }

  const handleProgressClick = (e) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioEngine.seek(pct * duration);
  };

  const progressPct = duration > 0 ? (progress / duration) * 100 : 0;

  const renderLyrics = () => {
    if (!lyrics) {
      return (
        <div className={styles.lyricsPlaceholder}>
          {currentTrack ? 'FETCHING LYRICS...' : 'NO TRACK PLAYING'}
        </div>
      );
    }
    if (!lyrics.synced || lyrics.synced.length === 0) {
      return (
        <div className={styles.lyricsPlaceholder}>
          {lyrics.plain || 'NO SYNCED LYRICS AVAILABLE'}
        </div>
      );
    }

    return (
      <div className={styles.lyricsList} ref={lyricsListRef}>
        {lyrics.synced.map((line, i) => (
          <p
            key={i}
            className={`${styles.lyricLine} ${i === activeLineIndex ? styles.lyricActive : ''} ${i < activeLineIndex ? styles.lyricPast : ''}`}
            onClick={() => audioEngine.seek(line.time)}
          >
            {line.text}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.screen}>
      <div className={styles.background}>
        {currentTrack.coverUrl && (
          <img src={currentTrack.coverUrl} alt="" className={styles.bgImage} />
        )}
        <div className={styles.bgOverlay} />
      </div>

      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Go back">
          <ChevronLeftIcon size={24} />
        </button>
        {!isDesktop && (
          <NavLink to="/" className={styles.logo}>
            STEQ<span>MUSIC</span>
            <span className={styles.logoAccent}>■</span>
          </NavLink>
        )}
        <span className={styles.headerTitle}>{isDesktop ? 'NOW PLAYING' : ''}</span>
        <div className={styles.headerActions}>
          {!isDesktop && (
            <button 
              className={`${styles.lyricsToggle} ${showLyricsMobile ? styles.lyricsToggleActive : ''}`}
              onClick={() => setShowLyricsMobile(!showLyricsMobile)}
            >
              <LyricsIcon size={20} />
            </button>
          )}
          <button className={styles.menuBtn} aria-label="Options"><DotsIcon size={20} /></button>
        </div>
      </header>

      <main className={`${styles.main} ${isDesktop ? styles.desktopMain : ''}`}>
        {/* Left Side: Art + Primary Info (Mobile hides this if lyrics open) */}
        <section className={`${styles.primarySection} ${showLyricsMobile ? styles.hideMobile : ''}`}>
          <div className={styles.artWrap}>
            {currentTrack.coverUrl ? (
              <img src={currentTrack.coverUrl} alt={currentTrack.title} className={styles.art} />
            ) : (
              <div className={styles.artFallback} />
            )}
          </div>

          <div className={styles.info}>
            <div className={styles.metaRow}>
              <div className={styles.titles}>
                <h1 className={`${styles.title} truncate`}>{currentTrack.title}</h1>
                <button 
                  className={`${styles.artist} truncate`}
                  onClick={() => currentTrack.artistId && navigate(`/artist/${currentTrack.artistId}`)}
                >
                  {currentTrack.artist}
                </button>
              </div>
              <button
                className={`${styles.likeBtn} ${isLiked ? styles.liked : ''}`}
                onClick={() => toggleLike(currentTrack)}
                aria-label="Like"
              >
                <HeartIcon size={28} filled={isLiked} />
              </button>
            </div>
            {currentTrack.quality && (
              <span className={`quality-badge ${styles.badge} ${currentTrack.quality.includes('HI_RES') ? 'hifi' : 'lossless'}`}>
                {currentTrack.quality.replace('_', ' ')}
              </span>
            )}
          </div>

          <div className={styles.scrubberWrap}>
            <div className={styles.waveformWrap} ref={progressRef} onClick={handleProgressClick}>
              {Array.from({ length: 60 }).map((_, i) => {
                const active = i <= (progressPct / 100) * 60;
                const h = Math.abs(Math.sin(i * 0.5) * 60) + 20;
                return (
                  <div 
                    key={i} 
                    className={`${styles.waveBar} ${active ? styles.waveActive : ''}`} 
                    style={{ height: `${h}%` }} 
                  />
                );
              })}
            </div>
            <div className={styles.timeRow}>
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className={styles.controls}>
            <button
              className={`${styles.ctrlBtn} ${shuffle ? styles.activeCtrl : ''}`}
              onClick={toggleShuffle}
            >
              <ShuffleIcon size={22} />
            </button>
            <button className={styles.ctrlBtn} onClick={prev}>
              <SkipPrevIcon size={36} />
            </button>
            <button className={styles.playBtnBrutalist} onClick={() => setIsPlaying(!isPlaying)}>
              {isLoading ? <SpinnerIcon size={32} /> : isPlaying ? <PauseIcon size={32} /> : <PlayIcon size={32} />}
            </button>
            <button className={styles.ctrlBtn} onClick={next}>
              <SkipNextIcon size={36} />
            </button>
            <button
              className={`${styles.ctrlBtn} ${repeat !== 'none' ? styles.activeCtrl : ''}`}
              onClick={toggleRepeat}
            >
              {repeat === 'one' ? <Repeat1Icon size={22} /> : <RepeatIcon size={22} />}
            </button>
          </div>
        </section>

        {/* Right Side: Lyrics (Desktop always shows, Mobile toggles) */}
        <section className={`${styles.lyricsSection} ${!showLyricsMobile && !isDesktop ? styles.hideMobile : ''}`}>
          {renderLyrics()}
          
          {showLyricsMobile && (
            <button 
              className={styles.lyricsCloseMobile}
              onClick={() => setShowLyricsMobile(false)}
            >
              CLOSE LYRICS
            </button>
          )}
        </section>
      </main>
    </div>
  );
}

