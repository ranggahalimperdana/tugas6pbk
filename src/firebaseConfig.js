import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCH7nm7Qnk-9GeR-eLi19Mv5YAd2UUJvuQ",
    authDomain: "tugas6-pbk-rangga.firebaseapp.com",
    projectId: "tugas6-pbk-rangga",
    storageBucket: "tugas6-pbk-rangga.appspot.com",
    messagingSenderId: "1081636249018",
    appId: "1:1081636249018:web:317352615187fc70d29183",
    measurementId: "G-54NGWDJ1JX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
