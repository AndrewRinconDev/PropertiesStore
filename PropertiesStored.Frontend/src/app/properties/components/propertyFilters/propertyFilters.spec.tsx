import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PropertyFilters from './propertyFilters.component';

describe('PropertyFilters Component', () => {
  const mockSetFilter = jest.fn();
  const mockGetFilteredProperties = jest.fn();

  const mockFilter = {
    name: '',
    address: '',
    minPrice: '',
    maxPrice: '',
    page: '1',
    pageSize: '10'
  };

  beforeEach(() => {
    mockSetFilter.mockClear();
    mockGetFilteredProperties.mockClear();
  });

  it('calls the filter function when a filter is applied', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    fireEvent.click(screen.getByText(/Search Properties/));

    expect(mockGetFilteredProperties).toHaveBeenCalled();
  });

  it('calls the clear function when the clear button is clicked', () => {
    const mockFilterWithValues = {
      ...mockFilter,
      name: 'Test',
      address: 'Test',
      minPrice: '100',
      maxPrice: '200',
    };
    render(<PropertyFilters filter={mockFilterWithValues} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    fireEvent.click(screen.getByText(/Clear Filters/));

    expect(mockSetFilter).toHaveBeenCalledWith({
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
      page: '1',
      pageSize: '10'
    });
  });

  it('updates the filter when the name input changes', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter property name...'), { target: { value: 'Test' } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...mockFilter, name: 'Test' });
  });

  it('updates the filter when the address input changes', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter address...'), { target: { value: 'Test' } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...mockFilter, address: 'Test' });
  });

  it('updates the filter when the min price input changes', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    fireEvent.change(screen.getByPlaceholderText('Min'), { target: { value: '100' } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...mockFilter, minPrice: '100' });
  });

  it('updates the filter when the max price input changes', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    fireEvent.change(screen.getByPlaceholderText('Max'), { target: { value: '200' } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...mockFilter, maxPrice: '200' });
  });

  it('renders all filter inputs with correct labels', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    expect(screen.getByText('Property Name')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Min Price')).toBeInTheDocument();
    expect(screen.getByText('Max Price')).toBeInTheDocument();
  });

  it('renders filter description', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    expect(screen.getByText('Refine your property search')).toBeInTheDocument();
  });

  it('renders buttons with emojis', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    expect(screen.getByText(/🔍 Search Properties/)).toBeInTheDocument();
    expect(screen.getByText(/🗑️ Clear Filters/)).toBeInTheDocument();
  });
});
