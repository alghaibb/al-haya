import { useEffect, useState } from "react";
import { simpleProduct } from "@/interface";
import { Link } from "react-router-dom";
import client from "@/sanityClient";

import { Button } from "../ui/button";

import "./newest.styles.css";

const NewestAdditions = () => {
  const [products, setProducts] = useState<simpleProduct[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == 'product'][0...4] | order(_createdAt desc) {
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
    <div className="newestAdditions-container">
      <h2 className="newestAdditions-title">Our Newest Additions</h2>
      <div className="newestAdditions-grid">
        {products.map((product) => (
          <div key={product._id} className="newestAdditions-card">
            <Link to={`/product/${product.slug}`}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="newestAdditions-image"
              />
              <div className="newestAdditions-info">
                <h3 className="newestAdditions-product-title">
                  {product.title}
                </h3>
                <p className="newestAdditions-product-price">
                  ${product.price}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Link to="/products">
        <Button size="sm" className="seelAllBtn">
          See All
        </Button>
      </Link>
    </div>
  );
};

export default NewestAdditions;
