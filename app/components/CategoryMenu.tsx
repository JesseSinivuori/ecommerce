"use client";
import { useState } from "react";
import styles from "../style";
import { ProductProps } from "./Product";
import { useStateContext } from "../providers/StateContext";

export default function CategoryMenu({
  products,
}: {
  products: ProductProps[];
}) {
  const { category, setCategory } = useStateContext();
  const allCategories = products.map((product) => product.category);
  const uniqueCategories = [...new Set(allCategories)];
  const categories = ["All", ...uniqueCategories];

  return (
    <div className={`${styles.flexCenter} mt-8 flex-col`}>
      <div
        className={`m-2 flex h-full max-h-[176px] w-full min-w-[240px]
        flex-wrap justify-center overflow-auto py-8 text-white`}
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
