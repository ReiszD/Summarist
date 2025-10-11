// pages/_app.js
import '@/styles/globals.css'
import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "@/redux/store";
import LoginWrapper from "@/components/LoginWrapper";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "@/redux/userSlice";

function AppWrapper({ Component, pageProps }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Store minimal user info in Redux
        dispatch(setUser({ uid: user.uid, email: user.email, name: user.displayName }));
      } else {
        dispatch(clearUser());
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
