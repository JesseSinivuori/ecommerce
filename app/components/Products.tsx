"use client";
import { useMemo } from "react";
import { useStateContext } from "../providers/StateContext";
import { Product, ProductProps } from "./index";

export default function Products({ products }: { products: ProductProps[] }) {
  const { category } = useStateContext();

  const filteredProducts = useMemo(() => {
    return category !== "All"
      ? products.filter((product) => product.category === category)
      : products;
  }, [category, products]);

  return (
    <div className={`products-container`}>
      <div className={`flex flex-wrap items-start justify-center`}>
        {filteredProducts.map((item) => (
          <div className="m-[10px]" key={item._id}>
            <Product product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
