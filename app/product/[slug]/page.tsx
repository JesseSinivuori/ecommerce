import { sanityClient } from "../../lib/sanityClient";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  CategoryMenu,
  Products,
  Footer,
  QuantityButtons,
  BuyButtons,
  ProductImage,
} from "../../components/index";

export const generateStaticParams = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;
  const products = await sanityClient.fetch(query);
  const paths = products.map((product: any) => ({
    slug: product.slug.current,
  }));

  return paths;
};

const getProducts = async () => {
  const productsQuery = '*[_type == "product"]';
  const products = await sanityClient.fetch(productsQuery);
  return products;
};

const getProduct = async (slug: string) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await sanityClient.fetch(query);
  return product;
};

export default async function ProductDetails({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const [product, products] = await Promise.all([
    getProduct(slug),
    getProducts(),
  ]);
  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-detail-container">
        <ProductImage image={image} name={name} />
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
          <p className="">{details}</p>
          <p className="price">{price}€</p>
          <div className="quantity flex-wrap justify-center xss:flex xss:justify-start">
            <div className="justify-start">
              <h3 className="">Quantity: </h3>
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
