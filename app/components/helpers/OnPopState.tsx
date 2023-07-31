"use client";
import { useEffect } from "react";

type OnPopStateProps = {
  children: React.ReactNode;
  onPopState: () => void;
};

export const OnPopState = ({ children, onPopState }: OnPopStateProps) => {
  useEffect(() => {
    const handlePopstate = () => {
      const timeout = setTimeout(() => {
        onPopState();
      }, 0);
      return clearTimeout(timeout);
    };

    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [onPopState]);

  return <>{children}</>;
};
