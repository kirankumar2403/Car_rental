// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLwFrIrQNySJj4hbkNk3faFHGJ2jEH2-k",
  authDomain: "car-rental-auth-7b9b2.firebaseapp.com",
  projectId: "car-rental-auth-7b9b2",
  storageBucket: "car-rental-auth-7b9b2.appspot.com",
  messagingSenderId: "1098040621693",
  appId: "1:1098040621693:web:c9b9f2f9aea59a4a9e2a7c",
  measurementId: "G-LFNRP4HLYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };