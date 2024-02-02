/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import * as z from "zod";
import { SEND_EMAIL } from "../../utils/mutations/sendEmail";

import Logo from "../../assets/logo.svg";

import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

import LoadingSpinner from "../LoadingSpinner";

import "./footer.styles.css";

interface Subscription {
  email: string;
}

const subscriptionSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const [subscribeToNewsletter] = useMutation(SEND_EMAIL);

  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Subscription>({
    resolver: zodResolver(subscriptionSchema),
  });

  const onSubscribe = async (data: Subscription) => {
    setLoading(true);
    try {
      const res = await subscribeToNewsletter({
        variables: { email: data.email },
      });
      if (res.data.subscribe) {
        setTimeout(() => {
          setLoading(false);
          toast({
            title: "Subscription Successful",
            description: "You have successfully subscribed to our newsletter",
          });
          reset();
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Subscription Failed",
        description: "An error occurred while subscribing to our newsletter",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top-section">
        <div className="footer-top-items">
          <h1>About Al Haya</h1>
          <span className="about-description">
            Al Haya celebrates the essence of modesty through elegant fashion.
            We offer a curated collection of Islamic wear for men and women,
            designed to honor tradition with a modern touch. Each piece is
            crafted with care, reflecting the dignity and grace of modest
            apparel. Join us on a journey that brings faith and fashion
            together.
          </span>
        </div>
        <div className="footer-top-items">
          <h1>Categories</h1>
          <Link to="/category/women">
            <span className="category-links">Women</span>
          </Link>
          <Link to="/category/men">
            <span className="category-links">Men</span>
          </Link>
          <Link to="/category/accessories">
            <span className="category-links">Accessories</span>
          </Link>
        </div>
        <div className="footer-top-items">
          <h1>About Us</h1>
          <Link to="/our-story" className="about-us-links">
            <span>Our Story</span>
          </Link>
          <Link to="/shipping-returns" className="about-us-links">
            <span>Shipping & Returns</span>
          </Link>
          <Link to="/terms-and-conditions" className="about-us-links">
            <span>Terms & Conditions</span>
          </Link>
          <Link to="/privacy-policy" className="about-us-links">
            <span>Privacy Policy</span>
          </Link>
          <Link to="/contact-us" className="about-us-links">
            <span>Contact Us</span>
          </Link>
        </div>
        <div className="footer-top-items">
          <h1>Subscribe to Our Newsletter</h1>
          <span>Get the latest updates on new products and upcoming sales</span>
          <form onSubmit={handleSubmit(onSubscribe)}>
            <Input
              placeholder="Your email address"
              {...register("email")}
              className={`input-field ${errors.email ? "error" : ""}`}
              disabled={loading}
            />
            <Button type="submit" disabled={loading} className="subscribeBtn">
              {loading ? <LoadingSpinner /> : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
      <div className="footer-bottom-section">
        <div className="footer-bottom-left">
          <img src={Logo} className="logo" />
          <span className="copyright">
            © Copyright 2024. All Rights Reserved
          </span>
        </div>
        <div className="footer-bottom-right">
          <img src="/payment.png" alt="" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
