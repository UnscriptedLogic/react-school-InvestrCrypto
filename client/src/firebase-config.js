import "dotenv/config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "react-school-investr.firebaseapp.com",
  projectId: "react-school-investr",
  storageBucket: "react-school-investr.appspot.com",
  messagingSenderId: "302972901773",
  appId: "1:302972901773:web:d18a0a33546c046cf785c4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
