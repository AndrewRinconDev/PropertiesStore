import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertiesContainer from './propertiesContainer.component';

// Mock child components
jest.mock('../propertiesSkeleton/propertiesSkeleton.component', () => {
  return function MockPropertiesSkeleton() {
    return <div data-testid="properties-skeleton">Loading...</div>;
  };
});

jest.mock('../propertiesList/propertiesList.component', () => {
  return function MockPropertiesList({ properties }: { properties: Array<{ id: string; name: string }> }) {
    return (
      <div data-testid="properties-list">
        {properties.map((prop) => (
          <div key={prop.id} data-testid="property-item">{prop.name}</div>
        ))}
      </div>
    );
  };
});

jest.mock('../pagination/pagination.component', () => {
  return function MockPagination() {
    return <div data-testid="pagination">Pagination</div>;
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

const mockPagination = {
  page: 1,
  pageSize: 10,
  totalCount: 2,
  totalPages: 1
};

const mockFilter = {
  name: '',
  address: '',
  minPrice: '',
  maxPrice: '',
  page: '1',
  pageSize: '10'
};

const mockHandlers = {
  onPageChange: jest.fn(),
  onPageSizeChange: jest.fn()
};

describe('PropertiesContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render skeleton when loading', () => {
    render(
      <PropertiesContainer
        properties={mockProperties}
        loading={true}
        pagination={mockPagination}
        filter={mockFilter}
        onPageChange={mockHandlers.onPageChange}
        onPageSizeChange={mockHandlers.onPageSizeChange}
      />
    );

    expect(screen.getByTestId('properties-skeleton')).toBeInTheDocument();
    expect(screen.queryByTestId('properties-list')).not.toBeInTheDocument();
  });

  it('should render properties list when not loading', () => {
    render(
      <PropertiesContainer
        properties={mockProperties}
        loading={false}
        pagination={mockPagination}
        filter={mockFilter}
        onPageChange={mockHandlers.onPageChange}
        onPageSizeChange={mockHandlers.onPageSizeChange}
      />
    );

    expect(screen.getByTestId('properties-list')).toBeInTheDocument();
    expect(screen.queryByTestId('properties-skeleton')).not.toBeInTheDocument();
  });

  it('should render pagination component', () => {
    render(
      <PropertiesContainer
        properties={mockProperties}
        loading={false}
        pagination={mockPagination}
        filter={mockFilter}
        onPageChange={mockHandlers.onPageChange}
        onPageSizeChange={mockHandlers.onPageSizeChange}
      />
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('should pass correct props to child components', () => {
    render(
      <PropertiesContainer
        properties={mockProperties}
        loading={false}
        pagination={mockPagination}
        filter={mockFilter}
        onPageChange={mockHandlers.onPageChange}
        onPageSizeChange={mockHandlers.onPageSizeChange}
      />
    );

    // Check that properties are passed correctly - use getAllByTestId since there are multiple
    const propertyItems = screen.getAllByTestId('property-item');
    expect(propertyItems).toHaveLength(2);
    expect(propertyItems[0]).toHaveTextContent('Test Property 1');
    expect(propertyItems[1]).toHaveTextContent('Test Property 2');
  });

  it('should handle empty properties array', () => {
    render(
      <PropertiesContainer
        properties={[]}
        loading={false}
        pagination={mockPagination}
        filter={mockFilter}
        onPageChange={mockHandlers.onPageChange}
        onPageSizeChange={mockHandlers.onPageSizeChange}
      />
    );

    expect(screen.getByTestId('properties-list')).toBeInTheDocument();
    expect(screen.queryByTestId('property-item')).not.toBeInTheDocument();
  });

  it('should handle single property', () => {
    const singleProperty = [mockProperties[0]];
    
    render(
      <PropertiesContainer
        properties={singleProperty}
        loading={false}
        pagination={mockPagination}
        filter={mockFilter}
        onPageChange={mockHandlers.onPageChange}
        onPageSizeChange={mockHandlers.onPageSizeChange}
      />
    );

    expect(screen.getByTestId('properties-list')).toBeInTheDocument();
    expect(screen.getByTestId('property-item')).toHaveTextContent('Test Property 1');
  });

  it('should render with correct container classes', () => {
    const { container } = render(
      <PropertiesContainer
        properties={mockProperties}
        loading={false}
        pagination={mockPagination}
        filter={mockFilter}
        onPageChange={mockHandlers.onPageChange}
        onPageSizeChange={mockHandlers.onPageSizeChange}
      />
    );

    // The main container should have the flex-1 and padding classes
    const mainContainer = container.firstChild as HTMLElement;
    expect(mainContainer).toHaveClass('flex-1', 'p-6', 'lg:p-8');
  });

  it('should handle loading state transition', () => {
    const { rerender } = render(
      <PropertiesContainer
        properties={mockProperties}
        loading={true}
        pagination={mockPagination}
        filter={mockFilter}
        onPageChange={mockHandlers.onPageChange}
        onPageSizeChange={mockHandlers.onPageSizeChange}
      />
    );

    // Initially shows skeleton
    expect(screen.getByTestId('properties-skeleton')).toBeInTheDocument();

    // Rerender with loading false
    rerender(
      <PropertiesContainer
        properties={mockProperties}
        loading={false}
        pagination={mockPagination}
        filter={mockFilter}
        onPageChange={mockHandlers.onPageChange}
        onPageSizeChange={mockHandlers.onPageSizeChange}
      />
    );

    // Now shows properties list
    expect(screen.getByTestId('properties-list')).toBeInTheDocument();
    expect(screen.queryByTestId('properties-skeleton')).not.toBeInTheDocument();
  });
});
