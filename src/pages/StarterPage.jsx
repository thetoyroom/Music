import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { searchArtists, getArtistPictureUrl } from '../api/monochrome';
import { 
  CheckIcon as Check, 
  SearchIcon as Search, 
  SkipNextIcon as SkipForward,
  GoogleIcon as Google,
  MailIcon as Mail
} from '../components/Icons';

const Icons = { Check, Search, SkipForward, Google, Mail };
import styles from './StarterPage.module.css';
import { 
  loginWithGoogle, 
  loginWithEmail, 
  signupWithEmail, 
  onAuthChange 
} from '../services/authService';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const GENRES = [
  'Techno / IDM', 'Hyperpop', 'Lo-Fi Jazz', 'Post-Punk', 'Ambient', 'UK Garage',
  'Bollywood', 'Haryanvi', 'Punjabi', 'Afro House', 'Hip-Hop', 'Electronic'
];

const FEATURED_ARTISTS = [
  { name: 'Aphex Twin', id: '2p0v5X8' },
  { name: 'Burial', id: '2p0v5X9' },
  { name: 'KAYTRANADA', id: '2p0v5X10' },
  { name: 'Bicep', id: '2p0v5X11' },
  { name: 'Four Tet', id: '2p0v5X12' },
  { name: 'A.R. Rahman', id: '2p0v5X13' },
  { name: 'Sidhu Moose Wala', id: '2p0v5X14' },
].map(a => ({ ...a, img: `https://api.dicebear.com/7.x/initials/svg?seed=${a.name}` }));

