import React from 'react';
import { render, screen } from '@testing-library/react';

import PropertyCard from './propertyCard.component';
import { mockPropertyData } from '../__mocks__/propertyDataMock';

describe('PropertyCard', () => {
  it('should render property data', () => {
    render(<PropertyCard property={mockPropertyData} />);

    expect(screen.getByText('Test Property')).toBeInTheDocument();
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
    expect(screen.getByText(/100,000/i)).toBeInTheDocument();
  });

  it('should render property images', () => {
    render(<PropertyCard property={mockPropertyData} />);

    const propertyImage = screen.getByAltText('img1');
    expect(propertyImage).toBeInTheDocument();
    expect(propertyImage).toHaveAttribute('src', '/_next/image?url=%2Ftest1.jpg&w=3840&q=75');
  });

  it('should render fallback property images', () => {
    const fallbackPropertyDataMock = {
      ...mockPropertyData,
      images: []
    };
    render(<PropertyCard property={fallbackPropertyDataMock} />);

    const propertyImage = screen.getByAltText('Property Image');
    expect(propertyImage).toBeInTheDocument();
    expect(propertyImage).toHaveAttribute('src', '/_next/image?url=%2Fimages%2Ffallback-property-image.jpg&w=3840&q=75');
    expect(screen.queryByAltText('img1')).not.toBeInTheDocument();
  });

  it('should render View Details button with emoji', () => {
    render(<PropertyCard property={mockPropertyData} />);

    const viewDetailsButton = screen.getByRole('link', { name: /View Details/ });

    expect(viewDetailsButton).toBeInTheDocument();
    expect(viewDetailsButton).toHaveAttribute('href', '/properties/1');
  });

  it('should render price badge overlay', () => {
    render(<PropertyCard property={mockPropertyData} />);

    const priceBadge = screen.getByText('$100,000');
    expect(priceBadge).toBeInTheDocument();
    expect(priceBadge).toHaveClass('text-sm', 'font-semibold');
  });

  it('should render address with location emoji', () => {
    render(<PropertyCard property={mockPropertyData} />);

    const addressElement = screen.getByText('📍');
    expect(addressElement).toBeInTheDocument();
    expect(addressElement).toHaveClass('text-blue-500');
  });

  it('should have correct card styling classes', () => {
    const { container } = render(<PropertyCard property={mockPropertyData} />);
    
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('bg-white', 'rounded-xl', 'shadow-lg', 'hover:shadow-2xl', 'transition-all', 'duration-300', 'overflow-hidden', 'border', 'border-gray-100', 'hover:border-blue-200');
  });

  it('should have correct button styling classes', () => {
    render(<PropertyCard property={mockPropertyData} />);
    
    const button = screen.getByRole('link', { name: /View Details/ });
    expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center', 'w-full', 'bg-gradient-to-r', 'from-blue-600', 'to-blue-700', 'hover:from-blue-700', 'hover:to-blue-800', 'text-white', 'font-semibold', 'py-3', 'px-4', 'rounded-lg', 'transition-all', 'duration-300', 'transform', 'hover:scale-105', 'hover:shadow-lg', 'active:scale-95');
  });
});