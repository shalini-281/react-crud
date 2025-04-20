// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgEbP5zTvxTvOypGPjFHsauFQzLMoFc-M",
  authDomain: "react-card-79159.firebaseapp.com",
  projectId: "react-card-79159",
  storageBucket: "react-card-79159.firebasestorage.app",
  messagingSenderId: "443116675583",
  appId: "1:443116675583:web:e6d4b5351ec8c4a32187ca",
  measurementId: "G-EZC1F31MH6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
