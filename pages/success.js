import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { auth, upgradeToPlan } from "@/firebase";
import { updateSubscriptionPlan } from "@/redux/userSlice";

export default function Success() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { plan } = router.query;

  useEffect(() => {
    if (!plan || !auth.currentUser) return;

    const handlePaymentSuccess = async () => {
      try {
        await upgradeToPlan(auth.currentUser.uid, plan);
        dispatch(updateSubscriptionPlan(plan));
      } catch (error) {
        console.error("Failed to update subscription:", error);
      }
    };

    handlePaymentSuccess();
  }, [plan, dispatch]);

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
          color: "#fff",
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
