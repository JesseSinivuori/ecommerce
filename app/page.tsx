import { CategoryMenu, HeroBanner, Products, Footer } from "./components/index";
import { getBannerData, getProducts } from "./lib/fetch";

export default async function Home() {
  const [products, bannerData]: any = await Promise.all([
    getProducts(),
    getBannerData(),
  ]);

  return (
    <>
      <HeroBanner heroBanner={bannerData[0]} />
      <div className="products-heading">
        <h2>Menu</h2>
        <CategoryMenu products={products} />
      </div>
      <Products products={products} />
      <Footer />
    </>
  );
}
