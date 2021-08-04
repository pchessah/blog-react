import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyChIqzUfpT3mNKoFT32mrrylpMfVKjxR8g",
    authDomain: "chessah-blog.firebaseapp.com",
    projectId: "chessah-blog",
    storageBucket: "chessah-blog.appspot.com",
    messagingSenderId: "65684177816",
    appId: "1:65684177816:web:52e6b48bec8be3c8d2e1ed",
    measurementId: "G-7T03FXSMBH"
});

export default firebaseConfig;