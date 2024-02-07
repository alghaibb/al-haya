import { useContext } from "react";
import {
  WishlistContext,
  WishlistContextType,
} from "../../components/Providers/Wishlist";
import { Button } from "../../components/ui/button";
import { fullProduct } from "@/interface";

interface AddToWishlistProps {
  product: fullProduct;
}

const AddToWishlist: React.FC<AddToWishlistProps> = ({ product }) => {
  const { dispatch } = useContext(WishlistContext) as WishlistContextType;

  if (!dispatch) {
    throw new Error(
      "useContext(WishlistContext) must be used within a WishlistProvider'"
    );
  }

  // Add the product to the wishlist
  const handleAddToWishlist = () => {
    const productToAdd = {
      id: product._id,
      name: product.title,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    };

    dispatch({
      type: "ADD_ITEM",
      payload: productToAdd,
    });
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="addToWishlistBtn"
      onClick={handleAddToWishlist}
    >
      Add To Wishlist
    </Button>
  );
};

export default AddToWishlist;
