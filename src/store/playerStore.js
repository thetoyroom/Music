/**
 * Zustand Player Store — manages playback state and queue.
 */
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const usePlayerStore = create(
  subscribeWithSelector((set, get) => ({
    // ─── State ─────────────────────────────────────────────────────────────
    currentTrack: null,
    queue: [],
    queueIndex: -1,
    isPlaying: false,
    isLoading: false,
    progress: 0,      // seconds
    duration: 0,      // seconds
    volume: 0.8,      // 0–1
    isMuted: false,
    shuffle: false,
    repeat: 'none',   // 'none' | 'one' | 'all'
    quality: 'LOSSLESS', // 'HI_RES_LOSSLESS' | 'LOSSLESS' | 'HIGH' | 'LOW'
    streamError: null,
    lyrics: null,

    // ─── Actions ───────────────────────────────────────────────────────────
    setLyrics: (lyrics) => set({ lyrics }),

    /** Play a single track immediately (clears queue if solo=true) */
    playTrack: (track, newQueue = null, index = 0) => {
      const q = newQueue ?? [track];
      set({
        currentTrack: track,
        queue: q,
        queueIndex: index,
        isPlaying: true,
        isLoading: true,
        streamError: null,
        progress: 0,
      });
    },

    /** Enqueue after current, or at end */
    addToQueue: (track) => {
      const { queue, queueIndex } = get();
      const newQueue = [
        ...queue.slice(0, queueIndex + 1),
        track,
        ...queue.slice(queueIndex + 1),
      ];
      set({ queue: newQueue });
    },

    addToQueueEnd: (track) => {
      set((s) => ({ queue: [...s.queue, track] }));
    },

    setQueue: (tracks, index = 0) => {
      set({
        queue: tracks,
        queueIndex: index,
        currentTrack: tracks[index] ?? null,
        isPlaying: tracks.length > 0,
        isLoading: tracks.length > 0,
        progress: 0,
        streamError: null,
      });
    },

    next: () => {
      const { queue, queueIndex, shuffle, repeat } = get();
      if (!queue.length) return;

      let nextIndex;
      if (shuffle) {
        nextIndex = Math.floor(Math.random() * queue.length);
      } else if (repeat === 'all') {
        nextIndex = (queueIndex + 1) % queue.length;
      } else {
        nextIndex = queueIndex + 1;
        if (nextIndex >= queue.length) return;
      }

      set({
        queueIndex: nextIndex,
        currentTrack: queue[nextIndex],
        isPlaying: true,
        isLoading: true,
        progress: 0,
        streamError: null,
      });
    },

    prev: () => {
      const { queue, queueIndex, progress } = get();
      if (!queue.length) return;

      // If more than 3s in, restart current track
      if (progress > 3) {
        set({ progress: 0 });
        return;
      }

      const prevIndex = Math.max(0, queueIndex - 1);
      set({
        queueIndex: prevIndex,
        currentTrack: queue[prevIndex],
        isPlaying: true,
        isLoading: true,
        progress: 0,
        streamError: null,
      });
    },

    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setProgress: (progress) => set({ progress }),
    setDuration: (duration) => set({ duration }),
    setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
    toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
    toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
    toggleRepeat: () =>
      set((s) => ({
        repeat:
          s.repeat === 'none' ? 'all' : s.repeat === 'all' ? 'one' : 'none',
      })),
    setQuality: (quality) => set({ quality }),
    setStreamError: (error) => set({ streamError: error, isLoading: false }),

    clearQueue: () =>
      set({
        queue: [],
        queueIndex: -1,
        currentTrack: null,
        isPlaying: false,
        progress: 0,
        duration: 0,
        streamError: null,
      }),
  }))
);
