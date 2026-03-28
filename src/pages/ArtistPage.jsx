import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtist, getArtistTopTracks, getArtistAlbums, normalizeTrack, normalizeAlbum, normalizeArtist } from '../api/monochrome.js';
import { usePlayerStore } from '../store/playerStore.js';
import { useAppStore } from '../store/appStore.js';
import { TrackRow } from '../components/content/TrackRow.jsx';
import { ArtworkCard } from '../components/content/ArtworkCard.jsx';
import { PlayIcon, ChevronLeftIcon } from '../components/Icons.jsx';
import styles from './ArtistPage.module.css';

export default function ArtistPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setQueue } = usePlayerStore();
  const addRecentlyPlayed = useAppStore((s) => s.addRecentlyPlayed);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    
    // Fetch artist info first to show header ASAP
    getArtist(id)
      .then(data => {
        setArtist(normalizeArtist(data));
        setLoading(false); // Header hidden behind this, but we want to show it now
        
        // Then fetch deeper data
        return Promise.all([getArtistTopTracks(id), getArtistAlbums(id)]);
      })
      .then(([tracksData, albumsData]) => {
        const rawTracks = tracksData?.items ?? tracksData ?? [];
        setTracks(Array.isArray(rawTracks) ? rawTracks.map(normalizeTrack).filter(Boolean) : []);
        
        const rawAlbums = albumsData?.items ?? albumsData ?? [];
        setAlbums(Array.isArray(rawAlbums) ? rawAlbums.map(normalizeAlbum).filter(Boolean) : []);
      })
      .catch((e) => {
        if (!artist) setError(e.message);
        console.error('Artist Page load error:', e);
      })
      .finally(() => setLoading(false));
  }, [id, artist?.id]);

  if (loading) return <div className={styles.load}><div className={styles.spinner} /></div>;
  if (error) return <div className={styles.err}>⚠ {error}</div>;
  if (!artist) return null;

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => {
        // If we came from Now Playing, go back to where we WERE before Now Playing if possible
        // For now, -1 is fine, but maybe specifically handle /now-playing
        navigate(-1);
      }}>
        <ChevronLeftIcon size={14} /> BACK
      </button>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.picWrap}>
          {artist.pictureUrl ? (
            <img src={artist.pictureUrl} alt={artist.name} className={styles.pic} />
          ) : (
            <div className={styles.picFallback} />
          )}
        </div>
        <div className={styles.meta}>
          <span className={styles.metaType}>ARTIST</span>
          <h1 className={styles.name}>{artist.name}</h1>
          {artist.biography ? (
            <p className={styles.bio}>{artist.biography.slice(0, 200)}{artist.biography.length > 200 ? '…' : ''}</p>
          ) : (
            <p className={styles.bio}>No biography available for this artist.</p>
          )}
          {tracks && tracks.length > 0 && (
            <button
              className={styles.playBtn}
              onClick={() => { setQueue(tracks, 0); addRecentlyPlayed(tracks[0]); }}
            >
              <PlayIcon size={16} /> PLAY TOP TRACKS
            </button>
          )}
        </div>
      </div>

      {/* Top Tracks */}
      {tracks && tracks.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Top Tracks</h2>
          <div className={styles.trackList}>
            {tracks.slice(0, 10).map((track, i) => (
              <TrackRow key={track.id} track={track} tracks={tracks} index={i} showArtwork />
            ))}
          </div>
        </section>
      )}

      {/* Albums */}
      {albums.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Discography</h2>
          <div className={styles.albumGrid}>
            {albums.map((album) => (
              <ArtworkCard
                key={album.id}
                type="album"
                id={album.id}
                title={album.title}
                subtitle={album.releaseDate}
                coverUrl={album.coverUrl}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
