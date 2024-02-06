/* eslint-disable @typescript-eslint/no-unused-vars */
import Logo from "../../assets/logo.svg";
import Auth from "@/utils/auth";
import { Link } from "react-router-dom";
import { useShoppingCart } from "use-shopping-cart";

import { RiLogoutCircleLine } from "react-icons/ri";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MdFavoriteBorder } from "react-icons/md";

import "./navbar.styles.css";

import MobileNav from "./MobileNav";

// Array of links to be rendered in the navbar
const navLinks = [
  { name: "Shop", path: "/products" },
  { name: "Men", path: "/category/men" },
  { name: "Women", path: "/category/women" },
  { name: "Accessories", path: "/category/accessories" },
];

const Navbar = () => {
  const { handleCartClick } = useShoppingCart();
  const isLoggedIn = Auth.loggedIn();

  // Function to log out user
  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <nav className="navbar">
      <MobileNav />
      <div>
        <Link to="/" className="logoContainer">
          <img src={Logo} alt={Logo} className="logo" />
        </Link>
      </div>
      <div className="navItems">
        {navLinks.map((link, index) => (
          <a href={link.path} key={index} className="navItem">
            {link.name}
          </a>
        ))}
      </div>
      <div className="icons">
        {isLoggedIn ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={handleLogout} className="logoutBtn">
                  <RiLogoutCircleLine className="icon" size={24} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="logoutTooltip" onClick={handleLogout}>
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/login">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <TooltipContent className="loginTooltip">
                    <p>Login</p>
                  </TooltipContent>
                </Link>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link to="/wishlist">
                <MdFavoriteBorder className="icon" size={24} />
            <TooltipContent className="wishlistTooltip">
              <p>Wishlist</p>
            </TooltipContent>
              </Link>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => handleCartClick()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 icon cartHidden"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <TooltipContent className="cartTooltip">
                  <p>View Cart</p>
                </TooltipContent>
              </button>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
};

export default Navbar;
