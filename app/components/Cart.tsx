"use client";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { useStateContext } from "../providers/StateContext";
import { urlFor } from "../lib/sanityClient";
import { getStripe, getStripeSession } from "../lib/stripe";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  OnClickOutside,
  ProductProps,
  Disclosure,
  OnPopState,
  CartQuantityButtons,
} from "./index";
import copy from "copy-to-clipboard";
import { Stripe as StripeJs } from "@stripe/stripe-js";
import Stripe from "stripe";
import { useEffect, useState } from "react";

export default function Cart() {
  const { totalPrice, totalQuantities, cartItems, setShowCart, showCart } =
    useStateContext();

  const handleCheckout = async () => {
    let session: Stripe.Checkout.Session;
    let stripe: StripeJs | null;
    copy("4242 4242 4242 4242");
    toast.success("Test cart copied to clipboard.");
    toast.loading("Redirecting...");
    try {
      [stripe, session] = await Promise.all([
        getStripe(),
        getStripeSession(cartItems),
      ]);

      await stripe?.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const roundedTotalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2);

  const [cartOpenStyle, setCartOpenStyle] = useState("translate-x-full");

  useEffect(() => {
    if (showCart) {
      setCartOpenStyle("");
      document.body.style.overflow = "hidden"; // Disable scrolling the page
    } else {
      setCartOpenStyle("translate-x-full");
      document.body.style.overflow = "auto"; // Enable scrolling the page
    }
  }, [showCart]);

  return (
    <div
      className={`h-full w-full max-w-[680px] fixed right-0 top-0 bottom-0 text-white
           bg-nav transition-all duration-500 overscroll-none 
          ${cartOpenStyle}`}
    >
      <OnPopState onPopState={() => setShowCart(false)}>
        <OnClickOutside
          condition={showCart}
          onClickOutside={() => setShowCart(false)}
        >
          <div
            className={`py-8 px-4 h-[100svh] flex flex-col rounded-md overflow-auto overscroll-none `}
            role="dialog"
            aria-label="shopping cart"
          >
            <button
              aria-label="close cart"
              type="button"
              className={`cart-heading hidden pb-8 transition-all duration-100 
              hover:opacity-50 ss:flex`}
              onClick={() => {
                setShowCart(false);
              }}
            >
              <AiOutlineLeft />
              <p className="heading">Items</p>
              <p className="cart-num-items">{totalQuantities}</p>
            </button>
            {!cartItems.length && (
              <div className="flex justify-center items-center flex-col gap-4">
                <AiOutlineShopping size={150} />
                <h3 className="font-medium text-2xl">{`It's empty... 👀`}</h3>
                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                  className="btn"
                >
                  Continue shopping
                </button>
              </div>
            )}
            <div className="product-container h-full overflow-auto overscroll-none px-4 ">
              {cartItems.length >= 1 &&
                cartItems.map((item: ProductProps) => (
                  <div
                    className="flex flex-wrap rounded-xl even:bg-primary/75"
                    key={item._id}
                  >
                    <div className="product flex w-full overflow-hidden xs:flex-row flex-col items-center">
                      <Image
                        src={urlFor(item?.image[0])}
                        className="cart-product-image rounded-xl max-h-[200px] max-w-[200px] w-full h-full"
                        alt=""
                        width={200}
                        height={200}
                      />

                      <div className="flex flex-wrap w-full justify-center xs:justify-start h-full xs:ml-4">
                        <div>
                          <h5 className="font-semibold text-xl">{item.name}</h5>
                          <h4 className="text-xl">{item.price}€</h4>
                        </div>
                        <div className="w-full justify-center xs:justify-start flex mt-4 xs:-ml-4 ">
                          <CartQuantityButtons product={item} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex w-full flex-col bg-nav xs:max-w-[680px] ">
              {cartItems.length >= 1 && (
                <>
                  <div className="pt-4">
                    <Disclosure
                      buttonText="How do I test the checkout?"
                      panelText={
                        <p>
                          Fill in the test card number. Other fields can be
                          anything.{" "}
                          <span className="font-bold">
                            Test card number will be copied to clipboard by
                            clicking the checkout button.
                          </span>
                        </p>
                      }
                    />
                  </div>
                  <div className="total">
                    <h3 aria-hidden>Total:</h3>
                    <h3 aria-label="total price">{roundedTotalPrice}€</h3>
                  </div>
                  <div className="btn-container w-full">
                    <button
                      type="button"
                      className="btn"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </>
              )}
              <button
                aria-label="close cart"
                type="button"
                className={`cart-heading py-8 transition-all flex
              duration-100 hover:opacity-50 ss:hidden`}
                onClick={() => {
                  setShowCart((prev) => !prev);
                }}
              >
                <AiOutlineLeft />
                <span className="heading">Items</span>
                <span className="cart-num-items">{totalQuantities}</span>
              </button>
            </div>
          </div>
        </OnClickOutside>
      </OnPopState>
    </div>
  );
}
