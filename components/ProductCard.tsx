import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  darkMode?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, darkMode = false }) => {
  const badgeColors = {
    'NEUF': 'bg-blue-600 text-white',
    'COMME NEUF': 'bg-lime-500 text-white',
    'BON ETAT': 'bg-amber-200 text-amber-800',
  };

  const textColor = darkMode ? 'text-white' : 'text-slate-800';
  const subTextColor = darkMode ? 'text-slate-400' : 'text-slate-500';
  const cardBg = darkMode ? 'bg-slate-800' : 'bg-white';
  const borderColor = darkMode ? 'border-slate-700' : 'border-gray-100';

  return (
    <div className={`group relative flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${cardBg} border ${borderColor}`}>
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${badgeColors[product.condition]}`}>
          {product.condition === 'NEUF' && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>}
          {product.condition}
        </span>

        {/* Action Buttons overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/90 backdrop-blur rounded-full text-slate-800 hover:bg-white hover:text-red-500 transition-colors shadow-sm">
             <Heart size={18} fill={product.isFavorite ? "currentColor" : "none"} className={product.isFavorite ? "text-red-500" : ""} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className={`font-semibold text-sm truncate pr-2 ${textColor}`}>{product.brand}</h3>
          {product.isFavorite && !darkMode && <Heart size={14} className="text-slate-300 fill-slate-300" />}
        </div>
        <p className={`text-xs ${subTextColor} mb-3 truncate`}>{product.title}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className={`font-bold text-sm ${textColor}`}>
            {product.price.toLocaleString()} {product.currency}
          </span>
          <button className={`p-1.5 rounded-full hover:bg-slate-100 transition-colors ${darkMode ? 'hover:bg-slate-700 text-slate-300' : 'text-slate-400'}`}>
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);