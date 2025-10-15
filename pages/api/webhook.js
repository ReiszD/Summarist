// pages/api/webhook.js
import Stripe from "stripe";
import { buffer } from "micro";
import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, "\n")
  );
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const email = session.customer_email;

      try {
        const usersRef = admin.firestore().collection("users");
        const snapshot = await usersRef.where("email", "==", email).get();

        if (!snapshot.empty) {
          const userDoc = snapshot.docs[0];
          await usersRef.doc(userDoc.id).update({
            subscriptionStatus: "active",
            subscriptionId: session.subscription,
            plan: session.display_items?.[0]?.plan?.nickname || "Unknown",
          });
          console.log(`✅ User ${email} marked as subscribed`);
        } else {
          console.warn(`⚠️ No user found with email ${email}`);
        }
      } catch (err) {
        console.error("Error updating Firestore user:", err);
      }
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
