// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhMU8sX6DxNvG9AznrldsUlWCReoh212Y",
  authDomain: "diary-app513.firebaseapp.com",
  projectId: "diary-app513",
  storageBucket: "diary-app513.firebasestorage.app",
  messagingSenderId: "808289008201",
  appId: "1:808289008201:web:8da813e75ea3af172edd98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);