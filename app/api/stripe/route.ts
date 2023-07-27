import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const headersList = headers();
    const origin = headersList.get("origin");

    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1MKdE9KqkQnb4BuXkkx57hWb" },
        { shipping_rate: "shr_1MKdEZKqkQnb4BuXZK4lr3VT" },
      ],
      line_items: body.map((item: any) => {
        const img = item.image[0].asset._ref;
        const newImage = img
          .replace(
            "image-",
            "https://cdn.sanity.io/images/y2w5k2uh/production/"
          )
          .replace("-webp", ".webp", "-jpeg", ".jpeg", "-png", ".png");

        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: Math.round(item.price * 100),
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${origin}/payment/success`,
      cancel_url: `${origin}/payment/canceled`,
    };

    const session = await stripe.checkout.sessions.create(params);
    return NextResponse.json(session, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(err.message, { status: err.statusCode || 500 });
  }
}
