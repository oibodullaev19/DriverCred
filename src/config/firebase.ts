import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// @ts-expect-error Firebase React Native persistence export is not exposed correctly by TypeScript in some Expo/Firebase 12 setups.
import {
    getReactNativePersistence,
    initializeAuth,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD3cMrqCwSJvYpmzMvv_Nojm0BIDi_-5aQ",
  authDomain: "drivercred.firebaseapp.com",
  projectId: "drivercred",
  storageBucket: "drivercred.firebasestorage.app",
  messagingSenderId: "965544170226",
  appId: "1:965544170226:web:1cb1b29f2c7b86007b766b",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default app;