// Import the functions you need from the SDKs you need
//import firebase from "firebase";
import { initializeApp } from 'firebase/app';
//var firebase = require("firebase/app");
//import { initializeApp } from 'firebase-admin/app';
//var getAuth = require("firebase/auth");

//import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//var getFirestore = require("firebase/firestore");
//import { getFirestore } from 'firebase-admin/firestore'

//import 'firebase/storage'
//import { getStorage } from 'firebase/storage';
//import { getFirestore } from "firebase/firestore";

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

//import {admin} from "firebase-admin";

//var serviceAccount = require("./s2bfb-40f12fire.json");

/*
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});*/

/*
const auth = getAuth(app);
onAuthStateChanged(auth, user => {
  console.log(user)
});*/

// Initialize Firebase
//const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const app = initializeApp(firebaseConfig);

//const auth = getAuth(app);

const db = getFirestore(app);
//const db = getFirestore();
//const storage = firebase.storage();
const storage = getStorage(app);

export { db, storage }