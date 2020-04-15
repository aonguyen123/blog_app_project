import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/analytics';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: 'AIzaSyAC_FpN8DTFTR_P6UXmudiMXi0fWi1j_cg',
    authDomain: 'upload-image-81d73.firebaseapp.com',
    databaseURL: 'https://upload-image-81d73.firebaseio.com',
    projectId: 'upload-image-81d73',
    storageBucket: 'upload-image-81d73.appspot.com',
    messagingSenderId: '987309499177',
    appId: '1:987309499177:web:10c9746d978249c2528d38',
    measurementId: "G-LPBXCHETYP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const storage = firebase.storage();
const auth = firebase.auth;
const db = firebase.database;

export default {
    storage,
    firebaseDefault: firebase,
    auth,
    db
}
