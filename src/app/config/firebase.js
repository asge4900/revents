import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "reventscourse-2d8cf.firebaseapp.com",
    databaseURL: "https://reventscourse-2d8cf.firebaseio.com",
    projectId: "reventscourse-2d8cf",
    storageBucket: "reventscourse-2d8cf.appspot.com",
    messagingSenderId: "616717177082",
    appId: "1:616717177082:web:8fd6d9c41339932aedf943"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;