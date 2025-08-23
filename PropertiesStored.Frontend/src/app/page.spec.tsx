import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { getAllProperties } from './properties/services/property.service';
import PropertyFilters from './properties/components/propertyFilters/propertyFilters.component';
import PropertyCard from './properties/components/propertyCard/propertyCard.component';
import LoadingOverlay from './core/components/loadingOverlay/loadingOverlay.component';

import PropertiesPage from './page';
import { mockPagination, mockProperties, mockUseProperties } from './__mock__/propertyDataMock';

// Mock the useProperties hook
jest.mock('./core/hooks/useProperties', () => ({
  useProperties: jest.fn()
}));

jest.mock('./properties/services/property.service');
jest.mock('./properties/components/propertyFilters/propertyFilters.component');
jest.mock('./properties/components/propertyCard/propertyCard.component');
jest.mock('./core/components/loadingOverlay/loadingOverlay.component');

describe('PropertiesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock the useProperties hook
    const { useProperties } = jest.requireMock('./core/hooks/useProperties');
    useProperties.mockReturnValue(mockUseProperties);

    (getAllProperties as jest.Mock).mockResolvedValue({ 
      properties: mockProperties,
      pagination: mockPagination
    });
    (PropertyFilters as jest.Mock).mockImplementation(({ filter, setFilter, applyFilters }) => (
      <div data-testid="property-filters">
        <button onClick={() => setFilter({ ...filter, name: 'Test' })}>Set Filter</button>
        <button onClick={applyFilters}>Get Properties</button>
      </div>
    ));
    (PropertyCard as jest.Mock).mockImplementation(({ property }) => (
      <div data-testid="property-card">{property.name}</div>
    ));
    (LoadingOverlay as jest.Mock).mockImplementation(() => <div data-testid="loading-overlay">Loading...</div>);
  });

  it('renders loading overlay when initialLoad is true', () => {
    // Mock initialLoad as true
          const { useProperties } = jest.requireMock('./core/hooks/useProperties');
      useProperties.mockReturnValue({ ...mockUseProperties, initialLoad: true });

    render(<PropertiesPage />);
    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
  });

  it('renders property filters and property cards after loading', async () => {
    render(<PropertiesPage />);
    expect(screen.getByTestId('property-filters')).toBeInTheDocument();
    expect(screen.getAllByTestId('property-card')).toHaveLength(mockProperties.length);
  });

  it('updates properties when filter is applied', async () => {
    render(<PropertiesPage />);
    
    expect(screen.getByTestId('property-filters')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Set Filter'));
    fireEvent.click(screen.getByText('Get Properties'));

    expect(mockUseProperties.setFilter).toHaveBeenCalledWith(expect.objectContaining({ name: 'Test' }));
    expect(mockUseProperties.applyFilters).toHaveBeenCalled();
  });

  it('handles pagination correctly', async () => {
    render(<PropertiesPage />);
    
    expect(screen.getByTestId('property-filters')).toBeInTheDocument();
    expect(screen.getAllByTestId('property-card')).toHaveLength(mockProperties.length);
  });
});