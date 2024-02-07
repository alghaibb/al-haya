import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

export type WishlistAction =
  | { type: "ADD_ITEM"; payload: WishlistItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "CLEAR" };

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem("wishlist") || "[]"),
};

export interface WishlistContextType {
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

const wishlistReducer = (
  state: WishlistState,
  action: WishlistAction
): WishlistState => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "CLEAR":
      return initialState;
    default:
      throw new Error("Unhandled action type");
  }
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Save the wishlist to local storage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const UseWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context as WishlistContextType;
};
