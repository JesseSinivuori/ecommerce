import { loadStripe, Stripe as StripeJs } from "@stripe/stripe-js";
import { ProductProps } from "../components/Product";

let stripe: Promise<StripeJs | null>;

export const getStripe = () => {
  if (!stripe) {
    try {
      stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
    } catch (error) {
      throw new Error("Failed to get stripe.");
    }
  }
  return stripe;
};

export const getStripeSession = async (cartItems: ProductProps[]) => {
  try {
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (res.status === 500) throw new Error("Internal server error.");

    const session = await res.json();
    return session;
  } catch (error) {
    throw new Error("Failed to get stripe session.");
  }
};
