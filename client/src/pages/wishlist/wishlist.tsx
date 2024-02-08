import { useContext } from "react";
import { Link } from "react-router-dom";

import { WishlistContext } from "@/components/Providers/Wishlist";
import { useShoppingCart } from "use-shopping-cart";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import AlertDialog from "../../components/AlertDialog";

import "./wishlist.styles.css";

const WishlistPage = () => {
  const {
    state: { items },
    dispatch,
  } = useContext(WishlistContext) || {
    state: { items: [] },
    dispatch: () => {},
  };
  const { toast } = useToast();
  const { addItem } = useShoppingCart();

  const isEmpty = items.length === 0;

  // Function to remove an item from the wishlist
  const handleRemoveItem = (itemId: string, name: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id: itemId } });
    toast({
      title: `${name}`,
      description: "This product has been removed from your wishlist.",
    });
  };

  // Function to add all items to cart
  const handleAddAllToCart = () => {
    items.forEach((item) => {
      addItem({
        name: item.name,
        description: item.description,
        price: item.price,
        currency: item.currency?.toLocaleString() || "AUD",
        image: item.imageUrl,
        price_id: item.price_id,
        slug: item.slug,
      });
    });
    toast({
      title: "All items",
      description: "All items in your wishlist have been added to your cart.",
    });
  };

  // Function to clear the wishlist
  const clearWishlist = () => {
    dispatch({ type: "CLEAR" });
    toast({
      title: "Wishlist cleared",
      description: "Your wishlist has been successfully cleared.",
    });
  };

  const EmptyWishlist = () => (
    <div className="emptyWishlistContainer">
      <p>
        Your wishlist is empty. <Link to="/products">Click here</Link> to browse
        products.
      </p>
    </div>
  );

  const FilledWishlist = () => (
    <div className="filledWishlistContainer">
      <ul className="wishlistListContainer">
        {items.map((item) => (
          <li key={item.price_id} className="wishlistListItem">
            <Link to={`/product/${item.slug}`}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="wishlistItemImage"
              />
            </Link>
            <div className="wishlistItemDetails">
              <h3 className="wishlistItemTitle">{item.name}</h3>
              <button
                className="wishlistItemRemove"
                onClick={() => handleRemoveItem(item.price_id, item.name)}
              >
                Remove
              </button>
            </div>
            <p className="WishlistItemPrice">${item.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="wishlistPageContainer">
      <h3 className="wishlistPageTitle">Wishlist</h3>
      {isEmpty ? <EmptyWishlist /> : <FilledWishlist />}
      {!isEmpty && (
        <>
          <Button className="addAllToCartBtn" onClick={handleAddAllToCart}>
            Add all to cart
          </Button>
          <AlertDialog
            btnName="Clear Wishlist"
            onConfirm={() => clearWishlist()}
            title="Clear the Wishlist?"
            description="Are you sure you want to remove all items from your wishlist? This action cannot be undone."
          />
        </>
      )}
      <div className="continueContainer">
        <h1>Continue Exploring</h1>
        <p>Discover more amazing products to add to your wishlist.</p>
        <Link to="/">
          <Button className="continueBtn">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default WishlistPage;
