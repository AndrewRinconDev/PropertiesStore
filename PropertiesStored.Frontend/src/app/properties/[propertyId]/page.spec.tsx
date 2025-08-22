import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'next/navigation';

import { getPropertyById } from '../services/property.service';
import PropertyDescription from '../components/propertyDescription/propertyDescription.component';
import ImagesGallery from '../../core/components/imagesGallery/ImagesGallery.component';
import { getImageData } from '../../core/utilities/getImageData.ts/getImageData';

import PropertyDetailPage from './page';
import { mockImagesSrc, propertyDataMock } from '@/app/__mock__/propertyDataMock';

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


  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseParams.mockReturnValue({ propertyId: 'prop-1' });
    mockGetPropertyById.mockResolvedValue(propertyDataMock);
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
    expect(screen.getAllByText('Test Property')).toHaveLength(2); // One in header, one in description
    expect(screen.getAllByText('123 Test Street')).toHaveLength(2); // One in header, one in description
    
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
      expect(mockGetImageData).toHaveBeenCalledWith(propertyDataMock.images);
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
    expect(lastCall[0]).toEqual({ propertyData: propertyDataMock });
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
      alt: propertyDataMock.name 
    });
  });

  it('handles propertyId parameter changes', async () => {
    const { rerender } = render(<PropertyDetailPage />);
    
    // Change propertyId
    mockUseParams.mockReturnValue({ propertyId: 'prop-2' });
    mockGetPropertyById.mockResolvedValueOnce({
      ...propertyDataMock,
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

  it('should render the back button and call / when click it', () => {
    render(<PropertyDescription propertyData={mockPropertyDescription} />);

    const backButton = screen.getByText(/Back to Properties/);
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/');

    fireEvent.click(backButton);

    expect(window.location.pathname).toBe('/');
  });
});
