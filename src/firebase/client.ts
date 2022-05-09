// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";


const githubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA44eVnSbUa-5yfN0hglMD8Fbs0qEDlxmE",
    authDomain: "meet-clone-1df98.firebaseapp.com",
    projectId: "meet-clone-1df98",
    storageBucket: "meet-clone-1df98.appspot.com",
    messagingSenderId: "613303803053",
    appId: "1:613303803053:web:1b722d56598fc6fc28fa24",
    measurementId: "G-KBQ4JSCFP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase()
export { githubProvider, googleProvider };