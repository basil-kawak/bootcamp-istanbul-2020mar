import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBC99Nhw8P1Th1-8oWvm3gwJ0sGp8W0yso",
  authDomain: "to-doers-0.firebaseapp.com",
  databaseURL: "https://to-doers-0.firebaseio.com",
  projectId: "to-doers-0",
  storageBucket: "to-doers-0.appspot.com",
  messagingSenderId: "422324408443",
  appId: "1:422324408443:web:b51878afcb70317efe52de",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.firestore();
const dbFunctions = firebase.functions();

// add db to the store
const db = (state = { value: database, functions: dbFunctions }, action) => {
  return state;
};

export default db;
