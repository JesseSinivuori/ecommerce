"use client";
import { useEffect, useRef } from "react";

type OnClickOutsideProps = {
  children: React.ReactNode;
  condition?: boolean;
  onClickOutside: () => void;
};

export const OnClickOutside = (props: OnClickOutsideProps) => {
  const { children, condition, onClickOutside } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (e: MouseEvent) => {
      if (condition && !ref.current?.contains(e.target as Node)) {
        onClickOutside();
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [ref, onClickOutside, condition]);

  return <div ref={ref}>{children}</div>;
};
