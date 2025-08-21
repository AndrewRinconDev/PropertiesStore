import React from 'react';
import { render, screen } from '@testing-library/react';

import PropertyCard from './propertyCard.component';
import { propertyDataMock } from './__mock__/propertyDataMock';

describe('PropertyCard', () => {
  it('should render property data', () => {
    render(<PropertyCard property={propertyDataMock} />);

    expect(screen.getByText('Beautiful House')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText(/1,000,000/i)).toBeInTheDocument();
  });

  it('should render property images', () => {
    render(<PropertyCard property={propertyDataMock} />);

    const propertyImage = screen.getByAltText('property-image-1');
    expect(propertyImage).toBeInTheDocument();
    expect(propertyImage).toHaveAttribute('src', '/_next/image?url=%2Fhouse.jpg&w=3840&q=75');
  });

  it('should render fallback property images', () => {
    const fallbackPropertyDataMock = {
      ...propertyDataMock,
      propertyImages: []
    };
    render(<PropertyCard property={fallbackPropertyDataMock} />);

    const propertyImage = screen.getByAltText('Property Image');
    expect(propertyImage).toBeInTheDocument();
    expect(propertyImage).toHaveAttribute('src', '/_next/image?url=%2Fimages%2Ffallback-property-image.jpg&w=3840&q=75');
    expect(screen.queryByAltText('property-image-1')).not.toBeInTheDocument();
  });

  it('should render View Details button', () => {
    render(<PropertyCard property={propertyDataMock} />);

    const viewDetailsButton = screen.getByText('View Details');

    expect(viewDetailsButton).toBeInTheDocument();
    expect(viewDetailsButton).toHaveAttribute('href', '/properties/1');
  });
});