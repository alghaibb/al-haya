/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState, useEffect } from "react";
import {
  WishlistContext,
  WishlistContextType,
} from "../../components/Providers/Wishlist";
import { Button } from "../../components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { FiCheckCircle } from "react-icons/fi";
import { urlFor } from "../../sanityClient";

import "./addtowishlist.styles.css";

interface AddToWishlistProps {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
  slug: string;
}

const AddToWishlist: React.FC<AddToWishlistProps> = ({
  name,
  description,
  price,
  currency,
  image,
  price_id,
  slug,
}) => {
  const { state, dispatch } = useContext(
    WishlistContext
  ) as WishlistContextType;
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Image url from sanity
  const imageUrl = urlFor(image[0]).url();

  useEffect(() => {
    // Check if the product is already in the wishlist
    const isItemInWishlist = state.items.some(
      (item) => item.price_id === price_id
    );
    setIsAdded(isItemInWishlist);
  }, [state.items, price_id]);

  const handleAddToWishlist = async () => {
    if (isAdded) {
      // Redirect to the wishlist page
      navigate("/wishlist");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const productToAdd = {
        name,
        description,
        price,
        currency,
        slug,
        imageUrl,
        price_id,
      };

      console.log("Adding to wishlist:", productToAdd);

      dispatch({
        type: "ADD_ITEM",
        payload: productToAdd,
      });

      setIsAdded(true);
      toast({
        title: `${name} added to your wishlist`,
        duration: 2000,
      });
    }, 1000);
  };

  return (
    <Button
      variant="secondary"
      size="lg"
      className={`addToWishlistBtn ${isAdded ? "addedToWishlist" : ""}`}
      onClick={handleAddToWishlist}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingSpinner />
      ) : isAdded ? (
        <div className="viewInWishlistContainer">
          <FiCheckCircle className="checkmarkIcon" />
          <span>View In Wishlist</span>
        </div>
      ) : (
        "Add To Wishlist"
      )}
    </Button>
  );
};

export default AddToWishlist;
