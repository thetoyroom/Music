import { searchTracks, getArtistTopTracks, normalizeTracks } from '../api/monochrome';
import { useAppStore } from '../store/appStore';

/**
 * RecommendationService
 * Generates personalized music suggestions based on user profile.
 */
export const recommendationService = {
  /**
   * Get a mix of tracks based on onboarding preferences and history.
   */
  async getPersonalizedFeed() {
    const { onboardingData, likedTracks, recentlyPlayed } = useAppStore.getState();
    const { genres = [], artists = [] } = onboardingData;

    try {
      // 1. Gather seeds
      const artistSeeds = [...artists.slice(0, 3), ...likedTracks.slice(0, 2).map(t => ({ name: t.artist, id: t.artistId }))];
      const genreSeeds = [...genres.slice(0, 3)];

      const promises = [];

      // 2. Fetch tracks from preferred artists
      artistSeeds.forEach(artist => {
        if (artist.id) {
          promises.push(getArtistTopTracks(artist.id, 10).catch(() => []));
        }
      });

      // 3. Simple search for preferred genres
      genreSeeds.forEach(genre => {
        promises.push(searchTracks(genre, 10).then(res => res?.data?.items || res?.tracks?.items || res).catch(() => []));
      });

      const results = await Promise.all(promises);
      let allTracks = results.flat();

      // 4. Normalize and deduplicate
      const normalized = normalizeTracks(allTracks);
      const unique = Array.from(new Map(normalized.map(t => [t.id, t])).values());

      // 5. Shuffle for variety
      return unique.sort(() => Math.random() - 0.5).slice(0, 20);
    } catch (err) {
      console.error('[RecommendationService] Failed to generate feed:', err);
      // Fallback to trending or something if needed
      return [];
    }
  },

  /**
   * Generates a context-aware radio based on a single track.
   */
  async getTrackRadio(track) {
    if (!track) return [];
    
    try {
      const { getTrackRadio, normalizeTracks, getArtistTopTracks } = await import('../api/monochrome');
      
      let raw;
      try {
        raw = await getTrackRadio(track.id);
      } catch (e) {
        console.warn('[RecommendationService] Primary radio API failed, falling back to artist tracks');
        // Fallback: Get top tracks for the artist
        if (track.artistId) {
          raw = await getArtistTopTracks(track.artistId, 50);
        } else {
          throw e;
        }
      }

      const normalized = normalizeTracks(raw);
      
      // Ensure we don't return the seed track as the first item if we have others
      const filtered = normalized.filter(t => t.id !== track.id);
      
      // Add the seed track at the start
      return [track, ...filtered];
    } catch (err) {
      console.error('[RecommendationService] Failed to generate radio:', err);
      return [track];
    }
  }
};
