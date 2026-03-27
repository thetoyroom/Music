import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerStore } from '../store/playerStore.js';
import { useAppStore } from '../store/appStore.js';
import { ArtworkCard, ArtworkCardSkeleton } from '../components/content/ArtworkCard.jsx';
import { TrackRow } from '../components/content/TrackRow.jsx';
import { PlayIcon } from '../components/Icons.jsx';
import styles from './HomePage.module.css';

const GENRES = [
  { label: 'Electronic', bg: '#1abc9c' },
  { label: 'Hip Hop', bg: '#e74c3c' },
  { label: 'Pop', bg: '#3498db' },
  { label: 'R&B', bg: '#9b59b6' },
  { label: 'Indie', bg: '#f1c40f', dark: true },
  { label: 'Jazz', bg: '#34495e' },
  { label: 'Classical', bg: '#2c3e50' },
  { label: 'Metal', bg: '#c0392b' },
];

const GRADIENTS = [
  'linear-gradient(135deg, #2c3e50, #000000)',
  'linear-gradient(135deg, #8e44ad, #2c3e50)',
  'linear-gradient(135deg, #d35400, #c0392b)',
  'linear-gradient(135deg, #16a085, #2980b9)',
  'linear-gradient(135deg, #7f8c8d, #2c3e50)',
  'linear-gradient(135deg, #c0392b, #8e44ad)',
];

import { recommendationService } from '../services/recommendationService.js';

export default function HomePage() {
  const navigate = useNavigate();
  const recentlyPlayed = useAppStore((s) => s.recentlyPlayed);
  const hasCompletedOnboarding = useAppStore((s) => s.hasCompletedOnboarding);
  
  const [recommended, setRecommended] = useState([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  useEffect(() => {
    if (hasCompletedOnboarding) {
      setIsLoadingRecs(true);
      recommendationService.getPersonalizedFeed().then(tracks => {
        setRecommended(tracks);
        setIsLoadingRecs(false);
      });
    }
  }, [hasCompletedOnboarding]);

  return (
    <div className={styles.page}>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>
            <span className={styles.heroTagDot}>▶</span>
            <span>Trending Global</span>
          </div>
          <h1 className={styles.heroTitle}>
            Hi-Res<br />Audio.<br />Streaming.
          </h1>
          <div className={styles.heroBorder}>
            <p>Premium lossless audio streaming — up to 9216 kbps FLAC. Search anything, play instantly.</p>
          </div>
          <div className={styles.heroActions}>
            <button
              className={styles.heroBtn}
              onClick={() => navigate('/search')}
            >
              <PlayIcon size={16} /> START LISTENING
            </button>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroBox} />
        </div>
      </section>

      {/* Jump Back In */}
      {recentlyPlayed.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Jump Back In</h2>
            <button className={styles.seeAll} onClick={() => navigate('/library/recent')}>See All</button>
          </div>
          <div className={`${styles.horizontalScroll} scrollbar-hide`}>
            {recentlyPlayed.slice(0, 8).map((track) => (
              <div key={track.id} className={styles.recentCard}>
                <ArtworkCard
                  type="album"
                  id={track.albumId}
                  title={track.title}
                  subtitle={track.artist}
                  coverUrl={track.coverUrl}
                  tracks={[track]}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Suggested For You */}
      {hasCompletedOnboarding && (recommended.length > 0 || isLoadingRecs) && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Suggested For You</h2>
          </div>
          <div className={styles.recommendationList}>
            {isLoadingRecs ? (
              [...Array(5)].map((_, i) => <div key={i} className={styles.skeletonRow} />)
            ) : (
              recommended.slice(0, 10).map((track) => (
                <TrackRow key={track.id} track={track} />
              ))
            )}
          </div>
        </section>
      )}

      {/* Explore Genres */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore Genres</h2>
        </div>
        <div className={styles.genreGrid}>
          {GENRES.map((g) => (
            <button
              key={g.label}
              className={styles.genreCard}
              style={{ background: g.bg, color: g.dark ? '#000' : '#fff' }}
              onClick={() => navigate(`/search?q=${encodeURIComponent(g.label)}`)}
            >
              {g.label}
            </button>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className={styles.section}>
        <div className={styles.howто}>
          <div className={styles.howtоCard}>
            <div className={styles.howtоIcon}>🔍</div>
            <h3>Search</h3>
            <p>Find any track, album, or artist from Tidal's 100M+ catalog.</p>
          </div>
          <div className={styles.howtоCard}>
            <div className={styles.howtоIcon}>⚡</div>
            <h3>Instant Play</h3>
            <p>Streams via multiple mirror servers — always online, no buffering.</p>
          </div>
          <div className={styles.howtоCard}>
            <div className={styles.howtоIcon}>🎵</div>
            <h3>Hi-Res FLAC</h3>
            <p>Up to 9216 kbps lossless or even Hi-Res audio via DASH manifests.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
