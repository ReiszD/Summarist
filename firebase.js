// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, signInAnonymously, sendPasswordResetEmail as firebaseSendPasswordResetEmail } from 'firebase/auth';
import { addDoc, collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_API_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
            premium: false,
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
};

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error)
        alert(error)
    }
};

const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const res = await signInWithPopup(auth, provider);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name: user.displayName,
            authProvider: "google",
            email: user.email,
            premium: false,
        }, {merge: true});
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

const signInAsGuest = async () => {
    try {
        const res = await signInAnonymously(auth);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name: "Guest User",
            authProvider: "anonymous",
            email: null,
            premium: false,
        }, {merge: true});
    } catch (error) {
        console.log(error);
        alert(error.message);
        if (error.code === "auth/operation-not-allowed") {
            alert("Anonymous sign-in hasn't been enabled for this project. Please enable it in the Firebase console.");
        }
    }
};

const sendPasswordReset = async (email) => {
    try {
        await firebaseSendPasswordResetEmail(auth, email);
        alert("Password reset link sent! Check your email.");
    } catch (error) {
        console.error(error);
        alert(error.message)
    }
};

const logout = () => {
    signOut(auth);
};

// Get current user's subscription
const getUserSubscription = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data().premium || false;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// Upgrade user to premium
const upgradeToPremium = async (uid) => {
  try {
    await updateDoc(doc(db, "users", uid), { premium: true });
    alert("Successfully upgraded to premium!");
  } catch (error) {
    console.error(error);
    alert("Failed to upgrade to premium.");
  }
};

export {auth, db, login, signup, signInWithGoogle, signInAsGuest, sendPasswordReset, logout, getUserSubscription, upgradeToPremium}