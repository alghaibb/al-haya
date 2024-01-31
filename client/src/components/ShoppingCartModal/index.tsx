/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import "./cartmodal.styles.css";
import { useShoppingCart } from "use-shopping-cart";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const ShoppingCartModal = () => {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  const isCartDetailsDefined = cartDetails !== undefined;

  async function handleCheckout() {
    const response = await redirectToCheckout();

    try {
      if (response.error) {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sheetContent">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>

        <div className="sheetDivContainer">
          <div className="sheetDivInnerContainer">
            <ul className="listContainer">
              {cartCount === 0 ? (
                <h1 className="listItemText">Your cart is empty</h1>
              ) : (
                <>
                  {isCartDetailsDefined &&
                    Object.keys(cartDetails ?? {}).map((entryKey) => {
                      const entry = cartDetails[entryKey];
                      return (
                        <li className="listItemContainer" key={entryKey}>
                          <div className="listItem">
                            <img
                              src={entry.image}
                              alt="Cart Product Image"
                              width={100}
                              height={100}
                            />
                          </div>

                          <div className="cartProductDetailsContainer">
                            <div>
                              <div className="cartProductDetails">
                                <h3>{entry.name}</h3>
                                <p>${entry.price}</p>
                              </div>
                              <p className="cartProductDescription">
                                {entry.description}
                              </p>
                            </div>

                            <div className="qtyRemoveBtnContainer">
                              <p>QTY: {entry.quantity}</p>

                              <div className="removeBtnContainer">
                                <button
                                  type="button"
                                  className="removeBtn"
                                  onClick={() => removeItem(entry.id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </>
              )}
            </ul>
          </div>

          <div className="cartFooterContainer">
            <div className="cartTotal">
              <p>Subtotal:</p>
              <p>
                $
                {totalPrice !== undefined && totalPrice >= 0
                  ? totalPrice.toFixed(2)
                  : "0.00"}
              </p>
            </div>
            <div className="btnContainer">
              <Link to="/cart">
                <Button
                  className="viewCartBtn"
                  onClick={() => handleCartClick()}
                >
                  View Your Cart
                </Button>
              </Link>
              <div className="orDivider">
                <hr className="dividerLine" />
                <span className="orText">OR</span>
                <hr className="dividerLine" />
              </div>
              <Button className="checkoutBtn" onClick={() => handleCheckout()}>
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;
