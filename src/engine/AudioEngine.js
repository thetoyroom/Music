/**
 * Audio Engine — wraps Shaka Player for DASH/HLS and HTML5 Audio fallback.
 * Subscribes to playerStore and drives playback based on state changes.
 */

import { usePlayerStore } from '../store/playerStore.js';
import { getStreamData, getCoverUrl } from '../api/monochrome.js';
import { instanceManager } from '../api/instanceManager.js';

class AudioEngine {
  constructor() {
    this._shaka = null;
    this._video = null;
    this._audio = null;
    this._useShaka = false;
    this._currentTrackId = null;
    this._progressTimer = null;
    this._unsubscribe = null;
    this._mediaSessionInstalled = false;
    this._initialized = false;
  }

  async init() {
    if (this._initialized) return;
    this._initialized = true;

    // Try to load Shaka Player
    try {
      const shaka = await import('shaka-player');
      shaka.polyfill.installAll();
      if (shaka.Player.isBrowserSupported()) {
        this._video = document.createElement('video');
        this._video.style.display = 'none';
        document.body.appendChild(this._video);
        this._shaka = new shaka.Player();
        await this._shaka.attach(this._video);
        this._shaka.configure({
          streaming: {
            bufferingGoal: 30,
            rebufferingGoal: 5,
            bufferBehind: 30,
            retryParameters: {
              maxAttempts: 3,
              baseDelay: 500,
              backoffFactor: 2,
              fuzzFactor: 0.5,
            },
          },
          manifest: {
            retryParameters: {
              maxAttempts: 3,
              baseDelay: 500,
            },
          },
        });
        this._video.addEventListener('timeupdate', this._onTimeUpdate.bind(this));
        this._video.addEventListener('ended', this._onEnded.bind(this));
        this._video.addEventListener('error', (e) => this._onError(e));
        this._shaka.addEventListener('error', (e) => this._onShakaError(e));
        this._useShaka = true;
        console.log('[AudioEngine] Shaka Player initialized');
      }
    } catch (e) {
      console.warn('[AudioEngine] Shaka not available, falling back to HTML5 Audio:', e);
    }

    if (!this._useShaka) {
      this._audio = new Audio();
      this._audio.preload = 'metadata';
      this._audio.addEventListener('timeupdate', this._onTimeUpdate.bind(this));
      this._audio.addEventListener('ended', this._onEnded.bind(this));
      this._audio.addEventListener('error', (e) => this._onError(e));
    }

    // Subscribe to store changes
    this._unsubscribe = usePlayerStore.subscribe(
      (s) => ({ currentTrack: s.currentTrack, quality: s.quality }),
      ({ currentTrack, quality }) => {
        if (currentTrack && currentTrack.id !== this._currentTrackId) {
          this._loadTrack(currentTrack, quality);
        }
      },
      { equalityFn: (a, b) => a.currentTrack?.id === b.currentTrack?.id && a.quality === b.quality }
    );

    // Volume/mute sync
    usePlayerStore.subscribe(
      (s) => ({ volume: s.volume, isMuted: s.isMuted }),
      ({ volume, isMuted }) => {
        this._setVolume(isMuted ? 0 : volume);
      }
    );

    // Play/pause sync
    usePlayerStore.subscribe(
      (s) => s.isPlaying,
      (isPlaying) => {
        if (!this._currentTrackId) return;
        if (isPlaying) {
          this._mediaElement()?.play().catch(() => {});
        } else {
          this._mediaElement()?.pause();
        }
      }
    );

    this._installMediaSession();
  }

  _mediaElement() {
    return this._useShaka ? this._video : this._audio;
  }

