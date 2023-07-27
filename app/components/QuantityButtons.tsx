"use client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "../providers/StateContext";
import { useEffect } from "react";
import { ProductProps } from "./Product";

export default function QuantityButtons({
  product,
}: {
  product: ProductProps;
}) {
  const { decQty, incQty, qty, setQty } = useStateContext();

  useEffect(() => {
    setQty(1);
  }, [setQty]);

  return (
    <div>
      <span className="quantity-desc w-[110px] xss:w-[140px] xs:w-[160px]">
        <button
          type="button"
          aria-label={`decrease ${product.name} quantity by one`}
          className="minus"
          onClick={decQty}
        >
          <AiOutlineMinus />
        </button>
        <span aria-label={`${product.name} quantity`} className="num">
          {qty}
        </span>
        <button
          type="button"
          aria-label={`increase ${product.name} quantity by one`}
          className="plus"
          onClick={incQty}
        >
          <AiOutlinePlus />
        </button>
      </span>
    </div>
  );
}
