"use client";
import { useEffect, useState, Suspense, useCallback } from "react";
import { useParams } from "next/navigation";

import { getPropertyById } from "../services/property.service";
import propertyModel from "../models/property.model";
import PropertySkeleton from "../../core/components/propertySkeleton/propertySkeleton.component";
import PropertyDetailLayout from "../components/propertyDetailLayout/propertyDetailLayout.component";

import "./page.style.css";

function PropertyDetailContent() {
  const [propertyData, setPropertyData] = useState<null | propertyModel>(null);
  const { propertyId } = useParams();

  const fetchProperty = useCallback(async () => {
    try {
      const property = await getPropertyById(propertyId);
      setPropertyData(property);
    } catch (error) {
      console.error('Error fetching property:', error);
      // Handle error state if needed
    }
  }, [propertyId]);

  useEffect(() => {
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId, fetchProperty]);

  if (!propertyData) {
    return <PropertySkeleton />;
  }

  return <PropertyDetailLayout propertyData={propertyData} />;
}

function PropertyDetailPage() {
  return (
    <Suspense fallback={<PropertySkeleton />}>
      <PropertyDetailContent />
    </Suspense>
  );
}

export default PropertyDetailPage;
