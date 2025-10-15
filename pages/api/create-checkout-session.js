// Example: /pages/api/create-checkout-session.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { plan, userId } = req.body; // plan = "Premium", "Pro", etc.

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: plan === "Premium"
          ? process.env.STRIPE_PREMIUM_PRICE_ID
          : process.env.STRIPE_PRO_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${req.headers.origin}/success?plan=${plan}`,
    cancel_url: `${req.headers.origin}/cancel`,
    metadata: {
      userId,
      plan,
    },
  });

  res.status(200).json({ url: session.url });
}
