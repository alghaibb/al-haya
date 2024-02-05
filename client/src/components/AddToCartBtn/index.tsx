/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { useToast } from "@/components/ui/use-toast";
import { urlFor } from "../../sanityClient";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
}

const AddToCart = ({
  name,
  description,
  price,
  currency,
  image,
  price_id,
}: ProductCart) => {
  const { toast } = useToast();
  const { addItem } = useShoppingCart();

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
      className="addToCartBtn"
      onClick={() => {
        addItem(product);
        toast({
          title: `${name} has been added to your cart`,
          duration: 2000,
        });
      }}
    >
      Add To Cart
    </Button>
  );
};

export default AddToCart;
