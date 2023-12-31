// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "vroum-eb51a.firebaseapp.com",
  projectId: "vroum-eb51a",
  storageBucket: "vroum-eb51a.appspot.com",
  messagingSenderId: "908982754324",
  appId: "1:908982754324:web:11027a284c69ef7faf5b01",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
