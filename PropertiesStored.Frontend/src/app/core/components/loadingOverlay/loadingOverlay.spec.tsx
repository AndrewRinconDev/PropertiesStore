import React from 'react';
import { render, screen } from '@testing-library/react';

import LoadingOverlay from './loadingOverlay.component';

describe('LoadingOverlay', () => {
  it('should render the loading overlay', () => {
    // Arrange
    render(<LoadingOverlay />);

    // Act
    const overlayElement = screen.getByTestId('loading-overlay');

    // Assert
    expect(overlayElement).toBeInTheDocument();
  });


  it('should have the correct class name', () => {
    // Arrange
    render(<LoadingOverlay />);

    // Act
    const overlayElement = screen.getByTestId('loading-overlay');

    // Assert
    expect(overlayElement.childElementCount).toBe(2);
    expect(overlayElement.childNodes[0]).toHaveTextContent('Loading');
    expect(overlayElement.childNodes[1]).toHaveClass('animate-spin');
  });
});
