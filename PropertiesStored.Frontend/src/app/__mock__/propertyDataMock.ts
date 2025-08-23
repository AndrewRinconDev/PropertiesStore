import propertyModel from "@/app/properties/models/property.model";

export const propertyDataMock = {
  id: "1",
  idProperty: "1",
  codeInternal: "US",
  year: 2021,
  name: "Beautiful House",
  address: "123 Main St",
  price: 1000000,
  images: [
    {
      idPropertyImage: "property-image-1",
      file: "/house.jpg",
      enabled: true,
    },
  ],
  owner: {
    name: "John Doe",
    photo: "/owner.jpg",
  },
  traces: [
    {
      idPropertyTrace: "1",
      date: "2021-01-01",
      value: 1000000,
    },
  ],
} as unknown as propertyModel;

export const mockPropertyData = {
  id: "1",
  idProperty: "1",
  codeInternal: "US",
  year: 2021,
  name: "Test Property",
  address: "123 Test St",
  price: 100000,
  images: [
    {
      idPropertyImage: "property-image-1",
      file: "/test1.jpg",
      enabled: true,
    },
  ],
  owner: {
    name: "John Doe",
    photo: "/owner.jpg",
  },
  traces: [
    {
      idPropertyTrace: "1",
      date: "2021-01-01",
      value: 100000,
    },
  ],
} as unknown as propertyModel;

export const secondPropertyDataMock = {
  id: "2",
  idProperty: "prop2",
  name: "Property 2",
  address: "Address 2",
  price: 200000,
  codeInternal: "TP002",
  year: 2021,
  owner: {
    idOwner: "owner2",
    name: "Test Owner 2",
    address: "Owner Address 2",
    photo: "/owner2.jpg",
    birthday: "1985-01-01",
  },
  images: [{ idPropertyImage: "img2", file: "/test2.jpg", enabled: true }],
  traces: [],
} as unknown as propertyModel;

export const mockProperties: propertyModel[] = [
  propertyDataMock,
  secondPropertyDataMock,
] as propertyModel[];

export const mockPagination = {
  page: 1,
  pageSize: 12,
  totalCount: 2,
  totalPages: 1,
};

export const mockUseProperties = {
  properties: mockProperties,
  loading: false,
  initialLoad: false,
  pagination: mockPagination,
  filter: {
    name: '',
    address: '',
    minPrice: '',
    maxPrice: '',
    page: '1',
    pageSize: '12'
  },
  setFilter: jest.fn(),
  applyFilters: jest.fn(),
  resetFilters: jest.fn(),
  getFilteredProperties: jest.fn(),
  handlePageChange: jest.fn(),
  handlePageSizeChange: jest.fn(),
};

export const mockImagesSrc = ['/image1.jpg', '/image2.jpg'];
