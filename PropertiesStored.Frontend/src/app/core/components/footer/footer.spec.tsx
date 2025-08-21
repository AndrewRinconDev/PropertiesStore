import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from './footer.component';

describe('Footer Component', () => {
  it('should render without crashing', async () => {
    // Act
    const { getByText } = await render(<Footer />);

    // Assert
    const footerText = getByText('All reserved rights ©');
    expect(footerText).toBeInTheDocument();
  });

  it('should display the correct year', () => {
    // Arrange
    const currentYear = new Date().getFullYear();

    // Act
    render(<Footer />);
    
    // Assert
    const footerText = screen.getByText(`${currentYear} Andrés Rincón`);
    expect(footerText).toBeInTheDocument();
  });
});