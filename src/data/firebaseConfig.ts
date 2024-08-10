// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFV5c56tmj0OIlhpqBnHrDqKqnwzb1eME",
  authDomain: "fir-project-e01fb.firebaseapp.com",
  projectId: "fir-project-e01fb",
  storageBucket: "fir-project-e01fb.appspot.com",
  messagingSenderId: "1063511334230",
  appId: "1:1063511334230:web:3382472cfbbf43e47e8af7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// fireStore Function
export const db = getFirestore(app);
export const firebaseStorage = getStorage(app);
export const appAuth = getAuth(app);
