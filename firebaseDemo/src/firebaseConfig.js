import * as firebase from 'firebase';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCNI-JWjpbG2xHbGt5hXDX2-Us-58bz0LQ",
    authDomain: "fir-demo-df9f8.firebaseapp.com",
    databaseURL: "https://fir-demo-df9f8.firebaseio.com",
    projectId: "fir-demo-df9f8",
    storageBucket: "fir-demo-df9f8.appspot.com",
    messagingSenderId: "635155031767",
    appId: "1:635155031767:web:52a5361662c0b42bdf3292"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();