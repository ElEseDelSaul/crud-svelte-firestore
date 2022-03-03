// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCB9M-IL8F3qKEfh2Wfy2g7cI5f6R-JrA",
  authDomain: "svelte-crud-firebase-f2173.firebaseapp.com",
  projectId: "svelte-crud-firebase-f2173",
  storageBucket: "svelte-crud-firebase-f2173.appspot.com",
  messagingSenderId: "812198639270",
  appId: "1:812198639270:web:9b61b8113291a138d9e667"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);