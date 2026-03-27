import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore.js';
import { usePlayerStore } from '../store/playerStore.js';
import { search, normalizeTrack, normalizeAlbum, normalizeArtist } from '../api/monochrome.js';
import { TrackRow } from '../components/content/TrackRow.jsx';
import { ArtworkCard, ArtworkCardSkeleton } from '../components/content/ArtworkCard.jsx';
import styles from './SearchPage.module.css';

function useDebounce(value, ms = 350) {
  const [val, setVal] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setVal(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return val;
}

export default function SearchPage() {
  const navigate = useNavigate();

  // Pick query from URL param
  const q = new URLSearchParams(window.location.search).get('q') ?? '';
  const debouncedQ = useDebounce(q, 400);

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('tracks');
  const abortRef = useRef(null);

  useEffect(() => {
    if (!debouncedQ.trim()) {
      setResults(null);
      setLoading(false);
      setError(null);
      return;
    }
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    setError(null);

    search(debouncedQ, 30)
      .then((data) => {
        if (ctrl.signal.aborted) return;
        const tracks = normalizeTracks(data?.tracks?.items ?? data?.tracks ?? []);
        const albums = normalizeAlbums(data?.albums?.items ?? data?.albums ?? []);
        const artists = normalizeArtists(data?.artists?.items ?? data?.artists ?? []);
        setResults({ tracks, albums, artists });
      })
      .catch((e) => {
        if (!ctrl.signal.aborted) setError(e.message);
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false);
      });

    return () => ctrl.abort();
  }, [debouncedQ]);

  const tabs = ['tracks', 'albums', 'artists'];
  const empty = !q.trim();

  return (
    <div className={styles.page}>
      {empty && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>♪</div>
          <h2>Search Music</h2>
          <p>Find tracks, artists, albums and more</p>
        </div>
      )}

      {loading && (
        <div className={styles.loadWrap}>
          <div className={styles.spinner} />
          <span>Searching "{q}"…</span>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <span>⚠ {error}</span>
        </div>
      )}

      {results && !loading && (
        <>
          {/* Tabs */}
          <div className={styles.tabs}>
            {tabs.map((t) => (
              <button
                key={t}
                className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(t)}
              >
                {t.toUpperCase()}
                <span className={styles.count}>
                  {results[t]?.length ?? 0}
                </span>
              </button>
            ))}
          </div>

          {/* Tracks */}
          {activeTab === 'tracks' && (
            <div className={styles.list}>
              {results.tracks.length === 0 && <p className={styles.noResults}>No tracks found</p>}
              {results.tracks.map((track, i) => (
                <TrackRow key={track.id} track={track} tracks={results.tracks} index={i} showArtwork />
              ))}
            </div>
          )}

          {/* Albums */}
          {activeTab === 'albums' && (
            <div className={styles.grid}>
              {results.albums.length === 0 && <p className={styles.noResults}>No albums found</p>}
              {results.albums.map((album) => (
                <ArtworkCard
                  key={album.id}
                  type="album"
                  id={album.id}
                  title={album.title}
                  subtitle={album.artist}
                  coverUrl={album.coverUrl}
                />
              ))}
            </div>
          )}

          {/* Artists */}
          {activeTab === 'artists' && (
            <div className={styles.grid}>
              {results.artists.length === 0 && <p className={styles.noResults}>No artists found</p>}
              {results.artists.map((artist) => (
                <ArtworkCard
                  key={artist.id}
                  type="artist"
                  id={artist.id}
                  title={artist.name}
                  subtitle="Artist"
                  coverUrl={artist.pictureUrl}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* Local helpers to avoid circular import */
function normalizeTracks(items) {
  return (items ?? []).filter(Boolean).map(normalizeTrack).filter(Boolean);
}
function normalizeAlbums(items) {
  return (items ?? []).filter(Boolean).map(normalizeAlbum).filter(Boolean);
}
function normalizeArtists(items) {
  return (items ?? []).filter(Boolean).map(normalizeArtist).filter(Boolean);
}
