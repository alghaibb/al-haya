import { useState, useEffect } from "react";
import client from "@/sanityClient";

import "./home.style.css";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Category from "@/components/Category";

interface HeroBanner {
  imageUrl: string;
}

const Home = () => {
  const [heroBanner, setHeroBanner] = useState<HeroBanner | null>(null);

  useEffect(() => {
    const query = `*[_type == "heroBanner"][0]{
      "imageUrl": image.asset->url
    }`;
    client.fetch(query).then((data) => {
      setHeroBanner(data);
    });
  }, []);

  if (!heroBanner) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homeContainer">
      {heroBanner && (
        <div className="heroBannerContainer">
          <div className="heroBannerSlogan">
            <h1>Elegance in Modesty</h1>
            <p>Explore the Beauty of Islamic Attire</p>
          </div>
          <img
            src={heroBanner.imageUrl}
            alt="Hero Banner"
            className="heroBanner"
          />
          <Link to="/new-arrivals">
            <Button className="shopNowBtn" size="sm">
              Shop Now
            </Button>
          </Link>
        </div>
      )}
      <div className="shopByCategoryTextWrapper">
        <h1 className="shopByCategoryText">Shop By Category</h1>
      </div>
      <Category />
    </div>
  );
};

export default Home;
