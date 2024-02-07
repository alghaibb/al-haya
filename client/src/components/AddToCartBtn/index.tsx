/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { useToast } from "@/components/ui/use-toast";
import client, { urlFor } from "../../sanityClient";
import { FiCheckCircle } from "react-icons/fi";
import LoadingSpinner from "../LoadingSpinner";

import "./addtocart.styles.css";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
}

async function fetchProductSlug(priceId: string) {
  const query = `*[ _type == "product" && price_id == "${priceId}"]{
    "slug": slug.current
  }`;

  const params = { priceId };

  try {
    const data = await client.fetch(query, params);
    if (data && data.length > 0) {
      return data[0].slug; // Return the slug
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error("Failed to fetch product slug:", error);
    return ""; // Return a default or empty string if the slug can't be fetched
  }
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
  const { addItem, cartDetails, handleCartClick } = useShoppingCart();
  const [addedToCart, setAddedToCart] = useState(false);

  // useState hooks
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to get the URL for a single image
  const getImageUrl = (imageData: any) => {
    try {
      return urlFor(imageData).url();
    } catch (error) {
      console.error("Error generating image URL:", error);
      return "";
    }
  };

  let imageUrl = "";
  if (Array.isArray(image) && image.length > 0) {
    imageUrl = getImageUrl(image[0]);
  } else {
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

  useEffect(() => {
    // Check if the product is already in the cart when the component mounts
    if (cartDetails?.[price_id]) {
      // If the product is already in the cart, set addedToCart to true
      setAddedToCart(true);
    } else {
      // If the product is not in the cart, set addedToCart to false
      setAddedToCart(false);
    }
  }, [cartDetails, price_id]);

  // Function to handle adding the product to the cart
  const handleAddToCart = async () => {
    // Set loading state to true
    setIsLoading(true);
    const slug = await fetchProductSlug(price_id);

    setTimeout(() => {
      setIsLoading(false);
      const productWithSlug = {
        ...product,
        slug,
      };

      addItem(productWithSlug);
      setAddedToCart(true);
      toast({
        title: `${name} has been added to your cart`,
        duration: 2000,
      });
    }, 2000);
  };

  return (
    <Button
      size="lg"
      className={`addToCartBtn ${addedToCart ? "addedToCart" : ""}`}
      onClick={() => {
        if (addedToCart) {
          handleCartClick(); // Clicking "View In Cart" will open the cart
        } else {
          // If the item is not in the cart, add it
          handleAddToCart();
        }
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : addedToCart ? (
        <div className="viewInCartContainer">
          <FiCheckCircle className="checkmarkIcon" />
          View In Cart
        </div>
      ) : (
        "Add To Cart"
      )}
    </Button>
  );
};

export default AddToCart;
