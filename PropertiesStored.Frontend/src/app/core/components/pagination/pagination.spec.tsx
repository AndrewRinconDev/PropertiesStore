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
      />
    );

    // Check if pagination info is displayed by looking for the specific text structure
    expect(screen.getByText('Showing')).toBeInTheDocument();
    expect(screen.getByText('to')).toBeInTheDocument();
    expect(screen.getByText('of')).toBeInTheDocument();
    expect(screen.getByText('results')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders correct page numbers for current page in middle', () => {
    const middlePagePagination = { ...mockPagination, page: 5 };
    
    render(
      <Pagination
        pagination={middlePagePagination}
        onPageChange={mockOnPageChange}
        currentPage={5}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    
    // Check for ellipsis (there should be at least one)
    const ellipsisElements = screen.getAllByText('...');
    expect(ellipsisElements.length).toBeGreaterThan(0);
  });

  it('does not render when there is only one page', () => {
    const singlePagePagination = { ...mockPagination, totalPages: 1 };
    
    const { container } = render(
      <Pagination
        pagination={singlePagePagination}
        onPageChange={mockOnPageChange}
        currentPage={1}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('calls onPageChange when page number is clicked', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={1}
      />
    );

    fireEvent.click(screen.getByText('2'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when next button is clicked', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={1}
      />
    );

    const nextButtons = screen.getAllByText('Next');
    const nextButton = nextButtons.find(button => button.tagName === 'BUTTON');
    fireEvent.click(nextButton!);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when previous button is clicked', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={2}
      />
    );

    const prevButtons = screen.getAllByText('Previous');
    const prevButton = prevButtons.find(button => button.tagName === 'BUTTON');
    fireEvent.click(prevButton!);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={1}
      />
    );

    const prevButtons = screen.getAllByText('Previous');
    const prevButton = prevButtons.find(button => button.tagName === 'BUTTON');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={10}
      />
    );

    const nextButtons = screen.getAllByText('Next');
    const nextButton = nextButtons.find(button => button.tagName === 'BUTTON');
    expect(nextButton).toBeDisabled();
  });

  it('shows current page as active', () => {
    render(
      <Pagination
        pagination={mockPagination}
        onPageChange={mockOnPageChange}
        currentPage={3}
      />
    );

    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass('bg-indigo-600');
  });
});
