// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB50Yb0meXQqNZeLIQyYE_n86pSTqMeTIk",
    authDomain: "career-compass-3a20d.firebaseapp.com",
    projectId: "career-compass-3a20d",
    storageBucket: "career-compass-3a20d.firebasestorage.app",
    messagingSenderId: "700505855676",
    appId: "1:700505855676:web:93f64fbc47394742e762b9",
    measurementId: "G-SHCS4Y4Y4J"
};  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
