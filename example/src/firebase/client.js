// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const functions = getFunctions(app);

// connect emulators in developement
if (window.location.hostname === "localhost") {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

// export initialized functions for use in other parts of the app
export { functions };
