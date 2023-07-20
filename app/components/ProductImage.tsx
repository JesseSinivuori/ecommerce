"use client";
import Image from "next/image";
import { urlFor } from "../lib/sanityClient";
import { useEffect, useState } from "react";
import { useStateContext } from "../providers/StateContext";

export interface ProductImageProps {
  image: {
    _type: string;
    _key: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

export function ProductImage({
  image,
  name,
}: {
  image: ProductImageProps[];
  name: string;
}) {
  const { setQty }: any = useStateContext();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setQty(1);
    setIndex(0);
  }, [setQty]);

  return (
    <div>
      <div className="image-container">
        <Image
          src={urlFor(image[index])}
          className="product-detail-image"
          alt={`Image of ' ${name}`}
          height={400}
          width={400}
        />
      </div>
      {image?.length > 1 && (
        <div className="small-images-container">
          {image?.map((item: any, i: number) => (
            <Image
              width={200}
              height={200}
              key={item._id}
              src={urlFor(item)}
              className={
                i === index ? "small-image selected-image" : "small-image"
              }
              alt={`Image of ' ${name}`}
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
