import { sanityClient, urlFor } from "../../lib/sanityClient";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  CategoryMenu,
  Products,
  Footer,
  QuantityButtons,
  BuyButtons,
  ProductImage,
  ProductProps,
} from "../../components/index";
import Image from "next/image";
import { getProduct, getProducts } from "@/app/lib/fetch";

export default async function ProductDetails({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const [product, products]: [product: ProductProps, products: ProductProps[]] =
    await Promise.all([getProduct(slug), getProducts()]);
  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-detail-container">
        {image.length > 1 ? (
          <ProductImage image={image} name={name} />
        ) : (
          <div className="image-container">
            <Image
              src={urlFor(image[0])}
              className="product-detail-image"
              alt={`Image of '${name}`}
              height={400}
              width={400}
            />
          </div>
        )}
        <div className="product-detail-desc max-w-full flex-wrap xss:max-w-[410px]">
          <div className="flex justify-start">
            <h3 className="relative mb-4 w-[110px] rounded-xl bg-[#5a7557] p-1 font-extralight">
              Free Delivery
            </h3>
          </div>
          <h1>{name}</h1>
          <div className="reviews">
            <div className="stars">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p></p>
          </div>
          <h4></h4>
          <p>{details}</p>
          <p className="price">{price}€</p>
          <div className="quantity flex-wrap justify-center xss:flex xss:justify-start">
            <div className="justify-start">
              <h3>Quantity: </h3>
            </div>
            <QuantityButtons />
          </div>
          <BuyButtons product={product} />
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>Still hungry?</h2>
        <CategoryMenu products={products} />
        <Products products={products} />
      </div>
      <Footer />
    </div>
  );
}

export const generateStaticParams = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;
  const products = await sanityClient.fetch(query);
  const params = products.map((product: ProductProps) => ({
    slug: product.slug.current,
  }));
  return params;
};
