// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-marketplace-6a4c7.firebaseapp.com",
  projectId: "estate-marketplace-6a4c7",
  storageBucket: "estate-marketplace-6a4c7.appspot.com",
  messagingSenderId: "227683287068",
  appId: "1:227683287068:web:15b574d6fceeb92d855fd9",
  measurementId: "G-CHV743PDC5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);