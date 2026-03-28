import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your project's Firebase config
// Go to Firebase Console > Project Settings > Web Apps
const firebaseConfig = {
  apiKey: "AIzaSyBrQqE5iv3o-FpJwE8W-Elrx3x_msHJljI",
  authDomain: "steqmusic-5b5f4.firebaseapp.com",
  projectId: "steqmusic-5b5f4",
  storageBucket: "steqmusic-5b5f4.firebasestorage.app",
  messagingSenderId: "717126662921",
  appId: "1:717126662921:web:3d1236cd42a463ec4b31d8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
