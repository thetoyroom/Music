/**
 * App Store — theme, settings, recently played, liked tracks
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // ─── Theme ───────────────────────────────────────────────────────────
      theme: 'dark', // 'dark' | 'light'
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      // ─── Audio quality preference ─────────────────────────────────────────
      quality: 'LOSSLESS', // 'HI_RES_LOSSLESS' | 'LOSSLESS' | 'HIGH' | 'LOW'
      setQuality: (q) => set({ quality: q }),

      // ─── Recently played (track objects, max 20) ─────────────────────────
      recentlyPlayed: [],
      addRecentlyPlayed: (track) => {
        const existing = get().recentlyPlayed.filter((t) => t.id !== track.id);
        set({ recentlyPlayed: [track, ...existing].slice(0, 20) });
      },

      // ─── Liked tracks ────────────────────────────────────────────────────
      likedTracks: [],
      isLiked: (id) => get().likedTracks.some((t) => t.id === id),
      toggleLike: (track) => {
        const liked = get().likedTracks;
        if (liked.some((t) => t.id === track.id)) {
          set({ likedTracks: liked.filter((t) => t.id !== track.id) });
        } else {
          set({ likedTracks: [track, ...liked] });
        }
      },

      // ─── Custom playlists ─────────────────────────────────────────────────
      playlists: [],
      createPlaylist: (name) => {
        const id = `pl_${Date.now()}`;
        set((s) => ({
          playlists: [...s.playlists, { id, name, tracks: [], createdAt: Date.now() }],
        }));
        return id;
      },
      addTrackToPlaylist: (playlistId, track) => {
        set((s) => ({
          playlists: s.playlists.map((p) =>
            p.id === playlistId && !p.tracks.some((t) => t.id === track.id)
              ? { ...p, tracks: [...p.tracks, track] }
              : p
          ),
        }));
      },
      removeTrackFromPlaylist: (playlistId, trackId) => {
        set((s) => ({
          playlists: s.playlists.map((p) =>
            p.id === playlistId
              ? { ...p, tracks: p.tracks.filter((t) => t.id !== trackId) }
              : p
          ),
        }));
      },
    }),
    {
      name: 'steqmusic-app-store',
      partialize: (s) => ({
        theme: s.theme,
        quality: s.quality,
        recentlyPlayed: s.recentlyPlayed,
        likedTracks: s.likedTracks,
        playlists: s.playlists,
      }),
    }
  )
);
