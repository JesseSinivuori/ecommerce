"use client";
import React, { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { ProductProps } from "../components";

const Context = createContext<any>(null);

export interface CartItemProps {
  category: string;
  price: number;
  quantity: number;
  _id: string;
}

export default function StateContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    getLocalStorage(setCartItems, setTotalPrice, setTotalQuantities);
  }, []);

  const findCartItemById = (id: string) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    return foundProduct;
  };

  const onAdd = (product: ProductProps, quantity: number) => {
    const productIsInCart = findCartItemById(product._id);

    const updatedTotalPrice = totalPrice + product.price * quantity;
    setTotalPrice(updatedTotalPrice);

    const updatedTotalQuantities = totalQuantities + quantity;
    setTotalQuantities(updatedTotalQuantities);

    if (productIsInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        const updatedProduct = {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity,
        };
        return cartProduct._id === product._id ? updatedProduct : cartProduct;
      });
      setLocalStorage(
        updatedCartItems,
        updatedTotalPrice,
        updatedTotalQuantities
      );
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      const updatedCartItems = [...cartItems, { ...product }];
      setLocalStorage(
        updatedCartItems,
        updatedTotalPrice,
        updatedTotalQuantities
      );
      setCartItems(updatedCartItems);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product: ProductProps) => {
    const foundProduct = findCartItemById(product._id);
    if (!foundProduct) {
      console.error("Product was not found.");
      toast.error("Product was not found.");
      return;
    }

    const updatedCartItems = cartItems.filter(
      (item) => item._id !== product._id
    );

    const updatedTotalPrice =
      totalPrice - foundProduct.price * foundProduct.quantity;
    setTotalPrice(updatedTotalPrice);

    const updatedTotalQuantities = totalQuantities - foundProduct.quantity;
    setTotalQuantities(updatedTotalQuantities);

    setLocalStorage(
      updatedCartItems,
      updatedTotalPrice,
      updatedTotalQuantities
    );
    setCartItems(updatedCartItems);
  };

  const toggleCartItemQuantity = (id: string, value: "inc" | "dec") => {
    const foundProduct = findCartItemById(id);
    if (!foundProduct) {
      console.error("Product was not found.");
      toast.error("Product was not found.");
      return;
    }

    if (value === "inc") {
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      setCartItems(updatedCartItems);

      const updatedTotalPrice = totalPrice + foundProduct.price;
      setTotalPrice(updatedTotalPrice);

      const updatedTotalQuantities = totalQuantities + 1;
      setTotalQuantities(updatedTotalQuantities);

      setLocalStorage(
        updatedCartItems,
        updatedTotalPrice,
        updatedTotalQuantities
      );
    } else if (value === "dec")
      if (foundProduct.quantity > 1) {
        const updatedCartItems = cartItems.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
        setCartItems(updatedCartItems);

        const updatedTotalPrice = totalPrice - foundProduct.price;
        setTotalPrice(updatedTotalPrice);

        const updatedTotalQuantities = totalQuantities - 1;
        setTotalQuantities(updatedTotalQuantities);

        setLocalStorage(
          updatedCartItems,
          updatedTotalPrice,
          updatedTotalQuantities
        );
      }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setQty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        category,
        setCategory,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useStateContext() {
  return useContext(Context);
}

export const getLocalStorage = (
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>,
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>,
  setTotalQuantities: React.Dispatch<React.SetStateAction<number>>
) => {
  if (typeof window === "undefined") {
    throw new Error("getLocalStorage should be used on client only");
  }
  const context = JSON.parse(localStorage.getItem("context") ?? "{}");
  if (context !== "{}") {
    setCartItems(context.cartItems ?? []);
    setTotalPrice(context.totalPrice ?? 0);
    setTotalQuantities(context.totalQuantities ?? 0);
  }
};

export const setLocalStorage = (
  cartItems: any,
  totalPrice: number,
  totalQuantities: number
) => {
  if (typeof window === "undefined") {
    throw new Error("setLocalStorage should be used on client only");
  }
  localStorage.setItem(
    "context",
    JSON.stringify({
      cartItems: cartItems,
      totalPrice: totalPrice,
      totalQuantities: totalQuantities,
    })
  );
};
