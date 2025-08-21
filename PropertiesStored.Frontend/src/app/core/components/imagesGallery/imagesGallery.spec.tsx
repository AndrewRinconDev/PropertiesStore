import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import ImagesGallery from './ImagesGallery.component';

describe('ImagesGallery Component', () => {
  it('should display the correct number of images', () => {
    // Arrange
    const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];

    // Act
    render(<ImagesGallery imagesSrc={images} alt='images' />);

    // Assert
    const imageElements = screen.getAllByRole('img');
    expect(imageElements).toHaveLength(images.length + 1);
  });

  it('should display the first image as the selected image', () => {
    // Arrange
    const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];

    // Act
    render(<ImagesGallery imagesSrc={images} alt='images' />);

    // Assert
    const selectedImage = screen.getByLabelText('selected-image-gallery-0');
    expect(selectedImage).toBeInTheDocument();
  });

  it('should change the selected image when clicking on an image', () => {
    // Arrange
    const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];

    // Act
    const {container} = render(<ImagesGallery imagesSrc={images} alt='images' />);

    // Assert
    const selectedImage = container.querySelector('.image-principal-container')?.firstElementChild;
    const imageElements = screen.getAllByRole('img');
    const secondImage = imageElements[2];

    expect(selectedImage).toHaveAttribute('alt', 'images-0');
    expect(selectedImage).toHaveAttribute('aria-label', 'selected-image-gallery-0');

    // Act
    fireEvent.click(secondImage);

    // Assert
    expect(selectedImage).toHaveAttribute('alt', 'images-1');
    expect(selectedImage).toHaveAttribute('aria-label', 'selected-image-gallery-1');
  });

  it('should render without crashing', () => {
    // Act
    render(<ImagesGallery imagesSrc={[]} alt='images' />);

    // Assert
    expect(screen.queryByLabelText('selected-image-gallery-0')).not.toBeInTheDocument();
  });

  it('should display a message when there are no images', () => {
    // Act
    render(<ImagesGallery imagesSrc={[]} alt='images' />);

    // Assert
    expect(screen.getByText('No images available')).toBeInTheDocument();
  });
});