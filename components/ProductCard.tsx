
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col h-full border border-gray-100"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2">
          <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 text-lg mb-1 truncate">{product.title}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-extrabold text-orange-600">
            {formatPrice(product.price)}
          </span>
          <button className="bg-gray-100 p-2 rounded-full text-gray-400 group-hover:text-orange-500 group-hover:bg-orange-50 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
