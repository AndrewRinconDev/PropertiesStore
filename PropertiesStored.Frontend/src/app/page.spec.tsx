import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { getAllProperties } from './properties/services/property.service';
import propertyModel from './properties/models/property.model';
import PropertyFilters from './properties/components/propertyFilters/propertyFilters.component';
import PropertyCard from './properties/components/propertyCard/propertyCard.component';
import LoadingOverlay from './core/components/loadingOverlay/loadingOverlay.component';

import PropertiesPage from './page';

jest.mock('./properties/services/property.service');
jest.mock('./properties/components/propertyFilters/propertyFilters.component');
jest.mock('./properties/components/propertyCard/propertyCard.component');
jest.mock('./core/components/loadingOverlay/loadingOverlay.component');

describe('PropertiesPage', () => {
  const mockProperties: propertyModel[] = [
    { idProperty: '1', name: 'Property 1', address: 'Address 1', price: 100000 },
    { idProperty: '2', name: 'Property 2', address: 'Address 2', price: 200000 },
  ]  as propertyModel[];

  beforeEach(() => {
    (getAllProperties as jest.Mock).mockResolvedValue(mockProperties);
    (PropertyFilters as jest.Mock).mockImplementation(({ filter, setFilter, getFilteredProperties }) => (
      <div data-testid="property-filters">
        <button onClick={() => setFilter({ ...filter, name: 'Test' })}>Set Filter</button>
        <button onClick={getFilteredProperties}>Get Properties</button>
      </div>
    ));
    (PropertyCard as jest.Mock).mockImplementation(({ property }) => (
      <div data-testid="property-card">{property.name}</div>
    ));
    (LoadingOverlay as jest.Mock).mockImplementation(() => <div data-testid="loading-overlay">Loading...</div>);
  });

  it('renders loading overlay initially', () => {
    render(<PropertiesPage />);
    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
  });

  it('renders property filters and property cards after loading', async () => {
    render(<PropertiesPage />);
    await waitFor(() => expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument());
    expect(screen.getByTestId('property-filters')).toBeInTheDocument();
    expect(screen.getAllByTestId('property-card')).toHaveLength(mockProperties.length);
  });

  it('updates properties when filter is applied', async () => {
    render(<PropertiesPage />);
    
    await waitFor(() => expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument());

    fireEvent.click(screen.getByText('Set Filter'));
    fireEvent.click(screen.getByText('Get Properties'));

    await waitFor(() => expect(getAllProperties).toHaveBeenCalledWith(expect.objectContaining({ name: 'Test' })));
  });
});