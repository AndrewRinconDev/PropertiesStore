import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'next/navigation';

import { getPropertyById } from '../services/property.service';
import propertyModel from '../models/property.model';
import PropertyDescription from '../components/propertyDescription/propertyDescription.component';
import ImagesGallery from '../../core/components/imagesGallery/ImagesGallery.component';
import { getImageData } from '../../core/utilities/getImageData.ts/getImageData';

import PropertyDetailPage from './page';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('../services/property.service');
jest.mock('../components/propertyDescription/propertyDescription.component');
jest.mock('../../core/components/imagesGallery/ImagesGallery.component');
jest.mock('../../core/utilities/getImageData.ts/getImageData');

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockGetPropertyById = getPropertyById as jest.MockedFunction<typeof getPropertyById>;
const mockPropertyDescription = PropertyDescription as jest.MockedFunction<typeof PropertyDescription>;
const mockImagesGallery = ImagesGallery as jest.MockedFunction<typeof ImagesGallery>;
const mockGetImageData = getImageData as jest.MockedFunction<typeof getImageData>;

describe('PropertyDetailPage', () => {
  const mockProperty: propertyModel = {
    id: '1',
    idProperty: 'prop-1',
    name: 'Test Property',
    address: '123 Test Street',
    price: 250000,
    codeInternal: 'TP001',
    year: 2020,
    owner: {
      idOwner: 'owner-1',
      name: 'John Doe',
      address: '456 Owner Street',
      photo: 'owner-photo.jpg',
      birthday: '1990-01-01'
    },
    images: [
      { idPropertyImage: 'img-1', file: 'image1.jpg', enabled: true },
      { idPropertyImage: 'img-2', file: 'image2.jpg', enabled: true }
    ],
    traces: [
      { idPropertyTrace: 'trace-1', dateSale: '2020-01-01', name: 'Sale 1', value: 200000, tax: '5%' }
    ]
  };

  const mockImagesSrc = ['image1.jpg', 'image2.jpg'];

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseParams.mockReturnValue({ propertyId: 'prop-1' });
    mockGetPropertyById.mockResolvedValue(mockProperty);
    mockGetImageData.mockReturnValue(mockImagesSrc);
    
    mockPropertyDescription.mockImplementation(({ propertyData }) => (
      <div data-testid="property-description">
        <h1>{propertyData.name}</h1>
        <p>{propertyData.address}</p>
      </div>
    ));
    
    mockImagesGallery.mockImplementation(({ imagesSrc, alt }) => (
      <div data-testid="images-gallery">
        <h2>Gallery for {alt}</h2>
        <div data-testid="gallery-images">
          {imagesSrc.map((src, index) => (
            <img key={index} src={src} alt={`${alt} ${index + 1}`} />
          ))}
        </div>
      </div>
    ));
  });

  it('renders loading skeleton initially', () => {
    render(<PropertyDetailPage />);
    
    // Should show skeleton while loading
    expect(screen.getByTestId('image-gallery-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('title-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('price-skeleton')).toBeInTheDocument();
  });

  it('renders property details after loading', async () => {
    render(<PropertyDetailPage />);
    
    // Wait for property data to load
    await waitFor(() => {
      expect(screen.getByTestId('property-description')).toBeInTheDocument();
    });
    
    // Check if property description is rendered
    expect(screen.getByText('Test Property')).toBeInTheDocument();
    expect(screen.getByText('123 Test Street')).toBeInTheDocument();
    
    // Check if images gallery is rendered
    expect(screen.getByTestId('images-gallery')).toBeInTheDocument();
    expect(screen.getByText('Gallery for Test Property')).toBeInTheDocument();
    
    // Check if images are rendered
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'image1.jpg');
    expect(images[1]).toHaveAttribute('src', 'image2.jpg');
  });

  it('calls getPropertyById with correct propertyId', async () => {
    render(<PropertyDetailPage />);
    
    await waitFor(() => {
      expect(mockGetPropertyById).toHaveBeenCalledWith('prop-1');
    });
  });

  it('calls getImageData with property images', async () => {
    render(<PropertyDetailPage />);
    
    await waitFor(() => {
      expect(mockGetImageData).toHaveBeenCalledWith(mockProperty.images);
    });
  });

  it('passes correct props to PropertyDescription', async () => {
    render(<PropertyDetailPage />);
    
    await waitFor(() => {
      expect(mockPropertyDescription).toHaveBeenCalled();
    });
    
    // Check that PropertyDescription was called with the correct props
    const calls = mockPropertyDescription.mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    
    const lastCall = calls[calls.length - 1];
    expect(lastCall[0]).toEqual({ propertyData: mockProperty });
  });

  it('passes correct props to ImagesGallery', async () => {
    render(<PropertyDetailPage />);
    
    await waitFor(() => {
      expect(mockImagesGallery).toHaveBeenCalled();
    });
    
    // Check that ImagesGallery was called with the correct props
    const calls = mockImagesGallery.mock.calls;
    expect(calls.length).toBeGreaterThan(0);
    
    const lastCall = calls[calls.length - 1];
    expect(lastCall[0]).toEqual({ 
      imagesSrc: mockImagesSrc, 
      alt: mockProperty.name 
    });
  });

  it('handles propertyId parameter changes', async () => {
    const { rerender } = render(<PropertyDetailPage />);
    
    // Change propertyId
    mockUseParams.mockReturnValue({ propertyId: 'prop-2' });
    mockGetPropertyById.mockResolvedValueOnce({
      ...mockProperty,
      id: '2',
      idProperty: 'prop-2',
      name: 'Test Property 2'
    });
    
    rerender(<PropertyDetailPage />);
    
    await waitFor(() => {
      expect(mockGetPropertyById).toHaveBeenCalledWith('prop-2');
    });
  });

  it('handles error gracefully', async () => {
    mockGetPropertyById.mockRejectedValueOnce(new Error('Failed to fetch'));
    
    render(<PropertyDetailPage />);
    
    // Should still show skeleton while "loading"
    expect(screen.getByTestId('image-gallery-skeleton')).toBeInTheDocument();
    
    // Wait for error to be handled
    await waitFor(() => {
      expect(mockGetPropertyById).toHaveBeenCalled();
    });
  });

  it('renders with correct CSS classes', async () => {
    render(<PropertyDetailPage />);
    
    const mainSection = screen.getByTestId('image-gallery-skeleton').closest('section');
    expect(mainSection).toHaveClass('property-detail-page-section');
    
    const imagesContainer = screen.getByTestId('image-gallery-skeleton').parentElement;
    expect(imagesContainer).toHaveClass('property-images-container');
    
    const infoContainer = screen.getByTestId('title-skeleton').closest('.property-info-container');
    expect(infoContainer).toBeInTheDocument();
  });
});
