import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCSLfSGGIiR6Yln8iCHI5RydnotUvbEprk",
  authDomain: "dronesnap-afcc6.firebaseapp.com",
  projectId: "dronesnap-afcc6",
  storageBucket: "dronesnap-afcc6.firebasestorage.app",
  messagingSenderId: "270825359804",
  appId: "1:270825359804:web:453077faf0b2ac28af03b9",
  measurementId: "G-24L6F8C0VY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
