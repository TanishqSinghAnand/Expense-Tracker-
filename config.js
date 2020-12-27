import firebase from "firebase";
require("@firebase/firestore");

export const firebaseConfig = {
  apiKey: "AIzaSyBcrjF4-rZGqN-xGjgWE7JLTjhdCFXD7Rk",
  authDomain: "expensetracker-bac85.firebaseapp.com",
  projectId: "expensetracker-bac85",
  storageBucket: "expensetracker-bac85.appspot.com",
  messagingSenderId: "535311101711",
  appId: "1:535311101711:web:476c5cb2891ad0907c187a",
  measurementId: "G-D4H24YM1BS"
};

firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
