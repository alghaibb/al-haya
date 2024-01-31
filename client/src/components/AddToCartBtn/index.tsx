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
}

const AddToCart = ({
  name,
  description,
  price,
  currency,
  image,
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
    id: "asdasd",
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: imageUrl,
  };

  return (
    <Button
      size="lg"
      className="addToCartBtn"
      onClick={() => {
        addItem(product);
        toast({
          title: `${name} has added to your cart`,
          description:
            "You can view your cart by clicking the cart icon in the top right corner",
          duration: 2000,
        });
      }}
    >
      Add To Cart
    </Button>
  );
};

export default AddToCart;