export default function StarterPage() {
  const navigate = useNavigate();
  const completeOnboarding = useAppStore(s => s.completeOnboarding);
  
  const [step, setStep] = useState(0); // 0: Auth, 1: Genres, 2: Artists, 3: Success
  const [user, setUser] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    return onAuthChange(async (u) => {
      setUser(u);
      if (u) {
        console.log('[Starter] Auth detected:', u.uid);
        // Add a timeout to Firestore check so it doesn't hang forever
        const checkDoc = async () => {
          const docRef = doc(db, 'users', u.uid);
          const snap = await getDoc(docRef);
          if (snap.exists() && snap.data().onboardingCompleted) {
            completeOnboarding(snap.data().onboardingData || { genres: [], artists: [] });
            navigate('/');
            return true;
          }
          return false;
        };

        try {
          // Race the Firestore check against a 2.5s timeout
          const completed = await Promise.race([
            checkDoc(),
            new Promise(res => setTimeout(() => res(false), 2500))
          ]);
          if (!completed) setStep(1); // Proceed to onboarding
        } catch (e) {
          console.error('[Starter] Sync check error:', e);
          setStep(1);
        }
      }
    });
  }, [completeOnboarding, navigate]);

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleArtist = (artist) => {
    setSelectedArtists(prev => 
      prev.some(a => a.name === artist.name) 
        ? prev.filter(a => a.name !== artist.name) 
        : [...prev, artist]
    );
  };

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const timer = setTimeout(async () => {
        setIsSearching(true);
        try {
          const res = await searchArtists(searchQuery);
          let rawItems = [];
          if (Array.isArray(res)) rawItems = res;
          else if (res?.data?.artists?.items) rawItems = res.data.artists.items;
          else if (res?.data?.items) rawItems = res.data.items;
          else if (res?.artists?.items) rawItems = res.artists.items;
          else if (res?.items) rawItems = res.items;
          else if (res?.data) rawItems = Array.isArray(res.data) ? res.data : [];

          const normalized = rawItems.map(item => {
            const artist = item.item || item;
            return {
              id: artist.id || artist.tidalId || Math.random().toString(),
              name: artist.name || artist.artistName || 'Unknown Artist',
              picture: artist.picture || artist.artistPicture || artist.pictureId,
            };
          });
          setSearchResults(normalized);
        } catch (e) {
          console.error('[Starter] Search Error:', e);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleNext = () => {
    if (step === 1 && selectedGenres.length >= 3) {
      setStep(2);
    } else if (step === 2 && selectedArtists.length >= 5) {
      setStep(3);
      setTimeout(() => {
        completeOnboarding({ genres: selectedGenres, artists: selectedArtists });
        navigate('/');
      }, 3000);
    }
  };

  if (step === 3) {
    return (
      <div className={styles.successView}>
        <div className={styles.successIcon}>
          <Icons.Check size={80} />
        </div>
        <h1 className={styles.successTitle}>Stream<br />Initialized</h1>
        <p className={styles.successStatus}>Establishing connection to mainframe...</p>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Left Panel */}
      <div className={styles.leftPanel}>
        <div className={styles.logo}>
          STEQMUSIC<div className={styles.logoSquare} />
        </div>
        <div className={styles.welcome}>
          <h1 className={styles.title}>Welcome,<br />Listener.</h1>
          <div className={styles.description}>
            <div className={styles.accentBar} />
            <p>SYSTEM CALIBRATION REQUIRED.<br /><br />DEFINE YOUR SONIC PARAMETERS TO INITIALIZE THE STREAM.</p>
          </div>
        </div>
        <div className={styles.status}>
          <div className={styles.statusLabel}>SYSTEM STATUS</div>
          <div className={styles.statusBars}>
            <div className={`${styles.statusBar} ${step >= 1 ? styles.active : ''}`} />
            <div className={`${styles.statusBar} ${step >= 2 ? styles.active : ''}`} />
            <div className={`${styles.statusBar} ${step >= 3 ? styles.active : ''}`} />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className={styles.rightPanel}>
        <div className={styles.content}>
          <header className={styles.header}>
             <button className={styles.skipBtn} onClick={() => { completeOnboarding({genres:[], artists:[]}); navigate('/'); }}>SKIP</button>
          </header>

          {step === 0 ? (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2><span>00.</span> IDENTIFICATION</h2>
                <span className={styles.hint}>Secure your stream preferences</span>
              </div>
              <div className={styles.authContainer}>
                <button 
                  className={styles.googleBtn} 
                  onClick={async () => {
                    setIsLoading(true);
                    setAuthError('');
                    console.log('[Starter] Initiating Google Login...');
                    try { 
                      const u = await loginWithGoogle(); 
                      console.log('[Starter] Google Login Success:', u.uid);
                      setUser(u);
                      setStep(1); 
                    } catch (e) { 
                      console.error('[Starter] Google Login Error:', e);
                      setAuthError(e.message); 
                    }
                    setIsLoading(false);
                  }}
                  disabled={isLoading}
                >
                  <Icons.Google size={20} />
                  CONTINUE WITH GOOGLE
                </button>

                <div className={styles.divider}>
                  <span>OR USE SONIC ID</span>
                </div>

                <div className={styles.form}>
                  <div className={styles.inputGroup}>
                    <input 
                      type="email" 
                      placeholder="EMAIL" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <input 
                      type="password" 
                      placeholder="PASSWORD" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                    />
                  </div>
                  {authError && <div className={styles.error}>{authError}</div>}
                  <button 
                    className={styles.submitBtn}
                    onClick={async () => {
                      setIsLoading(true);
                      setAuthError('');
                      try {
                        if (isLoginMode) await loginWithEmail(email, password);
                        else await signupWithEmail(email, password);
                      } catch (e) {
                        setAuthError(e.message);
                      }
                      setIsLoading(false);
                    }}
                    disabled={isLoading || !email || !password}
                  >
                    {isLoading ? 'ESTABLISHING...' : (isLoginMode ? 'LOGIN' : 'CREATE ACCOUNT')}
                  </button>
                  <button 
                    className={styles.toggleBtn}
                    onClick={() => setIsLoginMode(!isLoginMode)}
                  >
                    {isLoginMode ? "DON'T HAVE AN ACCOUNT? SIGN UP" : "ALREADY HAVE AN ACCOUNT? LOGIN"}
                  </button>
                </div>
              </div>
            </section>
          ) : step === 1 ? (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2><span>01.</span> CHOOSE GENRES</h2>
                <span className={styles.hint}>Select minimum 3</span>
              </div>
              <div className={styles.grid}>
                {GENRES.map(genre => (
                  <button 
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`${styles.card} ${selectedGenres.includes(genre) ? styles.selected : ''}`}
                  >
                    {genre}
                    {selectedGenres.includes(genre) && <div className={styles.check}><Icons.Check size={16} /></div>}
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2><span>02.</span> PICK ARTISTS</h2>
                <div className={styles.search}>
                  <Icons.Search size={16} />
                  <input 
                    type="text" 
                    placeholder="SEARCH DATABASE..." 
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.artistGrid}>
                {(searchQuery.length > 2 ? searchResults : FEATURED_ARTISTS).slice(0, 12).map(artist => {
                  const isSelected = selectedArtists.some(a => a.name === artist.name);
                  return (
                    <div 
                      key={artist.id} 
                      className={`${styles.artistCard} ${isSelected ? styles.artistSelected : ''}`}
                      onClick={() => toggleArtist({ name: artist.name, id: artist.id })}
                    >
                      <div className={styles.artistImgWrap}>
                        <img src={artist.img || getArtistPictureUrl(artist.picture, 160)} alt={artist.name} />
                        {isSelected && <div className={styles.artistCheck}><Icons.Check size={20} /></div>}
                      </div>
                      <span className={styles.artistName}>{artist.name}</span>
                    </div>
                  );
                })}
                {isSearching && (
                  <div className={styles.noResults}>Searching database...</div>
                )}
                {searchQuery.length > 2 && searchResults.length === 0 && !isSearching && (
                  <div className={styles.noResults}>No artists found. Try another name.</div>
                )}
              </div>
            </section>
          )}
        </div>

        <footer className={styles.footer}>
          <button 
            className={styles.cta}
            disabled={(step === 1 && selectedGenres.length < 3) || (step === 2 && selectedArtists.length < 5)}
            onClick={handleNext}
          >
            {step === 1 ? 'Next: Pick Artists' : 'Initialize Stream'}
            <Icons.SkipForward size={24} />
          </button>
        </footer>
      </div>
    </div>
  );
}
