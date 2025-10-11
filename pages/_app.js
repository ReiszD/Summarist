// pages/_app.js
import "@/styles/globals.css";
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "@/redux/store";
import LoginWrapper from "@/components/LoginWrapper";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "@/redux/userSlice"; // ✅ using clearUser

function AppWrapper({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser(firebaseUser));
      } else {
        dispatch(clearUser()); // ✅ corrected from logoutUser() to clearUser()
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <Component {...pageProps} />;
}

export default function App(props) {
  return (
    <Provider store={store}>
      <AppWrapper {...props} />
      <LoginWrapper />
    </Provider>
  );
}