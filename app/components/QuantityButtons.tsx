"use client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ProductProps } from "./Product";

export default function QuantityButtons({
  product,
  decQty,
  incQty,
  qty,
}: {
  product: ProductProps;
  decQty: () => void;
  incQty: () => void;
  qty: number;
}) {
  return (
    <div>
      <span className="quantity-desc flex items-center">
        <button
          type="button"
          aria-label={`remove one ${product.name}`}
          className="minus"
          onClick={decQty}
        >
          <AiOutlineMinus />
        </button>
        <span aria-label={`${product.name} quantity`} className="px-8 w-20">
          {qty}
        </span>
        <button
          type="button"
          aria-label={`add one ${product.name}`}
          className="plus"
          onClick={incQty}
        >
          <AiOutlinePlus />
        </button>
      </span>
    </div>
  );
}
