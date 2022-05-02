import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

export const nameRule = /[^a-zA-Z]+/g
export const bostonCenter = [42.361, -71.057]

// firebase config
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
}
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
if (window.location.hostname === "localhost") {
    connectAuthEmulator(auth, "http://localhost:9099")
}