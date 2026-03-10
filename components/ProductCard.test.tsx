import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import ProductCard from './ProductCard';
import { Product } from '../types';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    title: 'Test Product',
    brand: 'Test Brand',
    price: 100,
    currency: 'EUR',
    imageUrl: 'https://example.com/image.jpg',
    condition: 'NEUF',
    isFavorite: false,
    category: 'Vêtements',
    size: 'M'
  };

  it('renders correctly in light mode (default)', () => {
    const { container } = render(<ProductCard product={mockProduct} />);

    // The main container should have light mode classes
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('bg-white');
    expect(cardElement).toHaveClass('border-gray-100');

    // Title and brand texts should have light mode classes
    const brandElement = container.querySelector('h3');
    expect(brandElement).toHaveClass('text-slate-800');

    const titleElement = container.querySelector('p');
    expect(titleElement).toHaveClass('text-slate-500');

    const priceElement = container.querySelector('.font-bold.text-sm');
    expect(priceElement).toHaveClass('text-slate-800');
  });

  it('renders correctly in dark mode', () => {
    const { container } = render(<ProductCard product={mockProduct} darkMode={true} />);

    // The main container should have dark mode classes
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('bg-slate-800');
    expect(cardElement).toHaveClass('border-slate-700');

    // Title and brand texts should have dark mode classes
    const brandElement = container.querySelector('h3');
    expect(brandElement).toHaveClass('text-white');

    const titleElement = container.querySelector('p');
    expect(titleElement).toHaveClass('text-slate-400');

    const priceElement = container.querySelector('.font-bold.text-sm');
    expect(priceElement).toHaveClass('text-white');
  });
});
