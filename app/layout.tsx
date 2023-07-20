import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import StateContext from "./providers/StateContext";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `Jesse's Kitchen`,
  description: "A restaurant themed ecommerce website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} m-auto mt-[60px] flex w-full max-w-[1400px] flex-col justify-center overflow-hidden overflow-y-auto ss:mt-[74px]`}
      >
        <StateContext>
          <div className="fixed left-0 right-0 top-0 z-[9999] ">
            <Navbar />
            <Toaster
              containerClassName={`mt-16 lg:mt-0 z-[9999]`}
              toastOptions={{
                style: {
                  padding: "16px",
                  color: "white",
                  backgroundColor: "#0a0a0a",
                },
              }}
            />
          </div>
          {children}
        </StateContext>
      </body>
    </html>
  );
}
