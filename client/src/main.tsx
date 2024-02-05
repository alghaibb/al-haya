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
        path: "/verify",
        element: <Verify />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
