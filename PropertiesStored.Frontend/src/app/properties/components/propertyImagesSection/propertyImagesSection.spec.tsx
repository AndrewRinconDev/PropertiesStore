import React from 'react';
import { render } from '@testing-library/react';

// Mock ImagesGallery component
jest.mock('../../../core/components/imagesGallery/ImagesGallery.component', () => {
  return function MockImagesGallery({ imagesSrc, alt }: { imagesSrc: string[], alt: string }) {
    return (
      <div data-testid="images-gallery">
        <div data-testid="images-src">{imagesSrc.join(', ')}</div>
        <div data-testid="images-alt">{alt}</div>
      </div>
    );
  };
});

// Mock getImageData utility
jest.mock('../../../core/utilities/getImageData.ts/getImageData', () => ({
  getImageData: jest.fn((images: { file: string }[]) => images.map((img) => img.file))
}));

import PropertyImagesSection from './propertyImagesSection.component';
import { mockPropertyData } from '../__mocks__/propertyDataMock';

describe('PropertyImagesSection', () => {
  it('renders with correct order class', () => {
    const { container } = render(<PropertyImagesSection propertyData={mockPropertyData} />);
    
    const sectionContainer = container.firstChild as HTMLElement;
    expect(sectionContainer).toHaveClass('order-1');
  });

  it('renders with correct container styling', () => {
    const { container } = render(<PropertyImagesSection propertyData={mockPropertyData} />);
    
    const imagesContainer = container.querySelector('.bg-white.rounded-2xl.shadow-xl.overflow-hidden.border.border-gray-100');
    expect(imagesContainer).toBeInTheDocument();
  });

  it('renders ImagesGallery component', () => {
    const { getByTestId } = render(<PropertyImagesSection propertyData={mockPropertyData} />);
    
    expect(getByTestId('images-gallery')).toBeInTheDocument();
  });

  it('passes correct data to ImagesGallery', () => {
    const { getByTestId } = render(<PropertyImagesSection propertyData={mockPropertyData} />);
    
    expect(getByTestId('images-alt')).toHaveTextContent(mockPropertyData.name);
  });
});
