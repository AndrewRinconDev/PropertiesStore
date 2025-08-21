import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PropertyFilters from './propertyFilters.component';

describe('PropertyFilters Component', () => {
  const mockSetFilter = jest.fn();
  const mockGetFilteredProperties = jest.fn();

  beforeEach(() => {
    mockSetFilter.mockClear();
    mockGetFilteredProperties.mockClear();
  });

  it('calls the filter function when a filter is applied', () => {
    const mockFilter = {
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
    };
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    fireEvent.click(screen.getByText('Search'));

    expect(mockGetFilteredProperties).toHaveBeenCalled();
  });

  it('calls the clear function when the clear button is clicked', () => {
    const mockFilter = {
      name: 'Test',
      address: 'Test',
      minPrice: '100',
      maxPrice: '200',
    };
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    fireEvent.click(screen.getByText('Reset'));

    expect(mockSetFilter).toHaveBeenCalledWith({ name: '', address: '', minPrice: '', maxPrice: '' });
  });

  it('updates the filter when the name input changes', () => {
    const mockFilter = {
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
    };
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Test' } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...mockFilter, name: 'Test' });
  });

  it('updates the filter when the address input changes', () => {
    const mockFilter = {
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
    };
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: 'Test' } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...mockFilter, address: 'Test' });
  });

  it('updates the filter when the min price input changes', () => {
    const mockFilter = {
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
    };
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    fireEvent.change(screen.getByPlaceholderText('Min Price'), { target: { value: '100' } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...mockFilter, minPrice: '100' });
  });

  it('updates the filter when the max price input changes', () => {
    const mockFilter = {
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
    };
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} getFilteredProperties={mockGetFilteredProperties} />);
    
    fireEvent.change(screen.getByPlaceholderText('Max Price'), { target: { value: '200' } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...mockFilter, maxPrice: '200' });
  });
});