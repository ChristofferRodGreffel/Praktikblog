// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNavigate } from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6q0zbQpgBtcEBSGiJwgxd9AH9WHsMfVM",
  authDomain: "praktikblog-e5874.firebaseapp.com",
  projectId: "praktikblog-e5874",
  storageBucket: "praktikblog-e5874.appspot.com",
  messagingSenderId: "824067867341",
  appId: "1:824067867341:web:c1d069286cc0707abe9f84",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(app);
export const FIREBASE_AUTH = getAuth(app);
export const FIREBASE_STORAGE = getStorage();
