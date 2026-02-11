import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDiabtslkZF3xsaW8nPTcij4DAHRMGn3Yo",
    authDomain: "scholerstream.firebaseapp.com",
    projectId: "scholerstream",
    storageBucket: "scholerstream.firebasestorage.app",
    messagingSenderId: "788779244885",
    appId: "1:788779244885:web:7910ab78b05384104ce3dc",
    measurementId: "G-HJ5K3CYZNM"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;