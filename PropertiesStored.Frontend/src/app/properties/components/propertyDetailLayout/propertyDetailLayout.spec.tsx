import React from 'react';
import { render } from '@testing-library/react';

// Mock PropertyHeader component
jest.mock('../propertyHeader/propertyHeader.component', () => {
  return function MockPropertyHeader({ name, address }: { name: string; address: string }) {
    return (
      <div data-testid="property-header">
        <div data-testid="header-name">{name}</div>
        <div data-testid="header-address">{address}</div>
      </div>
    );
  };
});

// Mock PropertyImagesSection component
jest.mock('../propertyImagesSection/propertyImagesSection.component', () => {
  return function MockPropertyImagesSection({ propertyData }: { propertyData: { name: string } }) {
    return (
      <div data-testid="property-images-section">
        <div data-testid="images-section-name">{propertyData.name}</div>
      </div>
    );
  };
});

// Mock PropertyInfoSection component
jest.mock('../propertyInfoSection/propertyInfoSection.component', () => {
  return function MockPropertyInfoSection({ propertyData }: { propertyData: { name: string } }) {
    return (
      <div data-testid="property-info-section">
        <div data-testid="info-section-name">{propertyData.name}</div>
      </div>
    );
  };
});

import PropertyDetailLayout from './propertyDetailLayout.component';
import { mockPropertyData } from '../__mocks__/propertyDataMock';

describe('PropertyDetailLayout', () => {
  it('renders with correct layout structure', () => {
    const { container } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    const section = container.querySelector('section');
    expect(section).toHaveClass('min-h-screen', 'bg-gradient-to-br', 'from-gray-50', 'to-blue-50');
  });

  it('renders PropertyHeader component', () => {
    const { getByTestId } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    expect(getByTestId('property-header')).toBeInTheDocument();
    expect(getByTestId('header-name')).toHaveTextContent(mockPropertyData.name);
    expect(getByTestId('header-address')).toHaveTextContent(mockPropertyData.address);
  });

  it('renders PropertyImagesSection component', () => {
    const { getByTestId } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    expect(getByTestId('property-images-section')).toBeInTheDocument();
    expect(getByTestId('images-section-name')).toHaveTextContent(mockPropertyData.name);
  });

  it('renders PropertyInfoSection component', () => {
    const { getByTestId } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    expect(getByTestId('property-info-section')).toBeInTheDocument();
    expect(getByTestId('info-section-name')).toHaveTextContent(mockPropertyData.name);
  });

  it('has correct grid layout', () => {
    const { container } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'lg:grid-cols-2', 'gap-8', 'lg:gap-12');
  });
});
