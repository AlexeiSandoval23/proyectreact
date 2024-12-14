import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCN8I5JrCTx6pQSQvilKmR3qWWpEUi7hsM",
    authDomain: "e-commerse-6dc91.firebaseapp.com",
    projectId: "e-commerse-6dc91",
    storageBucket: "e-commerse-6dc91.firebasestorage.app",
    messagingSenderId: "16309824202",
    appId: "1:16309824202:web:a89e6d1495f88ab2f5a233"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
