import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { Product } from '../types';

const mockProduct: Product = {
  id: 'p1',
  title: 'Test Product',
  brand: 'Test Brand',
  price: 1000,
  currency: 'FCFA',
  condition: 'NEUF',
  category: 'Test Category',
  imageUrl: 'https://test.com/image.jpg',
  isFavorite: false,
};

describe('ProductCard', () => {
  it('renders standard product details correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('1,000 FCFA')).toBeInTheDocument();
    expect(screen.getByText('NEUF')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.imageUrl);
    expect(image).toHaveAttribute('alt', mockProduct.title);
  });

  it('renders correctly with different condition badges', () => {
    const { rerender } = render(<ProductCard product={{ ...mockProduct, condition: 'COMME NEUF' }} />);
    expect(screen.getByText('COMME NEUF')).toBeInTheDocument();

    rerender(<ProductCard product={{ ...mockProduct, condition: 'BON ETAT' }} />);
    expect(screen.getByText('BON ETAT')).toBeInTheDocument();
  });

  it('applies dark mode classes when darkMode prop is true', () => {
    const { container } = render(<ProductCard product={mockProduct} darkMode={true} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-slate-800');
    expect(card).toHaveClass('border-slate-700');

    const brand = screen.getByText('Test Brand');
    expect(brand).toHaveClass('text-white');
  });

  it('applies light mode classes by default', () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-white');
    expect(card).toHaveClass('border-gray-100');

    const brand = screen.getByText('Test Brand');
    expect(brand).toHaveClass('text-slate-800');
  });

  it('reflects favorite status in the heart icon', () => {
    const { rerender } = render(<ProductCard product={{ ...mockProduct, isFavorite: true }} />);

    // The Heart icon should have fill="currentColor" and text-red-500 class when favorite
    const heartIcon = screen.getAllByRole('button')[0].querySelector('svg');
    expect(heartIcon).toHaveClass('text-red-500');

    rerender(<ProductCard product={{ ...mockProduct, isFavorite: false }} />);
    const heartIconEmpty = screen.getAllByRole('button')[0].querySelector('svg');
    expect(heartIconEmpty).not.toHaveClass('text-red-500');
  });
});
