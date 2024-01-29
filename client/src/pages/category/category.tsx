import { useEffect, useState } from "react";
import client from "@/sanityClient";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";

import "./category.styles.css";
import { simpleProduct } from "@/interface";

const CategoryPage = () => {
  const [categoryData, setCategoryData] = useState<simpleProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    if (category) {
      const fetchData = async () => {
        try {
          const query = `*[_type == "product" && category->title match $category] {
            _id,
            "imageUrl": images[0].asset->url,
            price,
            title,
            "slug": slug.current
          }`;
          const data: simpleProduct[] = await client.fetch(query, { category });
          console.log("Fetched data:", data);
          setCategoryData(data);
          setLoading(false);
        } catch (error) {
          console.error("Fetching category data failed", error);
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="productLoader">
        <LoadingSpinner />
      </div>
    );
  }

  if (categoryData.length === 0) {
    return (
      <div className="noProducts">No products found in this category.</div>
    );
  }

  return (
    <div className="category-container">
      <h2 className="category-title">Products in {category?.toUpperCase()}</h2>
      <div className="category-grid">
        {categoryData.map((product) => (
          <div key={product._id} className="category-card">
            <Link to={`/product/${product.slug}`}>
              <img
                src={product.imageUrl}
                alt={product.title}
                className="category-image"
              />
              <div className="category-info">
                <h3 className="category-product-title">{product.title}</h3>
                <p className="category-product-price">${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
