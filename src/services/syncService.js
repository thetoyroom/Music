import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from './firebase.js';
import { useAppStore } from '../store/appStore.js';

let unsubscribe = null;

export const startSync = (userId) => {
  if (!userId) return;
  
  if (unsubscribe) unsubscribe();

  const userDoc = doc(db, 'users', userId);

  // 1. Listen for remote changes
  unsubscribe = onSnapshot(userDoc, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      // Only update if remote is different to avoid loops
      const current = useAppStore.getState();
      
      if (data.likedTracks) current.likedTracks = data.likedTracks;
      if (data.playlists) current.playlists = data.playlists;
      if (data.recentlyPlayed) current.recentlyPlayed = data.recentlyPlayed;

      // Force update the store
      useAppStore.setState({ 
        likedTracks: data.likedTracks || [],
        playlists: data.playlists || [],
        recentlyPlayed: data.recentlyPlayed || []
      });
    }
  });

  // 2. Listen for local changes to push remote
  // We can use Zustand's subscribe
  const sub = useAppStore.subscribe((state, prevState) => {
    // Only push if specific fields changed and it wasn't from a sync
    const fields = ['likedTracks', 'playlists', 'recentlyPlayed'];
    const changed = fields.some(f => state[f] !== prevState[f]);
    
    if (changed) {
      pushToCloud(userId, state);
    }
  });

  return () => {
    if (unsubscribe) unsubscribe();
    sub();
  };
};

export const pushToCloud = async (userId, state) => {
  if (!userId) return;
  const userDoc = doc(db, 'users', userId);
  await setDoc(userDoc, {
    likedTracks: state.likedTracks || [],
    playlists: state.playlists || [],
    recentlyPlayed: state.recentlyPlayed || [],
    lastUpdated: Date.now()
  }, { merge: true });
};

export const fetchFromCloud = async (userId) => {
  if (!userId) return;
  const userDoc = doc(db, 'users', userId);
  const snap = await getDoc(userDoc);
  if (snap.exists()) {
    const data = snap.data();
    useAppStore.setState({
      likedTracks: data.likedTracks || [],
      playlists: data.playlists || [],
      recentlyPlayed: data.recentlyPlayed || []
    });
  }
};
