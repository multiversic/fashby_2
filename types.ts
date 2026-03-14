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
