// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO8bxp6hJuJhseuJ94Mtp-9-byi9F2Wkc",
  authDomain: "weather-app-dde43.firebaseapp.com",
  projectId: "weather-app-dde43",
  storageBucket: "weather-app-dde43.appspot.com",
  messagingSenderId: "1041780783880",
  appId: "1:1041780783880:web:b7cb608b815528edcecabd",
  measurementId: "G-ZZ29XR38Z3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore

export { auth, db };
