import { renderHook, act } from '@testing-library/react';
import { useProperties } from './useProperties';
import { getAllProperties } from '../../properties/services/property.service';

// Mock the service
jest.mock('../../properties/services/property.service');
const mockGetAllProperties = getAllProperties as jest.MockedFunction<typeof getAllProperties>;

// Mock data
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

describe('useProperties', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetAllProperties.mockResolvedValue({
      properties: mockProperties,
      pagination: mockPagination
    });
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useProperties());

    expect(result.current.properties).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.initialLoad).toBe(true);
    expect(result.current.pagination).toEqual({
      page: 1,
      pageSize: 10,
      totalCount: 0,
      totalPages: 0
    });
    expect(result.current.filter).toEqual({
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
      page: '1',
      pageSize: '10'
    });
  });

  it('should fetch properties on mount', async () => {
    renderHook(() => useProperties());

    // Wait for the initial fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockGetAllProperties).toHaveBeenCalledWith({
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
      page: '1',
      pageSize: '10'
    });
  });

  it('should handle page change', async () => {
    const { result } = renderHook(() => useProperties());

    await act(async () => {
      result.current.handlePageChange(2);
    });

    expect(mockGetAllProperties).toHaveBeenCalledWith({
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
      page: '2',
      pageSize: '10'
    });
  });

  it('should handle page size change', async () => {
    const { result } = renderHook(() => useProperties());

    await act(async () => {
      result.current.handlePageSizeChange('25');
    });

    expect(mockGetAllProperties).toHaveBeenCalledWith({
      name: '',
      address: '',
      minPrice: '',
      maxPrice: '',
      page: '1',
      pageSize: '25'
    });
  });

  it('should handle API errors gracefully', async () => {
    mockGetAllProperties.mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useProperties());

    // Wait for the initial fetch
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.properties).toEqual([]);
    expect(result.current.pagination).toEqual({
      page: 1,
      pageSize: 10,
      totalCount: 0,
      totalPages: 0
    });
  });

  it('should update filter state correctly', async () => {
    const { result } = renderHook(() => useProperties());

    await act(async () => {
      result.current.setFilter({
        name: 'Test Property',
        address: 'Test Address',
        minPrice: '100000',
        maxPrice: '300000',
        page: '1',
        pageSize: '10'
      });
    });

    expect(result.current.filter.name).toBe('Test Property');
    expect(result.current.filter.address).toBe('Test Address');
    expect(result.current.filter.minPrice).toBe('100000');
    expect(result.current.filter.maxPrice).toBe('300000');
  });

  it('should reset filters correctly', async () => {
    const { result } = renderHook(() => useProperties());

    // First set some filters
    await act(async () => {
      result.current.setFilter({
        name: 'Test Property',
        address: 'Test Address',
        minPrice: '100000',
        maxPrice: '300000',
        page: '1',
        pageSize: '10'
      });
    });

    // Then reset
    await act(async () => {
      result.current.resetFilters();
    });

    expect(result.current.filter.name).toBe('');
    expect(result.current.filter.address).toBe('');
    expect(result.current.filter.minPrice).toBe('');
    expect(result.current.filter.maxPrice).toBe('');
    expect(result.current.filter.page).toBe('1');
    expect(result.current.filter.pageSize).toBe('10');
  });
});
