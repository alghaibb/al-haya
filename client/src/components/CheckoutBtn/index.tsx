/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../../sanityClient";
import { ProductCart } from "../AddToCartBtn";

const CheckoutNow = ({
  name,
  description,
  price,
  currency,
  image,
  price_id,
}: ProductCart) => {
  const { checkoutSingleItem } = useShoppingCart();

  function buyNow(priceId: string) {
    checkoutSingleItem(priceId);
  }

  // Helper function to get the URL for a single image
  const getImageUrl = (imageData: any) => {
    try {
      return urlFor(imageData).url();
    } catch (error) {
      console.error("Error generating image URL:", error);
      return ""; // Replace with a default image URL or handle accordingly
    }
  };

  // Assuming `image` is an array, handle it accordingly
  let imageUrl = "";
  if (Array.isArray(image) && image.length > 0) {
    // Example: Get the URL of the first image in the array
    imageUrl = getImageUrl(image[0]);
  } else {
    // If `image` is not an array or is empty, handle accordingly
    console.error("Invalid image data:", image);
  }

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: imageUrl,
    price_id: price_id,
  };

  return (
    <Button
      size="lg"
      className="checkoutNowBtn"
      onClick={() => {
        buyNow(product.price_id);
      }}
    >
      Checkout Now
    </Button>
  );
};

export default CheckoutNow;
