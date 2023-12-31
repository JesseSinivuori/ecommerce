import { sanityClient, urlFor } from "../../lib/sanityClient";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  CategoryMenu,
  Products,
  Footer,
  BuyButtons,
  ProductImage,
  ProductProps,
  ProcuctQuantityButtons,
} from "../../components/index";
import { getProduct, getProducts } from "@/app/lib/fetch";
import { Metadata } from "next";
import styles from "@/app/style";

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
      <div className="text-white overflow-hidden p-8 gap-8 flex flex-wrap justify-center md:justify-start">
        <ProductImage image={image} name={name} />
        <div className="product-detail-desc max-w-full flex-wrap xss:max-w-[410px]">
          <div className="flex justify-start">
            <h3 className="relative mb-4  rounded-md bg-emerald-900 py-1 px-2 font-extralight">
              Free Delivery
            </h3>
          </div>
          <h1 className="text-3xl">{name}</h1>
          <div className="reviews">
            <div className="stars">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
          </div>
          <p className="text-white/75 ">{details}</p>
          <p className="price">{price}€</p>
          <div className="quantity flex-wrap justify-center xss:flex xss:justify-start">
            <div className="justify-start">
              <h3>Quantity: </h3>
            </div>
            <ProcuctQuantityButtons product={product} />
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

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0] {
    name,
    details,
    image
  }`;

  const product: ProductProps = await sanityClient.fetch(query);

  const metadata: Metadata = {
    title: `${product.name} - ${product.details}`,
    description: product.details,
    openGraph: {
      title: product.name,
      description: product.details,
      images: [urlFor(product.image[0])],
    },
  };

  return metadata;
};
