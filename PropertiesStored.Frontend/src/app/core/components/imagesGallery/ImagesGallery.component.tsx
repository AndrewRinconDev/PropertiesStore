import { useState } from "react";
import Image from "next/image";

import "./imagesGallery.style.css";

function ImagesGallery({ imagesSrc, alt }: { imagesSrc: string[], alt: string }) {
  const [selectedImage, setSelectedImage] = useState(imagesSrc[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const onChangeImage = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc);
    setSelectedImageIndex(index);
  };

  if (imagesSrc.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="image-principal-container">
        <Image
          className="h-auto max-w-full rounded-lg"
          src={selectedImage}
          alt={`${alt}-${selectedImageIndex}`}
          aria-label={`selected-image-gallery-${selectedImageIndex}`}
          fill
        />
      </div>
      <div className="image-items-wrapper">
        {imagesSrc.map((imageSrc, index) => (
          <div key={index} className={`image-item-container ${selectedImageIndex == index ? 'selected': ''}`} onClick={() => onChangeImage(imageSrc, index)}>
            <Image
              className="rounded-lg"
              src={imageSrc}
              alt={`${alt}-${index}`}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagesGallery;
