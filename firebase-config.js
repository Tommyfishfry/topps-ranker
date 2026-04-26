// firebase-config.js
// -------------------------------------------------------
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Click "Add project" → name it (e.g. "topps-ranker")
// 3. Go to Firestore Database → Create database → Start in test mode
// 4. Go to Project Settings → Your apps → Add web app
// 5. Copy your firebaseConfig object and paste it below
// -------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfOu7bAIfIQ8bWEpsZTdeDv-8FT0qL7X4",
  authDomain: "topps-ranker.firebaseapp.com",
  projectId: "topps-ranker",
  storageBucket: "topps-ranker.firebasestorage.app",
  messagingSenderId: "252611399751",
  appId: "1:252611399751:web:0441e77faa1e7786376162"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
