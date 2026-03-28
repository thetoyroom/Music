import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAlbum, getAlbumTracks, normalizeTrack, normalizeAlbum } from '../api/monochrome.js';
import { usePlayerStore } from '../store/playerStore.js';
import { useAppStore } from '../store/appStore.js';
import { TrackRow } from '../components/content/TrackRow.jsx';
import { PlayIcon, ChevronLeftIcon } from '../components/Icons.jsx';
import styles from './AlbumPage.module.css';

export default function AlbumPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setQueue } = usePlayerStore();
  const addRecentlyPlayed = useAppStore((s) => s.addRecentlyPlayed);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    Promise.all([getAlbum(id), getAlbumTracks(id)])
      .then(([albumData, tracksData]) => {
        setAlbum(normalizeAlbum(albumData));
        const items = tracksData?.items ?? tracksData?.tracks?.items ?? tracksData ?? [];
        const normalized = Array.isArray(items) 
          ? items.map(normalizeTrack).filter(Boolean)
          : [];
        setTracks(normalized);
      })
      .catch((e) => {
        console.error('[AlbumPage] Error loading album:', e);
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handlePlayAll = () => {
    if (tracks.length === 0) return;
    setQueue(tracks, 0);
    addRecentlyPlayed(tracks[0]);
  };

  if (loading) return <div className={styles.loadPage}><div className={styles.spinner} /></div>;
  if (error) return <div className={styles.errorPage}><p>⚠ {error}</p><button onClick={() => navigate(-1)}>Go Back</button></div>;
  if (!album) return null;

  return (
    <div className={styles.page}>
      {/* Back */}
      <button className={styles.back} onClick={() => navigate(-1)}>
        <ChevronLeftIcon size={16} /> BACK
      </button>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.artWrap}>
          {album.coverUrl ? (
            <img src={album.coverUrl} alt={album.title} className={styles.art} />
          ) : (
            <div className={styles.artFallback} />
          )}
        </div>

        <div className={styles.meta}>
          <span className={styles.metaType}>{album.type ?? 'ALBUM'}</span>
          <h1 className={styles.title}>{album.title}</h1>
          <button
            className={styles.artistLink}
            onClick={() => album.artistId && navigate(`/artist/${album.artistId}`)}
          >
            {album.artist}
          </button>
          <div className={styles.metaRow}>
            {album.releaseDate && <span>{album.releaseDate}</span>}
            {album.numberOfTracks && (
              <span>{album.numberOfTracks} tracks</span>
            )}
            {album.audioQuality && (
              <span className={`quality-badge ${album.audioQuality.includes('HI_RES') ? 'hifi' : 'lossless'}`}>
                {album.audioQuality.replace('_', ' ')}
              </span>
            )}
          </div>
          <button className={styles.playAllBtn} onClick={handlePlayAll}>
            <PlayIcon size={16} /> PLAY ALL
          </button>
        </div>
      </div>

      {/* Track list */}
      <div className={styles.trackList}>
        {tracks.map((track, i) => (
          <TrackRow key={track.id} track={track} tracks={tracks} index={i} showArtwork={false} />
        ))}
      </div>
    </div>
  );
}
