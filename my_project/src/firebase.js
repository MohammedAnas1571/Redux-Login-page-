// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIRE_BASE_KEY,
    
  authDomain: "auth-27030.firebaseapp.com",
  projectId: "auth-27030",
  storageBucket: "auth-27030.appspot.com",
  messagingSenderId: "137342472214",
  appId: "1:137342472214:web:950cc22e081bd62c04a537",
  measurementId: "G-G0239J84LV"
};


 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);