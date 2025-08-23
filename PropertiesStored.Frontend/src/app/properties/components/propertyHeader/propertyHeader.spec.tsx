import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyHeader from './propertyHeader.component';
import { mockLuxuryVilla } from '../__mocks__/propertyDataMock';

describe('PropertyHeader', () => {
  const mockProps = {
    name: mockLuxuryVilla.name,
    address: mockLuxuryVilla.address
  };

  it('renders property name correctly', () => {
    render(<PropertyHeader {...mockProps} />);
    
    expect(screen.getByText('Luxury Villa')).toBeInTheDocument();
  });

  it('renders property address correctly', () => {
    render(<PropertyHeader {...mockProps} />);
    
    expect(screen.getByText('Beverly Hills, CA')).toBeInTheDocument();
  });

  it('renders location emoji', () => {
    render(<PropertyHeader {...mockProps} />);
    
    expect(screen.getByText('📍')).toBeInTheDocument();
  });

  it('renders back button with correct text', () => {
    render(<PropertyHeader {...mockProps} />);
    
    expect(screen.getByText('Back to Properties')).toBeInTheDocument();
  });

  it('renders back button with correct href', () => {
    render(<PropertyHeader {...mockProps} />);
    
    const backButton = screen.getByRole('link', { name: /Back to Properties/ });
    expect(backButton).toHaveAttribute('href', '/');
  });

  it('renders back button with emoji', () => {
    render(<PropertyHeader {...mockProps} />);
    
    expect(screen.getByText('⬅️')).toBeInTheDocument();
  });

  it('applies correct styling classes to header container', () => {
    const { container } = render(<PropertyHeader {...mockProps} />);
    
    const headerContainer = container.firstChild as HTMLElement;
    expect(headerContainer).toHaveClass('md:mb-8', 'w-full', 'flex', 'flex-wrap', 'justify-between', 'items-center');
  });

  it('applies correct styling classes to title container', () => {
    const { container } = render(<PropertyHeader {...mockProps} />);
    
    const titleContainer = container.querySelector('.w-full.md\\:w-2\\/3.lg\\:w-1\\/2');
    expect(titleContainer).toBeInTheDocument();
  });

  it('applies correct styling classes to back button container', () => {
    const { container } = render(<PropertyHeader {...mockProps} />);
    
    const buttonContainer = container.querySelector('.relative.flex.w-full.md\\:w-1\\/3.lg\\:w-1\\/2.justify-end.py-4');
    expect(buttonContainer).toBeInTheDocument();
  });
});
