import { getImageData } from './getImageData';
import { propertyImageModel } from "@/app/properties/models/property.model";

describe('getImageData Component', () => {
  it('should return an array of image files', () => {
    // Arrange
    const imageArray: propertyImageModel[] = [
      {
        idPropertyImage: '1',
        file: 'image1.jpg',
        enabled: true
      },
      {
        idPropertyImage: '2',
        file: 'image2.jpg',
        enabled: true
      },
      {
        idPropertyImage: '3',
        file: 'image3.jpg',
        enabled: true
      }
    ];
    
    // Act
    const result = getImageData(imageArray);
    
    // Assert
    expect(result).toEqual(['image1.jpg', 'image2.jpg', 'image3.jpg']);
  });

  it('should return an array of enable image files', () => {
    // Arrange
    const imageArray: propertyImageModel[] = [
      {
        idPropertyImage: '1',
        file: 'image1.jpg',
        enabled: true
      },
      {
        idPropertyImage: '2',
        file: 'image2.jpg',
        enabled: true
      },
      {
        idPropertyImage: '3',
        file: 'image3.jpg',
        enabled: false
      }
    ];
    
    // Act
    const result = getImageData(imageArray);
    
    // Assert
    expect(result).toEqual(['image1.jpg', 'image2.jpg']);
  });

  it('should return an empty array if imageArray is empty', () => {
    // Arrange
    const imageArray: propertyImageModel[] = [];

    // Act
    const result = getImageData(imageArray);

    // Assert
    expect(result).toEqual([]);
  });

  it('should return an empty array if imageArray is undefined', () => {
    // Act
    const result = getImageData(undefined);
    
    // Assert
    expect(result).toEqual([]);
  });

  it('should return an empty array if imageArray is null', () => {
    // Act
    const result = getImageData(null);
    
    // Assert
    expect(result).toEqual([]);
  });
});