import { useState, useEffect } from "react";
import { simpleProduct } from "@/interface";
import { Link } from "react-router-dom";
import client from "@/sanityClient";

import "./featured.styles.css";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<simpleProduct[]>([]);

  // Fetch the featured products from the Sanity API
  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == 'product'][13...18] {
        _id,
        price,
        title,
        "slug": slug.current,
        "categoryName": category->title,
        "imageUrl": images[0].asset->url
      }`;
      const data = await client.fetch(query);
      setProducts(data);
    };

    fetchData();
  }, []);

  return (
    <div className="featuredAdditions-container">
      <h2 className="featuredAdditions-title">Our Featured Products</h2>
      <div className="featuredAdditions-grid">
        {products.map((product) => (
          <div key={product._id} className="featuredAdditions-card">
            <Link to={`/product/${product.slug}`}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="featuredAdditions-image"
              />
              <div className="featuredAdditions-info">
                <h3 className="featuredAdditions-product-title">
                  {product.title}
                </h3>
                <p className="featuredAdditions-product-price">
                  ${product.price}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
