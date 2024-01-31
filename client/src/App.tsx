/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Navbar from "./components/Navbar";
import CartProvider from "./components/Providers/Cart";
import ShoppingCartModal from "./components/ShoppingCartModal";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "https://al-haya.onrender.com/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // Read the token from localStorage
  const token = localStorage.getItem("id_token");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Start Apollo Client with ApolloProvider
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  // Construct our cache
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <main>
          <Navbar />
          <ShoppingCartModal />
          <Outlet />
          <Toaster />
        </main>
      </CartProvider>
    </ApolloProvider>
  );
}

export default App;
