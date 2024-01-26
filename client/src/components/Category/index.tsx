import { useState, useEffect } from "react";
import client from "@/sanityClient";
import CategoryCard from "./CategoryCard";

interface Category {
  title: string;
  imageUrl: string;
}

import "./category.style.css";

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const query = `*[_type == "category"]{
      title,
      "imageUrl": image.asset->url
    }`;
    client.fetch(query).then((data) => {
      setCategories(data);
    });
  }, []);

  return (
    <div className="categoriesContainer">
      {categories.map((category) => (
        <CategoryCard key={category.title} category={category} />
      ))}
    </div>
  );
};

export default Category;
