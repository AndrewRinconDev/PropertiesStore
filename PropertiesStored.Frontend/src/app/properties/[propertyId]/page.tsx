"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getPropertyById } from "../services/property.service";
import propertyModel from "../models/property.model";
import PropertyDescription from "../components/propertyDescription/propertyDescription.component";
import LoadingOverlay from "../../core/components/loadingOverlay/loadingOverlay.component";
import ImagesGallery from "../../core/components/imagesGallery/ImagesGallery.component";
import { getImageData } from "../../core/utilities/getImageData.ts/getImageData";

import "./page.style.css";

function PropertyDetailPage() {
  const [propertyData, setPropertyData] = useState<null | propertyModel>(null);
  const { propertyId } = useParams();

  const fetchProperty = async () => {
    const property = await getPropertyById(propertyId);
    setPropertyData(property);
  };

  useEffect(() => {
    // fetch property data
    fetchProperty();
  }, []);

  if (!propertyData) {
    return <LoadingOverlay />;
  }

  return (
    <section className="property-detail-page-section">
      <div className="property-images-container">
        <ImagesGallery
          imagesSrc={getImageData(propertyData.propertyImages)}
          alt={propertyData.name}
        />
      </div>
      <div className="property-info-container">
        <PropertyDescription propertyData={propertyData} />
      </div>
    </section>
  );
}

export default PropertyDetailPage;
