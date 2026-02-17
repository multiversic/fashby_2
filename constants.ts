import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', label: 'Femmes', isActive: true },
  { id: '2', label: 'Homme', isActive: false },
  { id: '3', label: 'Chaussures', isActive: false },
  { id: '4', label: 'Sacs', isActive: false },
  { id: '5', label: 'Accessoires', isActive: false },
  { id: '6', label: 'Luxe', isActive: false },
];

export const FILTERS = [
  "Taille", "Couleur", "État", "Localisation", "Prix", "Marque"
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Veste Rouge Élégante',
    brand: 'Fass heule',
    price: 39000,
    currency: 'FCFA',
    condition: 'NEUF',
    category: 'Femmes',
    imageUrl: 'https://picsum.photos/id/435/400/500', // Woman fashion
    isFavorite: false,
  },
  {
    id: 'p2',
    title: 'Sneakers Beige Daim',
    brand: 'Bellame tout',
    price: 25000,
    currency: 'FCFA',
    condition: 'COMME NEUF',
    category: 'Chaussures',
    imageUrl: 'https://picsum.photos/id/103/400/500', // Shoes
    isFavorite: true,
  },
  {
    id: 'p3',
    title: 'Nike Air Max Noir',
    brand: 'Gucci',
    price: 25000,
    currency: 'FCFA',
    condition: 'BON ETAT',
    category: 'Chaussures',
    imageUrl: 'https://picsum.photos/id/345/400/500', // Sneakers mock
    isFavorite: true,
  },
  {
    id: 'p4',
    title: 'Sac à Main Beige',
    brand: 'Gucci A Veltte',
    price: 18000,
    currency: 'FCFA',
    condition: 'BON ETAT',
    category: 'Sacs',
    imageUrl: 'https://picsum.photos/id/654/400/500', // Bag mock
    isFavorite: true,
  }
];

export const NEW_PRODUCTS: Product[] = [
  {
    id: 'n1',
    title: 'Sac Rouge Cuir',
    brand: 'Dolce & Gabbana',
    price: 59000,
    currency: 'FCFA',
    condition: 'NEUF',
    category: 'Sacs',
    imageUrl: 'https://picsum.photos/id/987/400/500',
  },
  {
    id: 'n2',
    title: 'Sneakers Blanches',
    brand: 'Nike Air Max',
    price: 25000,
    currency: 'FCFA',
    condition: 'NEUF',
    category: 'Chaussures',
    imageUrl: 'https://picsum.photos/id/177/400/500',
    isFavorite: true,
  },
  {
    id: 'n3',
    title: 'Sac Brun Classique',
    brand: 'Gucci',
    price: 95000,
    currency: 'FCFA',
    condition: 'NEUF',
    category: 'Sacs',
    imageUrl: 'https://picsum.photos/id/299/400/500',
  },
  {
    id: 'n4',
    title: 'Veste Denim Homme',
    brand: 'Focart',
    price: 28000,
    currency: 'FCFA',
    condition: 'NEUF',
    category: 'Hommes',
    imageUrl: 'https://picsum.photos/id/883/400/500',
  }
];