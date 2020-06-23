import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDw0NFo94Ar2Q150QPDiTkRCqhKmxu2g1k",
    authDomain: "cookbook-2d114.firebaseapp.com",
    databaseURL: "https://cookbook-2d114.firebaseio.com",
    projectId: "cookbook-2d114",
    storageBucket: "cookbook-2d114.appspot.com",
    messagingSenderId: "158503504021",
    appId: "1:158503504021:web:01928394e50fa8af7ff39c",
    measurementId: "G-R9N1DPFN8G"
});


export default firebaseApp.firestore(); 