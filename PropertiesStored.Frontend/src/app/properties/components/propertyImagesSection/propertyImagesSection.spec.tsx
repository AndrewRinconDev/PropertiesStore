import React from 'react';
import { render } from '@testing-library/react';
import PropertyImagesSection from './propertyImagesSection.component';
import { mockPropertyData } from '../__mocks__/propertyDataMock';
import { MockImagesGallery } from '../__mocks__/componentMocks';
import { getImageDataMock } from '../__mocks__/utilityMocks';

// Mock ImagesGallery component
jest.mock('../../../core/components/imagesGallery/ImagesGallery.component', () => ({
  __esModule: true,
  default: MockImagesGallery
}));

// Mock getImageData utility
jest.mock('../../../core/utilities/getImageData.ts/getImageData', () => getImageDataMock);

describe('PropertyImagesSection', () => {

  it('renders with correct order class', () => {
    const { container } = render(<PropertyImagesSection propertyData={mockPropertyData} />);
    
    const sectionContainer = container.firstChild as HTMLElement;
    expect(sectionContainer).toHaveClass('order-1');
  });

  it('renders with correct container styling', () => {
    const { container } = render(<PropertyImagesSection propertyData={mockPropertyData} />);
    
    const imageContainer = container.querySelector('.bg-white.rounded-2xl.shadow-xl.overflow-hidden.border.border-gray-100');
    expect(imageContainer).toBeInTheDocument();
  });

  it('renders ImagesGallery component', () => {
    const { getByTestId } = render(<PropertyImagesSection propertyData={mockPropertyData} />);
    
    expect(getByTestId('images-gallery')).toBeInTheDocument();
  });

  it('passes correct images data to ImagesGallery', () => {
    const { getByTestId } = render(<PropertyImagesSection propertyData={mockPropertyData} />);
    
    const imagesSrc = getByTestId('images-src');
    expect(imagesSrc).toHaveTextContent('test1.jpg, test2.jpg');
  });

  it('passes correct alt text to ImagesGallery', () => {
    const { getByTestId } = render(<PropertyImagesSection propertyData={mockPropertyData} />);
    
    const imagesAlt = getByTestId('images-alt');
    expect(imagesAlt).toHaveTextContent(mockPropertyData.name);
  });
});
