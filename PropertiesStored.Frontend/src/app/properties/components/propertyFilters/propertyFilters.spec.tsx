import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PropertyFilters from './propertyFilters.component';

describe('PropertyFilters Component', () => {
  const mockSetFilter = jest.fn();
  const mockApplyFilters = jest.fn();
  const mockResetFilters = jest.fn();

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
    mockApplyFilters.mockClear();
    mockResetFilters.mockClear();
  });

  it('calls the applyFilters function when Search Properties is clicked', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} applyFilters={mockApplyFilters} resetFilters={mockResetFilters} />);
    
    fireEvent.click(screen.getByText(/Search Properties/));

    expect(mockApplyFilters).toHaveBeenCalled();
  });

  it('calls the resetFilters function when the clear button is clicked', () => {
    const mockFilterWithValues = {
      ...mockFilter,
      name: 'Test',
      address: 'Test',
      minPrice: '100',
      maxPrice: '200',
    };
    render(<PropertyFilters filter={mockFilterWithValues} setFilter={mockSetFilter} applyFilters={mockApplyFilters} resetFilters={mockResetFilters} />);
    
    fireEvent.click(screen.getByText(/Clear Filters/));

    expect(mockResetFilters).toHaveBeenCalled();
  });

  it('updates the filter when the name input changes', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} applyFilters={mockApplyFilters} resetFilters={mockResetFilters} />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter property name...'), { target: { value: 'Test' } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...mockFilter, name: 'Test' });
  });

  it('updates the filter when the address input changes', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} applyFilters={mockApplyFilters} resetFilters={mockResetFilters} />);
    
    fireEvent.change(screen.getByPlaceholderText('Enter address...'), { target: { value: 'Test' } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...mockFilter, address: 'Test' });
  });

  it('updates the filter when the min price input changes', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} applyFilters={mockApplyFilters} resetFilters={mockResetFilters} />);
    
    fireEvent.change(screen.getByPlaceholderText('Min'), { target: { value: '100' } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...mockFilter, minPrice: '100' });
  });

  it('updates the filter when the max price input changes', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} applyFilters={mockApplyFilters} resetFilters={mockResetFilters} />);
    
    fireEvent.change(screen.getByPlaceholderText('Max'), { target: { value: '200' } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...mockFilter, maxPrice: '200' });
  });

  it('renders all filter inputs with correct labels', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} applyFilters={mockApplyFilters} resetFilters={mockResetFilters} />);
    
    expect(screen.getByText('Property Name')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Min Price')).toBeInTheDocument();
    expect(screen.getByText('Max Price')).toBeInTheDocument();
  });

  it('renders filter description', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} applyFilters={mockApplyFilters} resetFilters={mockResetFilters} />);
    
    expect(screen.getByText('Refine your property search')).toBeInTheDocument();
  });

  it('renders buttons with emojis', () => {
    render(<PropertyFilters filter={mockFilter} setFilter={mockSetFilter} applyFilters={mockApplyFilters} resetFilters={mockResetFilters} />);
    
    expect(screen.getByText(/🔍 Search Properties/)).toBeInTheDocument();
    expect(screen.getByText(/🗑️ Clear Filters/)).toBeInTheDocument();
  });
});
