/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { simpleProduct } from "@/interface";
import { Link } from "react-router-dom";
import client from "@/sanityClient";

import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
  PaginationItem,
  PaginationContent,
  PaginationLink,
} from "../../components/ui/pagination";

import "./allproducts.styles.css";

export const dynamic = "force-dynamic";

const ITEMS_PER_PAGE = 12;

const AllProductsPage = () => {
  const [products, setProducts] = useState<simpleProduct[]>([]);
  const [displayedItems, setDisplayedItems] = useState<simpleProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [opacity, setOpacity] = useState(1);

  // Fetch all products
  useEffect(() => {
    const query = `*[_type == "product"] {
      title,
      _id,
        price,
        "slug": slug.current,
        "imageUrl": images[0].asset->url,
        "categoryName": category->title
    }`;

    client
      .fetch(query)
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products: ", error);
      });
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  useEffect(() => {
    // Start by fading out
    setOpacity(0);

    const timer = setTimeout(() => {
      // Update the content after the fade-out completes
      const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
      const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
      const newItems = products.slice(indexOfFirstItem, indexOfLastItem);
      setDisplayedItems(newItems);

      // Fade back in after updating the content
      setOpacity(1);
    }, 300); // Wait for the fade-out to complete (300ms)

    return () => clearTimeout(timer);
  }, [currentPage, products]); // Depend on currentPage and products

  // Adjusted handler for previous page
  const handlePreviousClick = (e: any) => {
    if (currentPage === 1) {
      e.preventDefault();
    } else {
      setCurrentPage(currentPage - 1); // Navigate to the previous page
    }
  };

  // Adjusted handler for next page
  const handleNextClick = (e: any) => {
    if (currentPage === totalPages) {
      e.preventDefault(); // Prevent navigation if on the last page
    } else {
      setCurrentPage(currentPage + 1); // Navigate to the next page
    }
  };
  // Dynamically generate page links
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="allProductsPage">
      <h1 className="allProductsTitle">All Products</h1>
      <div
        className="productsGrid"
        style={{ "--grid-opacity": opacity } as React.CSSProperties}
      >
        {displayedItems.map((product) => (
          <div key={product._id} className="productsCard">
            <Link to={`/product/${product.slug}`}>
              <img src={product.imageUrl} alt={product.title} />
              <h3>{product.title}</h3>
            </Link>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      <Pagination className="paginationContainer">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={currentPage > 1 ? handlePreviousClick : undefined}
              className={
                currentPage === 1 ? "paginationDisabled" : "paginationPrev"
              }
            />
          </PaginationItem>
          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                onClick={() => setCurrentPage(number)}
                className={
                  currentPage === number
                    ? "paginationNumbersActive"
                    : "paginationNumbers"
                }
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={currentPage < totalPages ? handleNextClick : undefined}
              className={
                currentPage === totalPages
                  ? "paginationDisabled"
                  : "paginationPrev"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AllProductsPage;
