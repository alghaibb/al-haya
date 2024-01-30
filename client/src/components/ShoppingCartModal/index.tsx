import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import "./cartmodal.styles.css";
import { useShoppingCart } from "use-shopping-cart";

const ShoppingCartModal = () => {
  const { cartCount, shouldDisplayCart, handleCartClick } = useShoppingCart();

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
                <p className="listItemText">Your cart is not empty</p>
              )}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartModal;
