// js/config.js

// Import library Firebase langsung dari CDN Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Konfigurasi Neo Striker Association
const firebaseConfig = {
  apiKey: "AIzaSyDRHui-PlaCSOPremobbw1iqVGRzm1z-qA",
  authDomain: "neo-strker-association.firebaseapp.com",
  projectId: "neo-strker-association",
  storageBucket: "neo-strker-association.firebasestorage.app",
  messagingSenderId: "1091520662423",
  appId: "1:1091520662423:web:57f0a0d5d4cb10d06692d2",
  measurementId: "G-KS3EGDNW68"
};

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);

// Inisialisasi Layanan dan EXPORT agar bisa dipakai di file lain
export const db = getFirestore(app);   // Untuk Database (Klasemen/Leaderboard)
export const auth = getAuth(app);     // Untuk Login
