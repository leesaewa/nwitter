import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDsmwXnlbsZgZPaa-4ifL0oOgwGPvD2LEQ",
  authDomain: "nwitter-reloaded-c85df.firebaseapp.com",
  projectId: "nwitter-reloaded-c85df",
  storageBucket: "nwitter-reloaded-c85df.appspot.com",
  messagingSenderId: "722560471312",
  appId: "1:722560471312:web:70e8cbd6b709476731d595",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
