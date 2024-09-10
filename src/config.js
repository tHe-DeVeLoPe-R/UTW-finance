import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB7zIfa3VZ8NfG2FzBi5Y7KXE1y1Qpo9pE",
    authDomain: "finance-90459.firebaseapp.com",
    projectId: "finance-90459",
    storageBucket: "finance-90459.appspot.com",
    messagingSenderId: "605427557682",
    appId: "1:605427557682:web:4cc1580a33c3e1b892a32b",
    measurementId: "G-RVTEKQ8XT4"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)

export default db;