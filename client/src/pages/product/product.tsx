import { useEffect, useState } from "react";
import client from "@/sanityClient";
import { fullProduct } from "@/interface";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

import "./product.styles.css";
import LoadingSpinner from "@/components/LoadingSpinner";
import ImageGallery from "@/components/ImageGallery";

const ProductPage = () => {
  const [productData, setProductData] = useState<fullProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    if (slug) {
      const fetchData = async () => {
        try {
          const query = `*[_type == 'product' && slug.current == $slug][0] {
            _id,
            images,
            price,
            title,
            description,
            "slug": slug.current,
            "categoryName": category->title
          }`;
          const data = await client.fetch(query, { slug });
          setProductData(data);
          setLoading(false);
        } catch (error) {
          console.error("Fetching product data failed", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="productLoader">
        <LoadingSpinner />
      </div>
    );
  }

  if (!productData) {
    return <div className="productNotFound">Product not found</div>;
  }
  return (
    <div className="productContainer">
      <div className="productCard">
        <ImageGallery images={productData.images} />

        <div className="productDataContainer">
          <div className="productNameContainer">
            <h2 className="productName">{productData.title}</h2>
          </div>
          <div className="productPriceMainContainer">
            <div className="productPriceContainer">
              <span className="productPrice">${productData.price}</span>
            </div>
          </div>
          <p className="productDescription">{productData.description}</p>
          <div className="shippingInfo">Ships in 1-2 business days</div>
          <div className="returnPolicy">30-day return policy</div>
          <div className="productActions">
            <Button size="lg" className="addToCartBtn">
              Add To Cart
            </Button>
            <Button variant="outline" size="lg" className="addToWishlistBtn">
              Add To Wishlist
            </Button>
          </div>
          <div className="orDivider">
            <hr className="dividerLine" />
            <span className="orText">OR</span>
            <hr className="dividerLine" />
          </div>
          <Button size="lg" className="checkoutNowBtn">
            Checkout Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
