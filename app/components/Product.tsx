import Link from "next/link";
import { urlFor } from "../lib/sanityClient";
import Image from "next/image";
import { ProductImageProps } from "./ProductImage";
import styles from "../style";

export interface ProductProps {
  _updatedAt: string;
  image: ProductImageProps[];
  _rev: string;
  _type: string;
  name: string;
  details: string;
  _id: string;
  category: string;
  slug: { current: string; _type: string };
  price: number;
  _createdAt: string;
  quantity: number;
}

export default function Product({ product }: { product: ProductProps }) {
  const { image, name, price, slug } = product;

  return (
    <Link href={`/product/${slug.current}`}>
      <div
        className={`m-4 cursor-pointer transition-all duration-100 hover:scale-110`}
      >
        <Image
          src={urlFor(image && image[0])}
          alt=""
          width={300}
          height={300}
          className="rounded-xl object-contain"
        />
        <p className="pt-2 w-[200px] min-w-[200px] text-white text-xl sm:w-[300px]">
          {name}
        </p>
        <p className={`text-white/75 font-extralight text-lg `}>{price}€</p>
      </div>
    </Link>
  );
}
