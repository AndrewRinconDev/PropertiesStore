import { propertyImageModel } from '../../models/property.model';

// Mock getImageData utility
export const mockGetImageData = jest.fn((images: propertyImageModel[]) => 
  images.map((img: propertyImageModel) => img.file)
);

// Jest mock definitions for utilities
export const getImageDataMock = {
  getImageData: mockGetImageData
};
