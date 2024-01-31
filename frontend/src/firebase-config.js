import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLxQBmYASLj8OgEcO7JgsluZdVP3IBYLE",
  authDomain: "beauty-appointment-webapp.firebaseapp.com",
  projectId: "beauty-appointment-webapp",
  storageBucket: "beauty-appointment-webapp.appspot.com",
  messagingSenderId: "480721389566",
  appId: "1:480721389566:web:77ee9b3352edb0f207a2af",
  measurementId: "G-CJ26GLPTXT",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
