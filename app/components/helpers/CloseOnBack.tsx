"use client";
import { useEffect } from "react";

type CloseOnBackProps = {
  children: React.ReactNode;
  toggleState: boolean;
  setToggleState: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CloseOnBack({
  children,
  toggleState,
  setToggleState,
}: CloseOnBackProps) {
  useEffect(() => {
    const handlePopstate = () => {
      const timeout = setTimeout(() => {
        setToggleState(false);
      }, 0);
      return () => clearTimeout(timeout);
    };

    if (toggleState) {
      window.addEventListener("popstate", handlePopstate);
      return () => {
        window.removeEventListener("popstate", handlePopstate);
      };
    }
  }, [toggleState, setToggleState]);

  return <>{children}</>;
}