  async _loadTrack(track, quality) {
    const { setIsLoading, setDuration, setProgress, setStreamError, setIsPlaying } = usePlayerStore.getState();

    this._currentTrackId = track.id;
    setIsLoading(true);
    setProgress(0);

    try {
      const streamData = await getStreamData(track.id, quality);
      const { url, manifestUrl, manifest } = this._extractStreamInfo(streamData);

      if (!url && !manifestUrl) {
        throw new Error('No stream URL returned by instance');
      }

      const el = this._mediaElement();

      if (this._useShaka && (manifestUrl || (manifest && manifest.includes('MPD')))) {
        await this._shaka.load(manifestUrl ?? url);
      } else {
        el.src = url ?? manifestUrl;
        await el.load();
      }

      // Volume
      const st = usePlayerStore.getState();
      el.volume = st.isMuted ? 0 : st.volume;

      await el.play();
      const dur = el.duration;
      if (isFinite(dur)) setDuration(dur);
      setIsLoading(false);
      setIsPlaying(true);

      this._updateMediaSession(track);
    } catch (err) {
      console.error('[AudioEngine] Load failed:', err);
      setStreamError(err.message);
      setIsLoading(false);
      setIsPlaying(false);
    }
  }

  _extractStreamInfo(data) {
    if (!data) return {};
    // The various Monochrome instance response shapes
    const url = data.url ?? data.streamUrl ?? data.directUrl ?? data.urls?.[0];
    const manifestUrl = data.manifestUrl ?? data.manifestMimeType?.includes('mpd') ? data.manifest : null;
    const manifest = data.manifest;
    return { url, manifestUrl, manifest };
  }

  _onTimeUpdate() {
    const el = this._mediaElement();
    if (!el) return;
    const { setProgress, setDuration } = usePlayerStore.getState();
    setProgress(el.currentTime);
    if (isFinite(el.duration)) setDuration(el.duration);
    this._updatePositionState();
  }

  _onEnded() {
    const { repeat, next } = usePlayerStore.getState();
    if (repeat === 'one') {
      const el = this._mediaElement();
      el.currentTime = 0;
      el.play().catch(() => {});
    } else {
      next();
    }
  }

  _onError(e) {
    console.error('[AudioEngine] Media error:', e);
    const { setStreamError } = usePlayerStore.getState();
    setStreamError('Playback error. Trying next track…');
  }

  _onShakaError(e) {
    console.error('[AudioEngine] Shaka error:', e.detail);
    const { setStreamError } = usePlayerStore.getState();
    setStreamError(`Stream error: ${e.detail?.message ?? 'Unknown'}`);
  }

  _setVolume(v) {
    const el = this._mediaElement();
    if (el) el.volume = Math.max(0, Math.min(1, v));
  }

  seek(seconds) {
    const el = this._mediaElement();
    if (el) {
      el.currentTime = seconds;
      usePlayerStore.getState().setProgress(seconds);
    }
  }

  _installMediaSession() {
    if (!('mediaSession' in navigator) || this._mediaSessionInstalled) return;
    this._mediaSessionInstalled = true;
    const ms = navigator.mediaSession;
    ms.setActionHandler('play', () => usePlayerStore.getState().setIsPlaying(true));
    ms.setActionHandler('pause', () => usePlayerStore.getState().setIsPlaying(false));
    ms.setActionHandler('nexttrack', () => usePlayerStore.getState().next());
    ms.setActionHandler('previoustrack', () => usePlayerStore.getState().prev());
    ms.setActionHandler('seekto', (d) => this.seek(d.seekTime));
  }

  _updateMediaSession(track) {
    if (!('mediaSession' in navigator)) return;
    const { title, artist, album, coverUrl } = track;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title ?? '',
      artist: artist ?? '',
      album: album ?? '',
      artwork: coverUrl ? [{ src: coverUrl, sizes: '320x320', type: 'image/jpeg' }] : [],
    });
  }

  _updatePositionState() {
    if (!('mediaSession' in navigator)) return;
    const el = this._mediaElement();
    if (!el || !isFinite(el.duration) || el.duration === 0) return;
    try {
      navigator.mediaSession.setPositionState({
        duration: el.duration,
        playbackRate: el.playbackRate,
        position: el.currentTime,
      });
    } catch {}
  }

  destroy() {
    this._unsubscribe?.();
    const el = this._mediaElement();
    el?.pause();
    if (this._shaka) {
      this._shaka.destroy();
    }
  }
}

export const audioEngine = new AudioEngine();
