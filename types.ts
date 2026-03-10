export interface Product {
  id: string;
  title: string;
  brand: string;
  price: number;
  currency: string;
  condition: 'NEUF' | 'COMME NEUF' | 'BON ETAT';
  imageUrl: string;
  category: string;
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  label: string;
  isActive?: boolean;
}

export interface FilterOption {
  label: string;
  value: string;
}