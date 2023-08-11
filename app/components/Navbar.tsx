"use client";
import { SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStateContext } from "../providers/StateContext";
import { AiOutlineShopping } from "react-icons/ai";
import { OnClickOutside, OnPopState, Cart } from "../components/index";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const pathname = usePathname();

  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);

  const [navStyles, setNavStyles] = useState(
    "bg-primary/0 backdrop-blur-[0px]"
  );

  useEffect(() => {
    const handleScroll = () => {
      if (scrollY > 0) {
        setNavStyles(`bg-primary/50 backdrop-blur-[25px]`);
      } else {
        setNavStyles(`bg-primary/0 backdrop-blur-[0px]`);
      }
    };

    addEventListener("scroll", handleScroll);
    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }),
    [setNavStyles];

  useEffect(() => {
    if (toggleMobileMenu) {
      const checkWidth = () => {
        if (window.document.body.offsetWidth > 620) {
          setToggleMobileMenu(false);
        }
      };
      addEventListener("resize", checkWidth);
      return () => {
        removeEventListener("resize", checkWidth);
      };
    }
  }, [toggleMobileMenu]);

  const linkStyle = (currentPathname: string): string => {
    return pathname === currentPathname
      ? "text-white/50"
      : `cursor-pointer select-none text-[16px] text-white/75
      hover:text-white text-white duration-100 ease-in-out `;
  };

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-[9999]
      select-none overscroll-none rounded-b-xl 
      ${showCart ? "h-full w-full ss:backdrop-blur-[25px]" : ""}`}
    >
      <div
        className={`m-auto ${navStyles} max-w-[1400px]  rounded-b-xl ${
          showCart && "ss:blur"
        } transition-all duration-300`}
      >
        <nav>
          <div className="flex w-full items-center gap-4 px-8 py-4">
            <div className="flex flex-1">
              <HomeLogo />
            </div>
            <div className="hidden justify-end gap-4 xs:flex">
              <NavLinks linkStyle={linkStyle} />
            </div>
            <div className="flex justify-end xs:hidden">
              <MobileMenu
                toggleMobileMenu={toggleMobileMenu}
                setToggleMobileMenu={setToggleMobileMenu}
              >
                <div className="space-y-4">
                  <NavLinks linkStyle={linkStyle} />
                </div>
              </MobileMenu>
            </div>
            <CartIcon
              showCart={showCart}
              setShowCart={setShowCart}
              totalQuantities={totalQuantities}
            />
          </div>
        </nav>
      </div>
      <Cart />
    </div>
  );
}

const NavLinks = ({
  linkStyle,
}: {
  linkStyle: (pathname: string) => string;
}) => (
  <>
    <Link href={"/"} className={`${linkStyle("/")} p-2 `}>
      Home
    </Link>

    <ContactLink />
  </>
);

const HomeLogo = () => (
  <Link
    aria-label="go to home"
    href={"/"}
    className="flex rounded-full bg-transparent p-2 font-light text-white hover:opacity-50"
  >
    <span className={"text-white"}>.</span>j
    <span className="text-red-600">s</span>
  </Link>
);

const ContactLink = () => (
  <Link
    href={"https://portfolio-jessesinivuori.vercel.app/contact"}
    className={`flex cursor-pointer select-none
    rounded-md border-[1px] border-red-600 
    p-2 text-[16px] text-white duration-100 
    ease-in-out hover:text-red-600`}
  >
    Contact
  </Link>
);

const CartIcon = ({
  setShowCart,
  totalQuantities,
  showCart,
}: {
  setShowCart: React.Dispatch<SetStateAction<boolean>>;
  totalQuantities: number;
  showCart: boolean;
}) => {
  return (
    <button
      aria-label="toggle cart"
      aria-expanded={showCart ? "true" : "false"}
      type="button"
      className={`cart-icon flex hover:opacity-50`}
      onClick={() => {
        setShowCart((prev) => !prev);
      }}
    >
      <AiOutlineShopping />
      <span className="cart-item-qty">{totalQuantities}</span>
    </button>
  );
};

const MobileMenu = ({
  toggleMobileMenu,
  setToggleMobileMenu,
  children,
}: {
  toggleMobileMenu: boolean;
  setToggleMobileMenu: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) => (
  <div className={`relative flex w-[28px] cursor-pointer `}>
    <button
      type="button"
      onClick={() => setToggleMobileMenu((prev) => !prev)}
      aria-label="toggle mobile menu"
      aria-expanded={toggleMobileMenu ? "true" : "false"}
    >
      <Image
        src={toggleMobileMenu ? "/close.svg" : "/menu.svg"}
        alt=""
        className={`h-[28px] w-[28px] object-contain hover:opacity-50
              ${
                toggleMobileMenu ? "rotate-180" : ""
              }  transition-all duration-100`}
        height={28}
        width={28}
        priority
      />
    </button>
    <div
      data-testid="mobile-menu"
      className={`fixed right-0 top-0 h-screen overflow-x-clip overflow-y-scroll px-4 transition-all duration-300
                ${!toggleMobileMenu && "hidden"}`}
    >
      <OnPopState onPopState={() => setToggleMobileMenu(false)}>
        <div
          className={`mr-4 mt-20 flex max-h-full`}
          onClick={() => setToggleMobileMenu(false)}
        >
          <OnClickOutside
            condition={toggleMobileMenu}
            onClickOutside={() => {
              setToggleMobileMenu(false);
            }}
          >
            <div className="w-full min-w-[160px] list-none flex-col items-center rounded-md bg-nav p-2">
              {children}
            </div>
          </OnClickOutside>
        </div>
      </OnPopState>
    </div>
  </div>
);
