import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import Signup from "./pages/signup/signup.tsx";
import Login from "./pages/login/login.tsx";

import "./styles/globals.css";
import Home from "./pages/home/home.tsx";
import ProductPage from "./pages/product/product.tsx";
import CategoryPage from "./pages/category/category.tsx";
import Cart from "./pages/cart/cart.tsx";
import ErrorStripe from "./pages/stripe/error/error.tsx";
import SuccessStripe from "./pages/stripe/success/success.tsx";
import Contact from "./pages/contact/contact.tsx";
import Verify from "./pages/verify/index.tsx";
import Wishlist from "./pages/wishlist/wishlist.tsx";
import AllProductsPage from "./pages/products/index.tsx";
import ForgotPassword from "./pages/forgot-password/forgotPassword.tsx";
import ResetPassword from "./pages/reset-password/resetPassword.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/product/:slug",
        element: <ProductPage />,
      },
      {
        path: "/category/:category",
        element: <CategoryPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/stripe/error",
        element: <ErrorStripe />,
      },
      {
        path: "/stripe/success",
        element: <SuccessStripe />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/verify/:token",
        element: <Verify />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/products",
        element: <AllProductsPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
