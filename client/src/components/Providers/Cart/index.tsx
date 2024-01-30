import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={import.meta.env.VITE_STRIPE_PUBLIC_KEY}
      successUrl={import.meta.env.VITE_SUCCESS_URL}
      cancelUrl={import.meta.env.VITE_CANCEL_URL}
      currency="AUD"
      billingAddressCollection={true}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProvider>
  );
};

export default CartProvider;
