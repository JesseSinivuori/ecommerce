"use client";
import { useMemo } from "react";
import { useStateContext } from "../providers/StateContext";
import Product, { type ProductProps } from "./Product";

export default function Products({ products }: { products: ProductProps[] }) {
  const { category } = useStateContext();

  const filteredProducts = useMemo(() => {
    return category !== "All"
      ? products.filter((product) => product.category === category)
      : products;
  }, [category, products]);

  return (
    <div className="flex flex-wrap justify-center">
      {filteredProducts.map((item) => (
        <div className="m-4" key={item._id}>
          <Product product={item} />
        </div>
      ))}
    </div>
  );
}
