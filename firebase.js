// Import the functions you need from the SDKs you need
import firebase from "firebase";
import 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQyq88qlzvGf3EyRrvB4BwvDoaSw19YbE",
    authDomain: "s2bfb-40f12.firebaseapp.com",
    projectId: "s2bfb-40f12",
    storageBucket: "s2bfb-40f12.appspot.com",
    messagingSenderId: "610319371834",
    appId: "1:610319371834:web:78c77e8e06b5640c3c2f03"
};

// Initialize Firebase
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export { db, storage }