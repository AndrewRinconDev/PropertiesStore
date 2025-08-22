import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import PropertyDescription from './propertyDescription.component';
import { IPropertyDescription } from './propertyDescription.interface';

describe('PropertyDescription', () => {
  const mockPropertyDescription = {
    name: 'Luxury Villa',
    address: 'Beverly Hills, CA',
    codeInternal: 'US',
    year: 2021,
    price: 1000000,
    owner: {
      name: 'John Doe',
      photo: '/owner.jpg',
    },
  } as IPropertyDescription;

  it('should render the property description', () => {
    render(<PropertyDescription propertyData={mockPropertyDescription} />);

    expect(screen.getByText('Luxury Villa')).toBeInTheDocument();
    expect(screen.getByText('Beverly Hills, CA')).toBeInTheDocument();
    expect(screen.getByText('US - 2021')).toBeInTheDocument();
    expect(screen.getByText('$1,000,000')).toBeInTheDocument();
    expect(screen.getByText('Owner')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('owner-Luxury Villa')).toBeInTheDocument();
  });

  it('should render the back button and call / when click it', () => {
    render(<PropertyDescription propertyData={mockPropertyDescription} />);

    const backButton = screen.getByText('⬅️ Back');
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/');

    fireEvent.click(backButton);

    expect(window.location.pathname).toBe('/');
  });
});