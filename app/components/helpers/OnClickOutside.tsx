"use client";
import { useEffect, useRef } from "react";

type OnClickOutsideProps = {
  children: React.ReactNode;
  className?: string;
  condition: boolean;
  onClickOutside: () => void;
};

export default function OnClickOutside(props: OnClickOutsideProps) {
  const { children, className, condition, onClickOutside } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (condition) {
      const handleClickOutSide = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          onClickOutside();
        }
      };
      document.addEventListener("mousedown", handleClickOutSide);
      return () => {
        document.removeEventListener("mousedown", handleClickOutSide);
      };
    }
  }, [ref, onClickOutside, condition]);

  return (
    <div ref={ref} className={className}>
      {children && children}
    </div>
  );
}
