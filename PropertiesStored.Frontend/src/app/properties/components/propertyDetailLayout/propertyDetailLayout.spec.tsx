import React from 'react';
import { render } from '@testing-library/react';
import PropertyDetailLayout from './propertyDetailLayout.component';
import { mockPropertyData } from '../__mocks__/propertyDataMock';
import { MockPropertyHeader, MockPropertyImagesSection, MockPropertyInfoSection } from '../__mocks__/componentMocks';

// Mock child components
jest.mock('../propertyHeader/propertyHeader.component', () => ({
  __esModule: true,
  default: MockPropertyHeader
}));
jest.mock('../propertyImagesSection/propertyImagesSection.component', () => ({
  __esModule: true,
  default: MockPropertyImagesSection
}));
jest.mock('../propertyInfoSection/propertyInfoSection.component', () => ({
  __esModule: true,
  default: MockPropertyInfoSection
}));

describe('PropertyDetailLayout', () => {

  it('renders with correct section styling', () => {
    const { container } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    const section = container.firstChild as HTMLElement;
    expect(section).toHaveClass('min-h-screen', 'bg-gradient-to-br', 'from-gray-50', 'to-blue-50');
  });

  it('renders with correct container styling', () => {
    const { container } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    const containerDiv = container.querySelector('.max-w-7xl.mx-auto.px-4.sm\\:px-6.lg\\:px-8.py-8');
    expect(containerDiv).toBeInTheDocument();
  });

  it('renders PropertyHeader component', () => {
    const { getByTestId } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    expect(getByTestId('property-header')).toBeInTheDocument();
  });

  it('renders PropertyImagesSection component', () => {
    const { getByTestId } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    expect(getByTestId('property-images-section')).toBeInTheDocument();
  });

  it('renders PropertyInfoSection component', () => {
    const { getByTestId } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    expect(getByTestId('property-info-section')).toBeInTheDocument();
  });

  it('passes correct property data to PropertyHeader', () => {
    const { getByTestId } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    expect(getByTestId('header-name')).toHaveTextContent(mockPropertyData.name);
    expect(getByTestId('header-address')).toHaveTextContent(mockPropertyData.address);
  });

  it('passes correct property data to PropertyImagesSection', () => {
    const { getByTestId } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    expect(getByTestId('images-section-name')).toHaveTextContent(mockPropertyData.name);
  });

  it('passes correct property data to PropertyInfoSection', () => {
    const { getByTestId } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    expect(getByTestId('info-section-name')).toHaveTextContent(mockPropertyData.name);
  });

  it('renders with correct grid layout', () => {
    const { container } = render(<PropertyDetailLayout propertyData={mockPropertyData} />);
    
    const gridContainer = container.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2.gap-8.lg\\:gap-12');
    expect(gridContainer).toBeInTheDocument();
  });
});
