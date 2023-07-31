"use client";
import { useStateContext } from "../providers/StateContext";
import { ProductProps } from "./Product";
import QuantityButtons from "./QuantityButtons";

export default function CartQuantityButtons({
  product,
}: {
  product: ProductProps;
}) {
  const { toggleCartItemQuantity, onRemove } = useStateContext();
  return (
    <QuantityButtons
      product={product}
      decQty={() => {
        if (product.quantity === 1) return onRemove(product);
        toggleCartItemQuantity(product._id, "dec");
      }}
      incQty={() => toggleCartItemQuantity(product._id, "inc")}
      qty={product.quantity}
    />
  );
}
