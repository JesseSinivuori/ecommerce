"use client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "../providers/StateContext";
import { useEffect } from "react";

export default function QuantityButtons() {
  const { decQty, incQty, qty, setQty } = useStateContext();

  useEffect(() => {
    setQty(1);
  }, [setQty]);

  return (
    <div>
      <span className="quantity-desc w-[110px] xss:w-[140px] xs:w-[160px]">
        <span className="minus" onClick={decQty}>
          <AiOutlineMinus />
        </span>
        <span className="num">{qty}</span>
        <span className="plus" onClick={incQty}>
          <AiOutlinePlus />
        </span>
      </span>
    </div>
  );
}
