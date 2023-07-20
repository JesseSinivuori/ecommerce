"use client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "../providers/StateContext";

export default function QuantityButtons() {
  const { decQty, incQty, qty }: any = useStateContext();
  return (
    <div>
      <span className="quantity-desc xss:w-[140px] xs:w-[160px] w-[110px]">
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
