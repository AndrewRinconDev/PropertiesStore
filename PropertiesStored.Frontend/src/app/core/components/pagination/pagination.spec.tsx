import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './pagination.component';
import { paginationModel } from '../../../properties/models/property.model';

describe('Pagination', () => {
  const mockPagination: paginationModel = {
    page: 1,
    pageSize: 12,
    totalCount: 120,
    totalPages: 10,
  };
  const mockOnPageSizeChange = jest.fn();

  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders pagination controls when there are multiple pages', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={1}
        onPageSizeChange={mockOnPageSizeChange}
        currentPageSize="12"
      />
    );

    // Check if pagination info is displayed using partial text matching
    expect(screen.getByText(/Showing/)).toBeInTheDocument();
    expect(screen.getByText(/results/)).toBeInTheDocument();
    
    // Check for page numbers (only the button ones, not the select options)
    const pageButtons = screen.getAllByRole('button').filter(button => 
      /^[0-9]+$/.test(button.textContent || '')
    );
    expect(pageButtons.some(btn => btn.textContent === '1')).toBe(true);
    expect(pageButtons.some(btn => btn.textContent === '2')).toBe(true);
    expect(pageButtons.some(btn => btn.textContent === '3')).toBe(true);
    expect(pageButtons.some(btn => btn.textContent === '4')).toBe(true);
    expect(pageButtons.some(btn => btn.textContent === '10')).toBe(true);
    
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('renders correct page numbers for current page in middle', () => {
    const middlePagePagination = { ...mockPagination, page: 5 };
    
    render(
      <Pagination
        pagination={middlePagePagination}
        onPageChange={mockOnPageChange}
        currentPage={5}
        onPageSizeChange={mockOnPageSizeChange}
        currentPageSize="12"
      />
    );

    // Use more specific selectors to avoid conflicts with page size options
    const pageButtons = screen.getAllByRole('button').filter(button => 
      /^[0-9]+$/.test(button.textContent || '')
    );
    
    expect(pageButtons.some(btn => btn.textContent === '1')).toBe(true);
    expect(pageButtons.some(btn => btn.textContent === '4')).toBe(true);
    expect(pageButtons.some(btn => btn.textContent === '5')).toBe(true);
    expect(pageButtons.some(btn => btn.textContent === '6')).toBe(true);
    expect(pageButtons.some(btn => btn.textContent === '10')).toBe(true);
    
    // Check for ellipsis (there should be at least one)
    const ellipsisElements = screen.getAllByText('...');
    expect(ellipsisElements.length).toBeGreaterThan(0);
  });

  it('renders pagination even when there is only one page', () => {
    const singlePagePagination = { ...mockPagination, totalPages: 1 };
    
    render(
      <Pagination
        pagination={singlePagePagination}
        onPageChange={mockOnPageChange}
        currentPage={1}
        onPageSizeChange={mockOnPageSizeChange}
        currentPageSize="12"
      />
    );

    // Should still render the pagination component
    expect(screen.getByText(/Showing/)).toBeInTheDocument();
    expect(screen.getByText(/results/)).toBeInTheDocument();
  });

  it('calls onPageChange when page number is clicked', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={1}
        onPageSizeChange={mockOnPageSizeChange}
        currentPageSize="12"
      />
    );

    // Find the button with text "2" that is actually clickable
    const pageButtons = screen.getAllByRole('button').filter(button => 
      button.textContent === '2' && !(button as HTMLButtonElement).disabled
    );
    expect(pageButtons.length).toBeGreaterThan(0);
    
    fireEvent.click(pageButtons[0]);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when next button is clicked', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={1}
        onPageSizeChange={mockOnPageSizeChange}
        currentPageSize="12"
      />
    );

    // Find the next button by looking for the SVG icon button with Next label in desktop version
    const nextButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('span[class*="sr-only"]')?.textContent === 'Next'
    );
    expect(nextButtons.length).toBeGreaterThan(0);
    
    fireEvent.click(nextButtons[0]);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when previous button is clicked', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={2}
        onPageSizeChange={mockOnPageSizeChange}
        currentPageSize="12"
      />
    );

    // Find the previous button by looking for the SVG icon button with Previous label in desktop version
    const prevButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('span[class*="sr-only"]')?.textContent === 'Previous'
    );
    expect(prevButtons.length).toBeGreaterThan(0);
    
    fireEvent.click(prevButtons[0]);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={1}
        onPageSizeChange={mockOnPageSizeChange}
        currentPageSize="12"
      />
    );

    // Find the previous button by looking for the SVG icon button with Previous label in desktop version
    const prevButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('span[class*="sr-only"]')?.textContent === 'Previous'
    );
    expect(prevButtons.length).toBeGreaterThan(0);
    expect(prevButtons[0]).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={10}
        onPageSizeChange={mockOnPageSizeChange}
        currentPageSize="12"
      />
    );

    // Find the next button by looking for the SVG icon button with Next label in desktop version
    const nextButtons = screen.getAllByRole('button').filter(button => 
      button.querySelector('span[class*="sr-only"]')?.textContent === 'Next'
    );
    expect(nextButtons.length).toBeGreaterThan(0);
    expect(nextButtons[0]).toBeDisabled();
  });

  it('shows current page as active', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={3}
        onPageSizeChange={mockOnPageSizeChange}
        currentPageSize="12"
      />
    );

    // Find the button with text "3" that has the active styling
    const pageButtons = screen.getAllByRole('button').filter(button => 
      button.textContent === '3' && button.className.includes('bg-gradient-to-r')
    );
    expect(pageButtons.length).toBeGreaterThan(0);
  });

  it('calls onPageSizeChange when page size is changed', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={1}
        onPageSizeChange={mockOnPageSizeChange}
        currentPageSize="12"
      />
    );

    const pageSizeSelect = screen.getByLabelText('Show:');
    fireEvent.change(pageSizeSelect, { target: { value: '25' } });
    expect(mockOnPageSizeChange).toHaveBeenCalledWith('25');
  });
});
