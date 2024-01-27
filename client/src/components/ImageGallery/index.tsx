/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { urlFor } from "@/sanityClient";
import "./imageGallery.styles.css";

interface ImageGalleryProps {
  images: any;
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [bigImage, setBigImage] = useState(images[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [, setActiveImageIndex] = useState(0);

  const handleSmallImageClick = (image: any, index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setBigImage(image);
      setActiveImageIndex(index);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <div className="imageGalleryMainContainer ">
      <div className="imageGalleryContainer">
        {images.map((image: any, index: any) => (
          <div
            key={index}
            className={`image ${image === bigImage ? "active" : ""}`}
          >
            <img
              src={urlFor(image).url()}
              alt={`image${index}`}
              width={200}
              height={200}
              onClick={() => handleSmallImageClick(image, index)}
              className="image"
            />
          </div>
        ))}
      </div>
      <div className="bigImageContainer">
        <img
          src={urlFor(bigImage).url()}
          alt="bigImage"
          width={500}
          height={500}
          className={`bigImage ${isTransitioning ? "fading" : ""}`}
          onLoad={() => setIsTransitioning(false)}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
