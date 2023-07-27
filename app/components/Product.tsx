import Link from "next/link";
import { urlFor } from "../lib/sanityClient";
import Image from "next/image";
import { ProductImageProps } from "./ProductImage";

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

export function Product({ product }: { product: ProductProps }) {
  const { image, name, price, slug } = product;

  return (
    <Link href={`/product/${slug.current}`}>
      <div className="product-card">
        <Image
          src={urlFor(image && image[0])}
          alt={`Image of ${name}`}
          width={300}
          height={300}
          className="product-image"
        />
        <p className="product-name min-w-[200px]sm:w-[300px] w-[200px]">
          {name}
        </p>
        <p className="product-price">{price}€</p>
      </div>
    </Link>
  );
}
