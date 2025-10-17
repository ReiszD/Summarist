import { useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "@/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

export default function Success() {
  const router = useRouter();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "customers", user.uid, "subscriptions"),
      where("status", "in", ["trialing", "active"])
    );

    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log("Active subscription:", doc.data());
      });
    });

    return () => unsub();
  }, [user?.uid]);

  const handleBack = () => router.push("/for-you");

    return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Your subscription is now active.</p>
      <button
        onClick={handleBack}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#2bd97c",
          color: "#032b41",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Back to For You
      </button>
    </div>
  );
}