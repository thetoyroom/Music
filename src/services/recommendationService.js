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
  }
};
