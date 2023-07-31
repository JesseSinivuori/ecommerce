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
    <div className="hero-banner-container text-white rounded-xl flex overflow-hidden relative border border-nav leading-[0.9]">
      <div className="hero-banner-gradient"></div>
      <div className="flex flex-col">
        <div className="relative flex-1">
          <div className="flex">
            <h1 className="hero-banner-text-gradient">
              {heroBanner.largeText1}
            </h1>
            <div className="px-4">
              <p
                className={`discount z-[1] absolute right-[62%] top-[40%] rounded-xl border 
                border-red-600 p-2 text-[20px] font-bold text-red-600 xss:right-0 xss:top-0
                xss:mt-[20px]`}
              >
                {heroBanner.smallText}
              </p>
            </div>
          </div>
          <h3 className="relative z-10 ml-[40px] hidden w-[260px] rounded-md bg-emerald-900 font-extralight md:block md:bg-transparent">
            {heroBanner.midText}
          </h3>
        </div>
        <Link href={`/product/${heroBanner.product.toLowerCase()}`}>
          <button type="button">{heroBanner.buttonText}</button>
        </Link>
      </div>
      <Image
        src={urlFor(heroBanner.image)}
        alt={`image of ${heroBanner.product.toLowerCase()}`}
        className="hero-banner-image"
        height={850}
        width={850}
        quality={100}
        priority
      />

      <div className="flex w-full items-end justify-end">
        <h3
          className={`z-[1] relative m-[40px] ss:flex hidden rounded-md bg-emerald-900 p-[10px]
          font-extralight md:hidden md:bg-transparent`}
        >
          {heroBanner.midText}
        </h3>
      </div>
    </div>
  );
}
