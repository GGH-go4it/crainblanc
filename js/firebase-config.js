// Firebase config script

const firebaseConfig = {
    apiKey: "AIzaSyCByqXyY5qLjAIS0lEDzOBkVk05OV3ZdR8",
    authDomain: "jeu-vocabulaire-ndls.firebaseapp.com",
    projectId: "jeu-vocabulaire-ndls",
    storageBucket: "jeu-vocabulaire-ndls.appspot.com",
    messagingSenderId: "224131224059",
    appId: "1:224131224059:web:11ccbe706c044354a4fb5e"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();