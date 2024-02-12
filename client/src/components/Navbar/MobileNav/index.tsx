/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Squash as Hamburger } from "hamburger-react";
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { MdOutlineMail, MdFavoriteBorder } from "react-icons/md";

import "./mobileNav.style.css";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  // Function to toggle noScroll class on body
  const toggleNoScroll = (shouldScroll: boolean) => {
    if (shouldScroll) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.add("noScroll");
    }
  };

  // Function to toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    toggleNoScroll(!isOpen);
  };

  // Ensure that the noScroll class is removed when the menu is closed
  useEffect(() => {
    if (!isOpen) {
      document.body.classList.remove("noScroll");
    }
  });

  const wishlistClick = () => {
    navigate("/wishlist");
    setIsOpen(false);
  };

  const mobileNavLinks = [
    { name: "Shop", path: "/products" },
    { name: "Men", path: "/category/men" },
    { name: "Women", path: "/category/women" },
    { name: "Accessories", path: "/category/accessories" },
  ];

  return (
    <>
      <div className="mobileNav">
        <Hamburger toggled={isOpen} toggle={toggleMenu} size={24} />
      </div>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <div className={`menuItems ${isOpen ? "open" : ""}`}>
          {mobileNavLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="menuItem"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className={`menuFooterWrapper ${isOpen ? "open" : ""}`}>
          <div className={`menuFooter ${isOpen ? "open" : ""}`}>
            {/* Social media icons */}
            <div className="socialIcons">
              <div className="socialIcon">
                <CiFacebook size={24} />
                <p className="socialText">Facebook</p>
              </div>
              <div className="socialIcon">
                <CiInstagram size={24} />
                <p className="socialText">Instagram</p>
              </div>
              <div className="socialIcon">
                <CiTwitter size={24} />
                <p className="socialText">Twitter</p>
              </div>
            </div>

            {/* Wishlist Container*/}
            <div className="wishlistMobileContainer" onClick={wishlistClick}>
              <div className="wishlistFlexContainer">
                <MdFavoriteBorder className="wishlistIcon" size={24} />
                <p className="wishlistText">Wishlist</p>
              </div>
            </div>

            {/* Contact container */}
            <Link to="/contact-us" onClick={() => setIsOpen(false)}>
              <div className="contactUs">
                <MdOutlineMail className="contactIcon" size={24} />
                <p className="contactText">Contact Us</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
