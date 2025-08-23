import React from 'react';
import { render } from '@testing-library/react';

// Mock PropertyDescription component
jest.mock('../propertyDescription/propertyDescription.component', () => {
  return function MockPropertyDescription({ propertyData }: { propertyData: { name: string; address: string; price: number } }) {
    return (
      <div data-testid="property-description">
        <div data-testid="property-name">{propertyData.name}</div>
        <div data-testid="property-address">{propertyData.address}</div>
        <div data-testid="property-price">${propertyData.price}</div>
      </div>
    );
  };
});

import PropertyInfoSection from './propertyInfoSection.component';
import { mockPropertyData } from '../__mocks__/propertyDataMock';

describe('PropertyInfoSection', () => {
  it('renders with correct order class', () => {
    const { container } = render(<PropertyInfoSection propertyData={mockPropertyData} />);
    
    const sectionContainer = container.firstChild as HTMLElement;
    expect(sectionContainer).toHaveClass('order-2');
  });

  it('renders with correct container styling', () => {
    const { container } = render(<PropertyInfoSection propertyData={mockPropertyData} />);
    
    const infoContainer = container.querySelector('.bg-white.rounded-2xl.shadow-xl.p-6.lg\\:p-8.border.border-gray-100');
    expect(infoContainer).toBeInTheDocument();
  });

  it('renders PropertyDescription component', () => {
    const { getByTestId } = render(<PropertyInfoSection propertyData={mockPropertyData} />);
    
    expect(getByTestId('property-description')).toBeInTheDocument();
  });

  it('passes correct property data to PropertyDescription', () => {
    const { getByTestId } = render(<PropertyInfoSection propertyData={mockPropertyData} />);
    
    expect(getByTestId('property-name')).toHaveTextContent(mockPropertyData.name);
    expect(getByTestId('property-address')).toHaveTextContent(mockPropertyData.address);
    expect(getByTestId('property-price')).toHaveTextContent(`$${mockPropertyData.price}`);
  });
});
