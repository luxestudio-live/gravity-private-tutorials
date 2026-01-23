import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAa6Irm56xKIcGLTMO3jCWfebG-JxGVr9s",
  authDomain: "decent-academy.firebaseapp.com",
  projectId: "decent-academy",
  storageBucket: "decent-academy.firebasestorage.app",
  messagingSenderId: "198008941646",
  appId: "1:198008941646:web:05b646e45147c640e4671f",
  measurementId: "G-0G8L8ZFTBE"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app)

export default app
