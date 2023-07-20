import { CategoryMenu, HeroBanner, Products, Footer } from "./components/index";
import { sanityClient } from "./lib/sanityClient";

const getProducts = async () => {
  const query = '*[_type == "product"]';
  const products = await sanityClient.fetch(query);
  return products;
};

const getBannerData = async () => {
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await sanityClient.fetch(bannerQuery);
  return bannerData;
};

export default async function Home() {
  const [products, bannerData]: any = await Promise.all([
    getProducts(),
    getBannerData(),
  ]);

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Menu</h2>
        <p></p>
        <CategoryMenu products={products} />
      </div>
      <Products products={products} />
      <Footer />
    </>
  );
}
