
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import SellerModal from './components/SellerModal';
import ProductDetailModal from './components/ProductDetailModal';
import { Product, Category } from './types';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max - 256GB',
    price: 1199,
    description: 'Barely used iPhone 15 Pro Max. Natural Titanium color. Includes all original accessories and box.',
    category: 'Phones',
    imageUrl: 'https://picsum.photos/id/160/600/400',
    sellerWhatsApp: '2348000000000',
    createdAt: Date.now() - 86400000
  },
  {
    id: '2',
    title: 'MacBook Pro M3 Max 14"',
    price: 2499,
    description: '14-inch MacBook Pro with M3 Max chip, 36GB RAM, 1TB SSD. Space Black. Like new condition.',
    category: 'Laptops',
    imageUrl: 'https://picsum.photos/id/1/600/400',
    sellerWhatsApp: '2348000000000',
    createdAt: Date.now() - 172800000
  },
  {
    id: '3',
    title: 'Sony WH-1000XM5 Headphones',
    price: 350,
    description: 'Industry leading noise canceling headphones. Silver color. Used for 2 months.',
    category: 'Accessories',
    imageUrl: 'https://picsum.photos/id/21/600/400',
    sellerWhatsApp: '2348000000000',
    createdAt: Date.now() - 43200000
  }
];

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Initialize data
  useEffect(() => {
    const saved = localStorage.getItem('technexus_products');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('technexus_products', JSON.stringify(INITIAL_PRODUCTS));
    }
  }, []);

  const handleAddProduct = (newProduct: Product) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    localStorage.setItem('technexus_products', JSON.stringify(updated));
    setIsSellerModalOpen(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar 
        onOpenSeller={() => setIsSellerModalOpen(true)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="flex items-center space-x-4 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {(['All', 'Phones', 'Laptops', 'Accessories'] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hero Banner Simulation */}
        <div className="relative h-48 md:h-64 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-600 mb-8 overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 flex flex-col justify-center h-full px-8 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">Upgrade Your Gear</h1>
            <p className="text-lg opacity-90 max-w-md">Connect directly with verified tech sellers. No middlemen, better prices.</p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
            <svg className="w-64 h-64 text-white fill-current" viewBox="0 0 24 24">
              <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-4H7V4h10v12z" />
            </svg>
          </div>
        </div>

        <ProductGrid 
          products={filteredProducts} 
          onSelectProduct={setSelectedProduct} 
        />
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-orange-600">TechNexus</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 TechNexus Marketplace. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      {isSellerModalOpen && (
        <SellerModal 
          onClose={() => setIsSellerModalOpen(false)} 
          onSubmit={handleAddProduct}
        />
      )}

      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default App;
