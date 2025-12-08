import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAvmmgk6JVlu95QQMpSCwMUIThC53HeUrw",
    authDomain: "food-7862f.firebaseapp.com",
    projectId: "food-7862f",
    storageBucket: "food-7862f.firebasestorage.app",
    messagingSenderId: "386377989911",
    appId: "1:386377989911:web:1a66d6b0f36c0d417a0152"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

export default app;