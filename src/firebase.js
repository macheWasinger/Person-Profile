import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdRzLnhzLD6yIeFHk7QzBsAa5RvtaVIrA",
  authDomain: "person-profile.firebaseapp.com",
  projectId: "person-profile",
  storageBucket: "person-profile.appspot.com",
  messagingSenderId: "51186945157",
  appId: "1:51186945157:web:c0c0eea928fc3294cdadec",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(firebaseApp);

// Si descomentas la siguiente línea, cuando mientras que el usuario no se desloguee expresamente o cierre el navegador, permanecerá logueado y podremos acceder a su id desde cualquier página
setPersistence(auth, browserLocalPersistence);
