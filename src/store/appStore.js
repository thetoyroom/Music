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

      // ─── Onboarding ───────────────────────────────────────────────────────
      hasCompletedOnboarding: false,
      onboardingData: {
        genres: [],
        artists: [],
      },
      completeOnboarding: (data) =>
        set({ onboardingData: data, hasCompletedOnboarding: true }),

      // ─── Downloads ────────────────────────────────────────────────────────
      downloads: [], // { id, filename, progress, status: 'downloading' | 'completed' | 'error' }
      addDownload: (id, filename) =>
        set((s) => ({
          downloads: [...s.downloads, { id, filename, progress: 0, status: 'downloading' }],
        })),
      updateDownloadProgress: (id, progress) =>
        set((s) => ({
          downloads: s.downloads.map((d) =>
            d.id === id ? { ...d, progress, status: progress >= 100 ? 'completed' : 'downloading' } : d
          ),
        })),
      removeDownload: (id) =>
        set((s) => ({
          downloads: s.downloads.filter((d) => d.id !== id),
        })),
    }),
    {
      name: 'steqmusic-app-store',
      partialize: (s) => ({
        theme: s.theme,
        quality: s.quality,
        recentlyPlayed: s.recentlyPlayed,
        likedTracks: s.likedTracks,
        playlists: s.playlists,
        hasCompletedOnboarding: s.hasCompletedOnboarding,
        onboardingData: s.onboardingData,
      }),
    }
  )
);
