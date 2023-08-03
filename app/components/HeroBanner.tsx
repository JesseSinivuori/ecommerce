import Link from "next/link";
import { urlFor } from "../lib/sanityClient";
import Image from "next/image";
import { ProductImageProps } from "./ProductImage";

interface HeroBannerProps {
  buttonText: string;
  image: ProductImageProps;
  largeText1: string;
  _createdAt: string;
  midText: string;
  _updatedAt: string;
  product: string;
  _rev: string;
  _type: string;
  _id: string;
  smallText: string;
}

export default function HeroBanner({
  heroBanner,
}: {
  heroBanner: HeroBannerProps;
}) {
  return (
    <div className="w-full flex-1 xs:min-h-[450px] min-h-[350px] flex-row text-white rounded-xl flex overflow-hidden relative border border-nav leading-[0.9]">
      <div className="bg-gradient-to-br from-transparent to-red-600 from-[25%] absolute w-full h-full blur-3xl opacity-75"></div>
      <div className="flex flex-col z-[1] md:m-4">
        <div className="flex-1">
          <div className="flex flex-col xs:flex-row">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-600 form-[0%] via-[25%] to-[50%] via-orange-600 to-red-600 xss:text-7xl text-5xl font-semibold xs:p-8 px-8 pt-8 z-[1] flex">
              {heroBanner.largeText1}
            </h1>
            <div className="px-8 z-[1] flex items-start">
              <span
                className={`flex  z-[1] mt-4 xs:-ml-20 rounded-full border 
                border-red-600 p-2 text-[20px] font-bold xs:text-xl text-md text-red-600 
                `}
              >
                {heroBanner.smallText}
              </span>
            </div>
          </div>
          <h2 className="relative z-[1] ml-8 text-4xl hidden w-[260px] rounded-md bg-emerald-900 font-extralight md:flex bg-transparent">
            {heroBanner.midText}
          </h2>
        </div>
        <div className="flex relative">
          <div className="bg-gradient-to-r from-primary w-full h-full absolute blur-xl rounded-full"></div>
          <Link
            href={`/product/${heroBanner.product.toLowerCase()}`}
            className="text-lg rounded-md px-4 py-2 z-[1] m-8 border-red-900 bg-red-900 transition-all
          duration-300 hover:border-red-600 hover:bg-transparent border"
          >
            {heroBanner.buttonText}
          </Link>
        </div>
      </div>
      <Image
        src={urlFor(heroBanner.image)}
        alt=""
        className="hero-banner-image"
        height={850}
        width={850}
        quality={100}
        priority
      />

      <div className="flex w-full items-end justify-end relative">
        <h2
          className={`z-[1] absolute whitespace-nowrap m-8 text-lg xs:flex hidden rounded-md border border-emerald-900 bg-emerald-900 px-4 py-2
          font-light md:hidden `}
        >
          {heroBanner.midText}
        </h2>
      </div>
    </div>
  );
}
