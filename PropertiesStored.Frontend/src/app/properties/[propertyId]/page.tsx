"use client";
import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";

import { getPropertyById } from "../services/property.service";
import propertyModel from "../models/property.model";
import PropertyDescription from "../components/propertyDescription/propertyDescription.component";
import PropertySkeleton from "../../core/components/propertySkeleton/propertySkeleton.component";
import ImagesGallery from "../../core/components/imagesGallery/ImagesGallery.component";
import { getImageData } from "../../core/utilities/getImageData.ts/getImageData";

import "./page.style.css";

function PropertyDetailContent() {
  const [propertyData, setPropertyData] = useState<null | propertyModel>(null);
  const { propertyId } = useParams();

  const fetchProperty = async () => {
    try {
      const property = await getPropertyById(propertyId);
      setPropertyData(property);
    } catch (error) {
      console.error('Error fetching property:', error);
      // Handle error state if needed
    }
  };

  useEffect(() => {
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  if (!propertyData) {
    return <PropertySkeleton />;
  }

  return (
    <section className="property-detail-page-section">
      <div className="property-images-container">
        <ImagesGallery
          imagesSrc={getImageData(propertyData.images)}
          alt={propertyData.name}
        />
      </div>
      <div className="property-info-container">
        <PropertyDescription propertyData={propertyData} />
      </div>
    </section>
  );
}

function PropertyDetailPage() {
  return (
    <Suspense fallback={<PropertySkeleton />}>
      <PropertyDetailContent />
    </Suspense>
  );
}

export default PropertyDetailPage;
