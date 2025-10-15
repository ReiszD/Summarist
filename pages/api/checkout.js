import Stripe from "stripe";

// Debug: log the secret key
console.log("Stripe secret key:", process.env.STRIPE_SECRET_KEY);

// Make sure Stripe is initialized with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15", // optional but recommended
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { plan, userEmail } = req.body;

  // Debug: log received values
  console.log("Received plan:", plan, "User email:", userEmail);

  // Map your plan names to the Stripe Price IDs (as strings!)
  const priceIdMap = {
    "Premium Plus Yearly": "price_1SIWitFtdDftCTLCt4R2KriH", // must be in quotes!
    "Premium Monthly": "price_1SIWiQFtdDftCTLCeVaQeUsC",
  };

  if (!priceIdMap[plan]) {
    return res.status(400).json({ error: "Invalid plan selected" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",                // recurring payment
      payment_method_types: ["card"],      // card payments
      customer_email: userEmail,           // link customer by email
      line_items: [{ price: priceIdMap[plan], quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/plan`,
    });

    console.log("Stripe session created:", session.id);

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
}