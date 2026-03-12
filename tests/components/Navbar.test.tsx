import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from '../../components/Navbar';

describe('Navbar Component', () => {
  it('renders the branding logo and text', () => {
    render(<Navbar />);
    expect(screen.getByText('FASHBY')).toBeInTheDocument();
    expect(screen.getByText('F')).toBeInTheDocument();
  });

  it('renders the search input with correct placeholder', () => {
    render(<Navbar />);
    expect(screen.getByPlaceholderText('Rechercher par nom, catégorie, taille...')).toBeInTheDocument();
  });

  it('renders the user account button', () => {
    render(<Navbar />);
    expect(screen.getByText('Mon Compte')).toBeInTheDocument();
  });

  it('renders the sell button', () => {
    render(<Navbar />);
    expect(screen.getByText('Vendre')).toBeInTheDocument();
  });

  it('renders correctly the icons container', () => {
    render(<Navbar />);
    const iconsContainer = screen.getByText('Mon Compte').closest('div')?.parentElement;
    expect(iconsContainer).toBeInTheDocument();
  });
});
