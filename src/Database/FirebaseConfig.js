import { data } from "autoprefixer";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Corrected 'getFireStore' to 'getFirestore'

const firebaseConfig = {
  apiKey: "AIzaSyCdApnYumafpsr7G0LP7QhUZno5WHyHuPk",
  authDomain: "doc-app-e8433.firebaseapp.com",
  databaseURL: "https://doc-app-e8433-default-rtdb.firebaseio.com",
  projectId: "doc-app-e8433",
  storageBucket: "doc-app-e8433.appspot.com",  // Corrected storage bucket URL format
  messagingSenderId: "410912930074",
  appId: "1:410912930074:web:c8e73e9304d28f7459d4a3",
  measurementId: "G-8HLWEDH0S1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);  // Corrected 'getFireStore' to 'getFirestore'

export default database