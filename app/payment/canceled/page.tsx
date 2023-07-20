"use client";
import Link from "next/link";
import { BsBagX } from "react-icons/bs";
import { getLocalStorage, useStateContext } from "../../providers/StateContext";
import React, { useEffect } from "react";

export default function Canceled() {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    getLocalStorage(setCartItems, setTotalPrice, setTotalQuantities);
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className={`cancel-wrapper flex`}>
      <div className="cancel">
        <span className="icon">
          <BsBagX />
        </span>
        <h2>Your order was canceled.</h2>
        <p className="description">
          If you have any questions, please email <br />
          <a className="email" href="mailto:purchase@example.com">
            purchase@example.com
          </a>
        </p>
        <Link href={"/"}>
          <button type="button" className="btn w-[300px]">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
