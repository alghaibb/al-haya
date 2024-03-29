import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import client, { urlFor } from "../../sanityClient";

import LoadingSpinner from "../LoadingSpinner";

import "./hero.styles.css";

interface HeroBannerImageAsset {
  _ref: string;
}

interface HeroBannerImage {
  asset: HeroBannerImageAsset;
}

interface HeroBanner {
  primaryHeroImage?: HeroBannerImage;
  secondaryHeroImage?: HeroBannerImage;
}

const Hero = () => {
  const [data, setData] = useState<HeroBanner | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const query = "*[_type == 'heroBanner'][0]";
      const result = await client.fetch<HeroBanner>(query);
      setData(result);
    };

    fetchData();
  }, []);

  if (!data) {
    return <LoadingSpinner />;
  }

  const primaryImageUrl = data.primaryHeroImage
    ? urlFor(data.primaryHeroImage.asset).url()
    : "";
  const secondaryImageUrl = data.secondaryHeroImage
    ? urlFor(data.secondaryHeroImage.asset).url()
    : "";

  // Function for shop now button to go to /products page using navigate
  const handleShopNowClick = () => {
    navigate("/products");
  };

  return (
    <section className="container">
      <div className="heroContainer">
        <div className="sloganContainer">
          <h1>Islamic Elegance</h1>
          <p>
            Explore our finest collections of islamic attires for both men &
            women
          </p>
          <Button onClick={handleShopNowClick} className="shopNowBtn">
            Shop Now
          </Button>
        </div>

        <div className="heroImageContainer">
          {primaryImageUrl && (
            <div className="heroImage">
              <img src={primaryImageUrl} alt="Primary Hero" />
            </div>
          )}

          {secondaryImageUrl && (
            <div className="secondHeroImage">
              <img src={secondaryImageUrl} alt="Secondary Hero" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
