import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { Link } from "react-router-dom";

import { useToast } from "../../components/ui/use-toast";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "../../components/LoadingSpinner";
import QuantitySelector from "@/components/QuantitySelector";
import AlertDialog from "../../components/AlertDialog";

import "./cartpage.styles.css";

const CartPage = () => {
  const {
    cartDetails,
    redirectToCheckout,
    cartCount,
    removeItem,
    totalPrice,
    setItemQuantity,
    clearCart,
  } = useShoppingCart();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  // This makes sure that the cartDetails object is defined before we try to access its properties
  const isCartDetailsDefined = cartDetails !== undefined;

  const isEmpty = Object.keys(isCartDetailsDefined && cartDetails).length === 0;

  const handleCheckout = async () => {
    if (cartCount === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add some items to your cart before checking out.",
        variant: "destructive",
      });
    } else {
      setIsLoading(true);

      try {
        await redirectToCheckout();
      } catch (error) {
        console.error("Error redirecting to checkout", error);
        toast({
          title: "Checkout Error",
          description: "There was a problem with redirecting to checkout.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Function to clear the cart
  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "Your cart has been cleared.",
    });
  };

  const EmptyCart = () => (
    <div className="emptyCartContainer">
      <p>
        Your cart is empty. <a href="/products">Click here</a> to shop.
      </p>
    </div>
  );

  const FilledCart = () => (
    <div className="filledCartContainer">
      <ul className="cartListContainer">
        <div className="cartItemsHeader">
          <p>Products</p>
          <p>Quantity</p>
          <p>Sub-total</p>
        </div>
        {isCartDetailsDefined &&
          Object.keys(cartDetails ?? {}).map((entryKey) => {
            const cartEntry = cartDetails[entryKey];
            return (
              <li key={cartEntry.id} className="cartListItem">
                <Link to={`/product/${cartEntry.slug}`}>
                  <img
                    src={cartEntry.image}
                    alt={cartEntry.name}
                    className="cartItemImage"
                  />
                </Link>
                <div className="cartItemDetails">
                  <h3 className="cartItemTitle">{cartEntry.name}</h3>
                  <div className="cartQuantitySelector">
                    <QuantitySelector
                      id={cartEntry.id}
                      quantity={cartEntry.quantity}
                      key={cartEntry.id}
                      setQuantity={setItemQuantity}
                    />
                  </div>
                  <button
                    className="cartItemRemove"
                    onClick={() => removeItem(cartEntry.id)}
                  >
                    Remove
                  </button>
                </div>
                <h3 className="cartItemPrice">${cartEntry.price}</h3>
              </li>
            );
          })}
      </ul>
      <div className="summaryContainer">
        <p className="summaryTitle">Summary</p>
        <div className="cartTotalContainer">
          <h3 className="cartTotalTitle">Total</h3>
          <p className="cartTotalPrice">${totalPrice?.toFixed(2)}</p>
        </div>
        <Button
          className="cartCheckoutBtn"
          onClick={() => {
            handleCheckout();
          }}
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : "Proceed to Checkout"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="cartPageContainer">
      <h3 className="cartPageTitle">Cart</h3>
      {isEmpty ? <EmptyCart /> : <FilledCart />}
      {!isEmpty && (
        <AlertDialog
          title="Clear the Cart?"
          description="Are you sure you want to remove all items from your cart? This action cannot be undone."
          onConfirm={() => handleClearCart()}
        />
      )}
      <div className="continueContainer">
        <h1>Continue Exploring</h1>
        <p>
          Discover more to add to your collection of modest wear at Al Haya -
          explore our range of hijabs, abayas, thobes, and more.
        </p>
        <Link to="/">
          <Button className="continueBtn">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
