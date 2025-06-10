// lib/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBs6XGJ_hss0Lz5LDiULqeUew5q9nHFxxQ",
  authDomain: "dvrn-website-portofolio.firebaseapp.com",
  projectId: "dvrn-website-portofolio",
  storageBucket: "dvrn-website-portofolio.appspot.com",
  messagingSenderId: "895890531204",
  appId: "1:895890531204:web:71c708bbe13a555b23b3d1",
  measurementId: "G-6VTXKE164N"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
