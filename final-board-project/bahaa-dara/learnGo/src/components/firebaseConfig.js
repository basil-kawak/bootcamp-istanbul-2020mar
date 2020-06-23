import * as firebase from "firebase";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC8nxql55Qh_GDjoIQ-8zWigd0lZDyugdI",
    authDomain: "react-bahaa-daraa.firebaseapp.com",
    databaseURL: "https://react-bahaa-daraa.firebaseio.com",
    projectId: "react-bahaa-daraa",
    storageBucket: "react-bahaa-daraa.appspot.com",
    messagingSenderId: "84509455502",
    appId: "1:84509455502:web:feebddc90fa8b22b6ac5df"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();