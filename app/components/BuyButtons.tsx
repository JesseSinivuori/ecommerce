"use client";
import { useStateContext } from "../providers/StateContext";
import { ProductProps } from "./Product";

export default function BuyButtons({ product }: { product: ProductProps }) {
  const { qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div className="ml-0 xss:ml-[-15px] mt-8 xss:mt-0">
      <div className="flex flex-wrap justify-center xss:justify-start xs:flex-nowrap ">
        <button
          type="button"
          className="text-lg m-4 border rounded-md font-medium px-4 py-2 border-red-600 md:w-[200px] w-[150px] text-white hover:scale-110 transition-all duration-100"
          onClick={() => onAdd(product, qty)}
        >
          Add to Cart
        </button>
        <button
          type="button"
          className="text-lg m-4 border rounded-md font-medium px-4 py-2 border-red-900 bg-red-900 md:w-[200px] w-[150px] text-white hover:scale-110 transition-all duration-100"
          onClick={() => handleBuyNow()}
        >
          Order Now
        </button>
      </div>
    </div>
  );
}
