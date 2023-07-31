import { createClient } from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";
import { ProductImageProps } from "../components/ProductImage";

export const sanityClient = createClient({
  projectId: "y2w5k2uh",
  dataset: "production",
  apiVersion: "2022-02-19",
  useCdn: true,
  token: process.env.SANITY_TOKEN,
});

const builder = ImageUrlBuilder(sanityClient);

export const urlFor = (source: ProductImageProps) =>
  builder.image(source).toString().toLowerCase();
