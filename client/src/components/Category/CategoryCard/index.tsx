import React from "react";
import { Link } from "react-router-dom";

interface Category {
  title: string;
  imageUrl: string;
}

import "./categoryCard.style.css";

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  const linkPath = `/category/${category.title.toLowerCase()}`;

  return (
    <div className="categoryCard">
      <Link to={linkPath}>
        <img
          src={category.imageUrl}
          alt={category.title}
          className="categoryImage"
        />
        <p className="categoryTitle">{category.title}</p>
      </Link>
    </div>
  );
};

export default CategoryCard;
