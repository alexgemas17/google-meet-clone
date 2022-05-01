import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyCYDK5HWgZiMGe_UOk5H6QiBK88TJ8X2Ss",
    authDomain: "twitter-clone-3407a.firebaseapp.com",
    databaseURL: "https://twitter-clone-3407a.firebaseio.com",
    projectId: "twitter-clone-3407a",
    storageBucket: "twitter-clone-3407a.appspot.com",
    messagingSenderId: "459828175983",
    appId: "1:459828175983:web:26f2517cdb4b7037f6999a",
    measurementId: "G-S72ZFP5TSL"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos
const db = firebase.firestore()
const database = firebase.database()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
const githubAuthProvider = new firebase.auth.GithubAuthProvider()

export {
    db, 
    database,
    googleAuthProvider,
    githubAuthProvider,
    firebase
}