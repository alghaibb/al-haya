import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const client = createClient({
  projectId: "ysf3fo80",
  dataset: "production",
  apiVersion: "2022-03-07",
  useCdn: true
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export default client;
