import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertiesList from './propertiesList.component';

// Mock PropertyCard component
jest.mock('../../../properties/components/propertyCard/propertyCard.component', () => {
  return function MockPropertyCard({ property }: { property: { name: string; address: string; price: number } }) {
    return (
      <div data-testid="property-card">
        <h3>{property.name}</h3>
        <p>{property.address}</p>
        <p>${property.price}</p>
      </div>
    );
  };
});

const mockProperties = [
  {
    id: '1',
    idProperty: 'prop1',
    name: 'Test Property 1',
    address: '123 Test St',
    price: 100000,
    codeInternal: 'TP001',
    year: 2020,
    owner: {
      idOwner: 'owner1',
      name: 'Test Owner 1',
      address: 'Owner Address 1',
      photo: 'owner1.jpg',
      birthday: '1980-01-01'
    },
    images: [{ idPropertyImage: 'img1', file: 'test1.jpg', enabled: true }],
    traces: []
  },
  {
    id: '2',
    idProperty: 'prop2',
    name: 'Test Property 2',
    address: '456 Test Ave',
    price: 200000,
    codeInternal: 'TP002',
    year: 2021,
    owner: {
      idOwner: 'owner2',
      name: 'Test Owner 2',
      address: 'Owner Address 2',
      photo: 'owner2.jpg',
      birthday: '1985-01-01'
    },
    images: [{ idPropertyImage: 'img2', file: 'test2.jpg', enabled: true }],
    traces: []
  }
];

describe('PropertiesList', () => {
  it('renders the correct number of property cards', () => {
    render(<PropertiesList properties={mockProperties} />);
    
    const propertyCards = screen.getAllByTestId('property-card');
    expect(propertyCards).toHaveLength(2);
  });

  it('renders property information correctly', () => {
    render(<PropertiesList properties={mockProperties} />);
    
    expect(screen.getByText('Test Property 1')).toBeInTheDocument();
    expect(screen.getByText('Test Property 2')).toBeInTheDocument();
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
    expect(screen.getByText('456 Test Ave')).toBeInTheDocument();
    expect(screen.getByText('$100000')).toBeInTheDocument();
    expect(screen.getByText('$200000')).toBeInTheDocument();
  });

  it('handles empty properties array', () => {
    render(<PropertiesList properties={[]} />);
    
    const propertyCards = screen.queryAllByTestId('property-card');
    expect(propertyCards).toHaveLength(0);
  });

  it('handles single property', () => {
    const singleProperty = [mockProperties[0]];
    render(<PropertiesList properties={singleProperty} />);
    
    const propertyCards = screen.getAllByTestId('property-card');
    expect(propertyCards).toHaveLength(1);
    expect(screen.getByText('Test Property 1')).toBeInTheDocument();
  });

  it('renders with correct grid layout classes', () => {
    const { container } = render(<PropertiesList properties={mockProperties} />);
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xxl:grid-cols-4', 'gap-6', 'justify-items-stretch', 'mb-8');
  });
});
