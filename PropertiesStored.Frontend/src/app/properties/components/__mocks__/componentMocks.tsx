import React from 'react';
import propertyModel from '../../models/property.model';

// Mock PropertyHeader component
export const MockPropertyHeader = ({ name, address }: { name: string; address: string }) => (
  <div data-testid="property-header">
    <div data-testid="header-name">{name}</div>
    <div data-testid="header-address">{address}</div>
  </div>
);

// Mock PropertyImagesSection component
export const MockPropertyImagesSection = ({ propertyData }: { propertyData: propertyModel }) => (
  <div data-testid="property-images-section">
    <div data-testid="images-section-name">{propertyData.name}</div>
  </div>
);

// Mock PropertyInfoSection component
export const MockPropertyInfoSection = ({ propertyData }: { propertyData: propertyModel }) => (
  <div data-testid="property-info-section">
    <div data-testid="info-section-name">{propertyData.name}</div>
  </div>
);

// Mock PropertyDescription component
export const MockPropertyDescription = ({ propertyData }: { propertyData: propertyModel }) => (
  <div data-testid="property-description">
    <div data-testid="property-name">{propertyData.name}</div>
    <div data-testid="property-address">{propertyData.address}</div>
    <div data-testid="property-price">${propertyData.price}</div>
  </div>
);

// Mock ImagesGallery component
export const MockImagesGallery = ({ imagesSrc, alt }: { imagesSrc: string[], alt: string }) => (
  <div data-testid="images-gallery">
    <div data-testid="images-src">{imagesSrc.join(', ')}</div>
    <div data-testid="images-alt">{alt}</div>
  </div>
);
