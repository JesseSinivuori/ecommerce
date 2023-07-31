"use client";
import { useEffect } from "react";
import { QuantityButtons } from "./index";
import { ProductProps } from "./Product";
import { useStateContext } from "../providers/StateContext";

export default function ProcuctQuantityButtons({
  product,
}: {
  product: ProductProps;
}) {
  const { setQty, decQty, incQty, qty } = useStateContext();

  useEffect(() => {
    setQty(1);
  }, [setQty]);

  return (
    <QuantityButtons
      product={product}
      decQty={decQty}
      incQty={incQty}
      qty={qty}
    />
  );
}
