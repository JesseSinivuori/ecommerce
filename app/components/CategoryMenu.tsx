"use client";
import styles from "../style";
import { ProductProps } from "./Product";
import { useStateContext } from "../providers/StateContext";
import { useMemo } from "react";

export default function CategoryMenu({
  products,
}: {
  products: ProductProps[];
}) {
  const { category, setCategory } = useStateContext();
  const categories = useMemo(() => {
    const allCategories = products.map((product) => product.category);
    const uniqueCategories = [...new Set(allCategories)];
    const categories = ["All", ...uniqueCategories];
    return categories;
  }, [products]);

  return (
    <div className={`${styles.flexCenter} flex-col`}>
      <div
        className={`max-w-screen m-2 flex h-full w-full 
        flex-row justify-start overflow-x-auto py-8 text-white xss:flex-wrap xss:justify-center`}
      >
        {categories.map((item) => (
          <button
            type="button"
            className={`m-2 mx-2 rounded-xl border border-primary px-4 py-2 transition-all duration-100
          ${
            category === item
              ? " bg-white text-primary"
              : "bg-primary hover:border-white hover:text-white"
          }`}
            key={item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
