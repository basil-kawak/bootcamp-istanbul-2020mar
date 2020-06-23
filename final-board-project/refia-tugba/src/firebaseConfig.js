import * as firebase from "firebase";
import "firebase/database"

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyC4-VFs5wxJnrYj92M0KqZYtWOJUWHp3mA",
    authDomain: "the-board-project.firebaseapp.com",
    databaseURL: "https://the-board-project.firebaseio.com",
    projectId: "the-board-project",
    storageBucket: "the-board-project.appspot.com",
    messagingSenderId: "492051058285",
    appId: "1:492051058285:web:73ad9f890cfd7f28bdb964",
    measurementId: "G-3QPEBZF0KX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();
  export default db;