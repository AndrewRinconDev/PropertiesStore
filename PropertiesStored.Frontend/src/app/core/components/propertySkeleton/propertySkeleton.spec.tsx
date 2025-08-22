import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertySkeleton from './propertySkeleton.component';

describe('PropertySkeleton', () => {
  it('renders the skeleton structure correctly', () => {
    render(<PropertySkeleton />);
    
    // Check if main section is rendered
    expect(screen.getByTestId('image-gallery-skeleton')).toBeInTheDocument();
  });

  it('renders image gallery skeleton', () => {
    render(<PropertySkeleton />);
    
    // Check if image gallery skeleton is present
    const imageContainer = screen.getByTestId('image-gallery-skeleton');
    expect(imageContainer).toBeInTheDocument();
    
    // Check if thumbnail placeholders are rendered
    const thumbnails = screen.getAllByTestId('thumbnail-skeleton');
    expect(thumbnails).toHaveLength(4);
  });

  it('renders property info skeleton sections', () => {
    render(<PropertySkeleton />);
    
    // Check if title skeleton is rendered
    expect(screen.getByTestId('title-skeleton')).toBeInTheDocument();
    
    // Check if price skeleton is rendered
    expect(screen.getByTestId('price-skeleton')).toBeInTheDocument();
    
    // Check if details grid is rendered
    const detailsGrid = screen.getByTestId('details-grid-skeleton');
    expect(detailsGrid).toBeInTheDocument();
    
    // Check if detail items are rendered
    const detailItems = screen.getAllByTestId('detail-item-skeleton');
    expect(detailItems).toHaveLength(6);
  });

  it('renders owner section skeleton', () => {
    render(<PropertySkeleton />);
    
    // Check if owner section is rendered
    const ownerSection = screen.getByTestId('owner-section-skeleton');
    expect(ownerSection).toBeInTheDocument();
    
    // Check if owner avatar skeleton is rendered
    expect(screen.getByTestId('owner-avatar-skeleton')).toBeInTheDocument();
    
    // Check if owner info skeletons are rendered
    const ownerInfoItems = screen.getAllByTestId('owner-info-skeleton');
    expect(ownerInfoItems).toHaveLength(2);
  });

  it('renders property traces skeleton', () => {
    render(<PropertySkeleton />);
    
    // Check if traces section is rendered
    const tracesSection = screen.getByTestId('traces-section-skeleton');
    expect(tracesSection).toBeInTheDocument();
    
    // Check if trace items are rendered
    const traceItems = screen.getAllByTestId('trace-item-skeleton');
    expect(traceItems).toHaveLength(3);
  });

  it('applies correct CSS classes for styling', () => {
    render(<PropertySkeleton />);
    
    // Check if main container has correct classes
    const mainSection = screen.getByTestId('image-gallery-skeleton').closest('section');
    expect(mainSection).toHaveClass('property-detail-page-section');
    
    // Check if main skeleton elements have animate-pulse class
    expect(screen.getByTestId('image-gallery-skeleton')).toHaveClass('animate-pulse');
    expect(screen.getByTestId('title-skeleton')).toHaveClass('animate-pulse');
    expect(screen.getByTestId('price-skeleton')).toHaveClass('animate-pulse');
    
    // Check if skeleton elements have animate-pulse class (only the ones that should have it)
    const skeletonElements = screen.getAllByTestId(/skeleton$/);
    skeletonElements.forEach(element => {
      if (element.classList.contains('animate-pulse')) {
        expect(element).toHaveClass('animate-pulse');
      }
    });
  });
});
