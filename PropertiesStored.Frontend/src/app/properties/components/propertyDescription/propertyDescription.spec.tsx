import React from 'react';
import { render, screen } from '@testing-library/react';

import PropertyDescription from './propertyDescription.component';
import { mockPropertyDescription } from '../__mocks__/propertyDataMock';

describe('PropertyDescription', () => {
  
  it('should render the property description', () => {
    render(<PropertyDescription propertyData={mockPropertyDescription} />);

    expect(screen.getByText('Property Price')).toBeInTheDocument();
    expect(screen.getByText('$1,000,000')).toBeInTheDocument();
    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('US')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
    expect(screen.getByText('Property Owner')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByAltText('Owner: John Doe')).toBeInTheDocument();
  });
});