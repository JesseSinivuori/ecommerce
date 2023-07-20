"use client";
import { useStateContext } from "../providers/StateContext";

export default function BuyButtons({ product }: { product: any }) {
  const { qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div className="buttons ml-0 max-w-full xss:ml-[-15px]">
      <div className="flex items-center justify-center xss:justify-start">
        <div className="flex flex-wrap justify-center xss:justify-start xs:flex-nowrap">
          <button
            type="button"
            className="add-to-cart m-4"
            onClick={() => onAdd(product, qty)}
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="buy-now m-4"
            onClick={() => handleBuyNow()}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
