// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, updateDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app)
const colRef = collection(db, "applications")

const registerUser = async (user) => {
    console.log("worked")
    const docRef = doc(db, "applications", user.uid)
    return await setDoc(docRef, {email: user.email})
}

const setApplication = async (user, data) => {
    const docRef = doc(db, "applications", user.uid)
    return updateDoc(docRef, data)
}

const doesUserExist = async (user) => {
    const docRef = doc(db, "applications", user.uid)
    const snapshot = await getDoc(docRef)
    if(snapshot.exists()) {
        return {exists: true, data: snapshot.data()}
    }
    else {
        return {exists: false, data: null}
    }
}

export {
    setApplication,
    doesUserExist,
    auth,
    onAuthStateChanged,
    registerUser,
    colRef,
    db
}
