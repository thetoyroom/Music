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

    removeFromQueue: (index) => {
      const { queue, queueIndex } = get();
      if (index < 0 || index >= queue.length) return;
      
      const newQueue = queue.filter((_, i) => i !== index);
      let newIndex = queueIndex;
      
      if (index === queueIndex) {
        // If removing current track, play next if possible
        if (newQueue.length === 0) {
          newIndex = -1;
        } else {
          newIndex = Math.min(index, newQueue.length - 1);
        }
      } else if (index < queueIndex) {
        newIndex = queueIndex - 1;
      }
      
      set({ 
        queue: newQueue, 
        queueIndex: newIndex,
        currentTrack: newIndex >= 0 ? newQueue[newIndex] : null,
        isPlaying: newIndex >= 0 && get().isPlaying
      });
    },

    moveInQueue: (from, to) => {
      const { queue, queueIndex, currentTrack } = get();
      if (from < 0 || from >= queue.length || to < 0 || to >= queue.length) return;
      if (from === to) return;
      
      const newQueue = [...queue];
      const [removed] = newQueue.splice(from, 1);
      newQueue.splice(to, 0, removed);
      
      // Find where the current track moved to
      // We use the unique track ID (or reference) to be 100% sure
      const newIndex = newQueue.findIndex((t, i) => {
        // If we are moving the current track itself, its new index is 'to'
        if (from === queueIndex) return i === to;
        // Otherwise, find it by ID
        return t.id === currentTrack?.id;
      });
      
      set({ queue: newQueue, queueIndex: newIndex !== -1 ? newIndex : queueIndex });
    },

    reorderQueue: (newQueue) => {
      const { currentTrack } = get();
      const newIndex = newQueue.findIndex(t => t.id === currentTrack?.id);
      set({ queue: newQueue, queueIndex: newIndex !== -1 ? newIndex : get().queueIndex });
    },

    jumpToQueueIndex: (index) => {
      const { queue } = get();
      if (index < 0 || index >= queue.length) return;
      set({
        queueIndex: index,
        currentTrack: queue[index],
        isPlaying: true,
        isLoading: true,
        progress: 0,
        streamError: null,
      });
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
      const { queue, queueIndex } = get();
      if (!queue.length) return;

      const prevIndex = queueIndex - 1;
      if (prevIndex < 0) {
        // Already at first track, just restart
        set({ progress: 0 });
        return;
      }

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
