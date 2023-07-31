import { ProductProps } from "../components";
import { sanityClient } from "./sanityClient";

export const getProducts = async (): Promise<ProductProps[]> => {
  try {
    const query = '*[_type == "product"]';
    const products = await sanityClient.fetch(query, {
      next: { revalidate: 600 },
    });
    return products;
  } catch (error) {
    throw new Error("Fetching products failed.");
  }
};

export const getProduct = async (slug: string) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await sanityClient.fetch(query, {
    next: { revalidate: 600 },
  });
  return product;
};

export const getBannerData = async () => {
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await sanityClient.fetch(bannerQuery, {
    next: { revalidate: 600 },
  });
  return bannerData;
};
