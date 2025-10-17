import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  setDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

console.log("🔥 ENV CHECK:", {
  API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  MSG_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
console.log("🚀 Firebase Config at build:", firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ----------------------- Auth Functions -----------------------

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      premium: false,
    });
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        premium: false,
      },
      { merge: true }
    );
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const signInAsGuest = async () => {
  try {
    const res = await signInAnonymously(auth);
    const user = res.user;
    await setDoc(
      doc(db, "users", user.uid),
      {
        uid: user.uid,
        name: "Guest User",
        authProvider: "anonymous",
        email: null,
        premium: false,
      },
      { merge: true }
    );
  } catch (error) {
    console.error(error);
    alert(error.message);
    if (error.code === "auth/operation-not-allowed") {
      alert(
        "Anonymous sign-in hasn't been enabled for this project. Please enable it in the Firebase console."
      );
    }
  }
};

const sendPasswordReset = async (email) => {
  try {
    await firebaseSendPasswordResetEmail(auth, email);
    alert("Password reset link sent! Check your email.");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const logout = () => {
  signOut(auth);
};

// ----------------------- Premium Functions -----------------------

const getUserSubscription = async (uid) => {
  try {
    const subRef = doc(db, "customers", uid, "subscriptions", "active");
    const docSnap = await getDoc(subRef);

    if (!docSnap.exists()) return "free";

    const data = docSnap.data();

    const planName = data?.items?.[0]?.plan?.product?.name || "";
    const status = data?.status;

    if (status !== "active") return "free";

    if (planName.toLowerCase().includes("plus")) return "premium_plus";
    if (planName.toLowerCase().includes("premium")) return "premium";

    return "free";
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return "free";
  }
};

const upgradeToPremium = async (uid) => {
  try {
    await updateDoc(doc(db, "users", uid), { premium: true });
    alert("Successfully upgraded to premium!");
  } catch (error) {
    console.error(error);
    alert("Failed to upgrade to premium.");
  }
};

// ----------------------- Library Functions -----------------------

export const addBookToLibrary = async (uid, book) => {
  try {
    await setDoc(doc(db, "users", uid, "library", book.id), {
      bookId: book.id,
      title: book.title,
      author: book.author,
      imageLink: book.imageLink,
      subTitle: book.subTitle || "",
      subscriptionRequired: book.subscriptionRequired || false,
      audioLink: book.audioLink || "",
      averageRating: book.averageRating || 0,
      addedAt: new Date(),
    });
    alert(`${book.title} has been added to your library!`);
  } catch (error) {
    console.error("Error adding book:", error);
  }
};

export const getUserLibrary = async (uid) => {
  try {
    const libraryRef = collection(db, "users", uid, "library");
    const snapshot = await getDocs(libraryRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching library:", error);
    return [];
  }
};

export const removeBookFromLibrary = async (uid, bookId) => {
  try {
    await deleteDoc(doc(db, "users", uid, "library", bookId));
  } catch (error) {
    console.error("Error removing book:", error);
  }
};

export const addBookToFinished = async (uid, book) => {
  try {
    await setDoc(doc(db, "users", uid, "finished", book.id), {
      bookId: book.id,
      title: book.title,
      author: book.author,
      imageLink: book.imageLink,
      subTitle: book.subTitle || "",
      subscriptionRequired: book.subscriptionRequired || false,
      audioLink: book.audioLink || "",
      averageRating: book.averageRating || 0,
      finishedAt: new Date(),
    });

    localStorage.setItem("finishedUpdated", true);
  } catch (error) {
    console.error("Error marking book as finished:", error);
  }
};

export const getUserFinished = async (uid) => {
  try {
    const finishedRef = collection(db, "users", uid, "finished");
    const snapshot = await getDocs(finishedRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching finished books:", error);
    return [];
  }
};

export {
  auth,
  db,
  login,
  signup,
  signInWithGoogle,
  signInAsGuest,
  sendPasswordReset,
  logout,
  getUserSubscription,
  upgradeToPremium,
};
