import React from 'react';
import { render } from '@testing-library/react';
import PropertyInfoSection from './propertyInfoSection.component';
import { mockPropertyData } from '../__mocks__/propertyDataMock';
import { MockPropertyDescription } from '../__mocks__/componentMocks';

// Mock PropertyDescription component
jest.mock('../propertyDescription/propertyDescription.component', () => ({
  __esModule: true,
  default: MockPropertyDescription
}));

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
