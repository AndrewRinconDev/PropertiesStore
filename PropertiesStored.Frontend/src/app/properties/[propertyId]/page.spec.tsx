import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { getPropertyById } from '../services/property.service';

import PropertyDetailPage from './page';
import { mockImagesSrc, propertyDataMock } from '../../__mock__/propertyDataMock';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('../services/property.service', () => ({
  getPropertyById: jest.fn(),
}));

jest.mock('../components/propertyDescription/propertyDescription.component', () => {
  return function MockPropertyDescription({ propertyData }: { propertyData: { name: string; address: string; codeInternal: string; year: number; price: number; owner: { name: string; photo: string } } }) {
    return (
      <div data-testid="property-description">
        <h1>{propertyData.name}</h1>
        <p>{propertyData.address}</p>
        <Link href="/">Back to Properties</Link>
      </div>
    );
  };
});

jest.mock('../../core/components/imagesGallery/ImagesGallery.component', () => {
  return function MockImagesGallery({ imagesSrc, alt }: { imagesSrc: string[]; alt: string }) {
    return (
      <div data-testid="images-gallery">
        <h2>Gallery for {alt}</h2>
        <div data-testid="gallery-images">
          {imagesSrc.map((src, index) => (
            <Image
              key={index}
              alt={`${alt} ${index + 1}`}
              src={src}
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>
    );
  };
});

jest.mock('../../core/utilities/getImageData.ts/getImageData', () => ({
  getImageData: jest.fn(() => mockImagesSrc),
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;
const mockGetPropertyById = getPropertyById as jest.MockedFunction<typeof getPropertyById>;

describe('PropertyDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseParams.mockReturnValue({ propertyId: 'prop-1' });
    mockGetPropertyById.mockResolvedValue(propertyDataMock);
  });

  it('renders loading skeleton initially', () => {
    render(<PropertyDetailPage />);
    
    expect(screen.getByTestId('image-gallery-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('title-skeleton')).toBeInTheDocument();
  });

  it('renders property details after loading', async () => {
    render(<PropertyDetailPage />);
    
    // Wait for property data to load
    await waitFor(() => {
      expect(screen.getByTestId('property-description')).toBeInTheDocument();
    });
    
    // Check if property description is rendered
    expect(screen.getAllByText('Beautiful House')).toHaveLength(2); // One in header, one in description
    expect(screen.getAllByText('123 Main St')).toHaveLength(2); // One in header, one in description
    
    // Check if images gallery is rendered
    expect(screen.getByTestId('images-gallery')).toBeInTheDocument();
    expect(screen.getByText('Gallery for Beautiful House')).toBeInTheDocument();
    
    // Check if images are rendered (Next.js Image transforms URLs)
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    // Next.js Image component transforms URLs, so we check for the transformed format
    expect(images[0]).toHaveAttribute('src', expect.stringContaining('image1.jpg'));
    expect(images[1]).toHaveAttribute('src', expect.stringContaining('image2.jpg'));
  });

  it('passes correct props to PropertyDescription', async () => {
    render(<PropertyDetailPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('property-description')).toBeInTheDocument();
    });
    
    // Use the specific PropertyDescription component content
    const propertyDescription = screen.getByTestId('property-description');
    expect(propertyDescription).toHaveTextContent('Beautiful House');
    expect(propertyDescription).toHaveTextContent('123 Main St');
  });

  it('passes correct props to ImagesGallery', async () => {
    render(<PropertyDetailPage />);
    
    await waitFor(() => {
      expect(screen.getByTestId('images-gallery')).toBeInTheDocument();
    });
    
    // Check that ImagesGallery is rendered with correct content
    expect(screen.getByText('Gallery for Beautiful House')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(2);
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

  it('should render the back button and call / when click it', async () => {
    render(<PropertyDetailPage />);

    // Wait for the component to load
    await waitFor(() => {
      expect(screen.getByTestId('property-description')).toBeInTheDocument();
    });

    // Use getAllByText and select the first one (the one in the header)
    const backButtons = screen.getAllByText(/Back to Properties/);
    expect(backButtons).toHaveLength(2);
    
    const headerBackButton = backButtons[0]; // First one is in the header
    expect(headerBackButton).toBeInTheDocument();
    expect(headerBackButton).toHaveAttribute('href', '/');

    fireEvent.click(headerBackButton);

    expect(window.location.pathname).toBe('/');
  });
});
