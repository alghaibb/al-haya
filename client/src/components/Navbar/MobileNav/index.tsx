/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Squash as Hamburger } from "hamburger-react";
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

import "./mobileNav.style.css";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const mobileNavLinks = [
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Men", path: "/men" },
    { name: "Women", path: "/women" },
    { name: "Accessories", path: "/accessories" },
  ];

  return (
    <>
      <div className="mobileNav">
        <Hamburger toggled={isOpen} toggle={toggleMenu} size={24} />
      </div>
      <div className={`menu ${isOpen ? "open" : ""}`}>
        <div className="menuItems">
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
        <div className="menuFooterWrapper">
          <div className="menuFooter">
            {/* Contact container */}
            <div className="contactUs">
              <MdOutlineMail className="contactIcon" size={24} />
              <p className="contactText">Contact Us</p>
            </div>

            {/* Shopping bag */}
            <div className="cartContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 cartIcon "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <p>Cart</p>
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
