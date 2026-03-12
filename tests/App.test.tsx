import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import '@testing-library/jest-dom';
import App from '../App';
import * as geminiService from '../services/geminiService';
import { CATEGORIES, FEATURED_PRODUCTS } from '../constants';

// Mock lucide-react icons
vi.mock('lucide-react', () => {
  return {
    Search: () => <span data-testid="icon-search" />,
    Menu: () => <span data-testid="icon-menu" />,
    Filter: () => <span data-testid="icon-filter" />,
    ShoppingBag: () => <span data-testid="icon-shoppingbag" />,
    Heart: () => <span data-testid="icon-heart" />,
    User: () => <span data-testid="icon-user" />,
    Sparkles: () => <span data-testid="icon-sparkles" />,
    SlidersHorizontal: () => <span data-testid="icon-sliders" />,
    MapPin: () => <span data-testid="icon-mappin" />,
    ArrowRight: () => <span data-testid="icon-arrowright" />,
    Bell: () => <span data-testid="icon-bell" />,
    MessageCircle: () => <span data-testid="icon-messagecircle" />,
  };
});

// Mock the AI service
vi.mock('../services/geminiService');

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the main sections correctly', () => {
    render(<App />);

    // Check Hero section
    expect(screen.getByText(/Trouvez la pièce parfaite/i)).toBeInTheDocument();

    // Check AI search input
    expect(screen.getByPlaceholderText(/Ex: Tenue pour un mariage.../i)).toBeInTheDocument();

    // Check Category Pills
    CATEGORIES.forEach(cat => {
      const elements = screen.getAllByText(cat.label);
      expect(elements.length).toBeGreaterThan(0);
    });

    // Check some products
    if (FEATURED_PRODUCTS.length > 0) {
      const productElements = screen.getAllByText(FEATURED_PRODUCTS[0].title);
      expect(productElements.length).toBeGreaterThan(0);
    }

    // Check footer
    expect(screen.getByText(/2024 Fashby Market. Tous droits réservés/i)).toBeInTheDocument();
  });

  it('changes active category on click', () => {
    render(<App />);

    const secondCategory = CATEGORIES[1];
    // Find the category button
    const categoryButton = screen.getAllByText(secondCategory.label).find(el => el.tagName.toLowerCase() === 'button');

    if (categoryButton) {
      fireEvent.click(categoryButton);
      expect(categoryButton.className).toContain('bg-slate-900');
    } else {
      throw new Error('Category button not found');
    }
  });

  it('handles AI search input and form submission', async () => {
    const mockAdvice = "Voici un conseil de style généré par l'IA.";
    vi.mocked(geminiService.getStylingAdvice).mockResolvedValue(mockAdvice);

    render(<App />);

    const input = screen.getByPlaceholderText(/Ex: Tenue pour un mariage.../i);
    const submitButton = screen.getByRole('button', { name: /Découvrir/i });

    // Type query
    fireEvent.change(input, { target: { value: 'robe rouge' } });
    expect(input).toHaveValue('robe rouge');

    // Submit form
    fireEvent.click(submitButton);

    // Loading state
    expect(submitButton).toHaveTextContent('...');
    expect(submitButton).toBeDisabled();

    // Wait for the mock response
    await waitFor(() => {
      expect(screen.getByText(mockAdvice)).toBeInTheDocument();
    });

    expect(geminiService.getStylingAdvice).toHaveBeenCalledWith('robe rouge');
    expect(submitButton).not.toBeDisabled();
  });

  it('handles AI search error', async () => {
    vi.mocked(geminiService.getStylingAdvice).mockRejectedValue(new Error('API error'));

    render(<App />);

    const input = screen.getByPlaceholderText(/Ex: Tenue pour un mariage.../i);
    const submitButton = screen.getByRole('button', { name: /Découvrir/i });

    fireEvent.change(input, { target: { value: 'robe bleue' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Désolé, je n'ai pas pu générer de conseil pour le moment./i)).toBeInTheDocument();
    });

    expect(geminiService.getStylingAdvice).toHaveBeenCalledWith('robe bleue');
  });

  it('does not trigger AI search for empty queries', async () => {
    render(<App />);

    const submitButton = screen.getByRole('button', { name: /Découvrir/i });

    fireEvent.click(submitButton);

    expect(geminiService.getStylingAdvice).not.toHaveBeenCalled();
  });
});
