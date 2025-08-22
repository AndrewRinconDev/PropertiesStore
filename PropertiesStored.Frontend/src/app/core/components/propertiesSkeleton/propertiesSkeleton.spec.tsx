import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertiesSkeleton from './propertiesSkeleton.component';
import { PAGINATION_CONSTANTS } from '../../constants/pagination.constants';

describe('PropertiesSkeleton', () => {
  it('should render the correct number of skeleton items', () => {
    render(<PropertiesSkeleton />);
    
    const skeletonItems = screen.getAllByTestId('skeleton-item');
    expect(skeletonItems).toHaveLength(PAGINATION_CONSTANTS.SKELETON_ITEMS_COUNT);
  });

  it('should render skeleton items with correct structure', () => {
    render(<PropertiesSkeleton />);
    
    const skeletonItems = screen.getAllByTestId('skeleton-item');
    
    skeletonItems.forEach((item) => {
      expect(item).toBeInTheDocument();
      expect(item).toHaveClass('animate-pulse');
      expect(item).toHaveClass('bg-slate-100');
      expect(item).toHaveClass('rounded-xl');
    });
  });

  it('should render image skeleton for each item', () => {
    render(<PropertiesSkeleton />);
    
    const imageSkeletons = screen.getAllByTestId('image-skeleton');
    expect(imageSkeletons).toHaveLength(PAGINATION_CONSTANTS.SKELETON_ITEMS_COUNT);
    
    imageSkeletons.forEach((imageSkeleton) => {
      expect(imageSkeleton).toHaveClass('bg-slate-200');
      expect(imageSkeleton).toHaveClass('rounded-t-xl');
    });
  });

  it('should render content skeleton for each item', () => {
    render(<PropertiesSkeleton />);
    
    const contentSkeletons = screen.getAllByTestId('content-skeleton');
    expect(contentSkeletons).toHaveLength(PAGINATION_CONSTANTS.SKELETON_ITEMS_COUNT);
    
    contentSkeletons.forEach((contentSkeleton) => {
      expect(contentSkeleton).toHaveClass('p-6');
      expect(contentSkeleton).toHaveClass('space-y-4');
    });
  });

  it('should render text skeleton lines', () => {
    render(<PropertiesSkeleton />);
    
    const textLines = screen.getAllByTestId('text-skeleton');
    // 4 text lines per item * number of items
    expect(textLines).toHaveLength(PAGINATION_CONSTANTS.SKELETON_ITEMS_COUNT * 4);
  });

  it('should render button skeleton', () => {
    render(<PropertiesSkeleton />);
    
    const buttonSkeletons = screen.getAllByTestId('button-skeleton');
    expect(buttonSkeletons).toHaveLength(PAGINATION_CONSTANTS.SKELETON_ITEMS_COUNT);
    
    buttonSkeletons.forEach((buttonSkeleton) => {
      expect(buttonSkeleton).toHaveClass('bg-slate-200');
      expect(buttonSkeleton).toHaveClass('rounded-xl');
      expect(buttonSkeleton).toHaveClass('w-full');
    });
  });
});
