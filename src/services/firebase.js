// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkuDmOv10_QcKFXcyzSIN47jlftH7ZpA0",
    authDomain: "saara-23cb4.firebaseapp.com",
    databaseURL: "https://saara-23cb4-default-rtdb.firebaseio.com",
    projectId: "saara-23cb4",
    storageBucket: "saara-23cb4.appspot.com",
    messagingSenderId: "711526702589",
    appId: "1:711526702589:web:549e9cf79a166f2e5fcd94",
    measurementId: "G-XE6PWE93M3"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export { db }