
import React, { useState } from 'react';
import { Product, Category, SellerFormData } from '../types';

interface SellerModalProps {
  onClose: () => void;
  onSubmit: (product: Product) => void;
}

const SellerModal: React.FC<SellerModalProps> = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState<SellerFormData>({
    title: '',
    price: '',
    description: '',
    category: 'Phones',
    sellerWhatsApp: '',
    image: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic Validation
    if (!form.title || !form.price || !form.sellerWhatsApp) {
      alert("Please fill in the required fields");
      setIsSubmitting(false);
      return;
    }

    // In a real app, you'd upload the image to a server/storage
    // Here we use the local blob for demo
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      title: form.title,
      price: parseFloat(form.price),
      description: form.description,
      category: form.category,
      imageUrl: preview || 'https://picsum.photos/600/400',
      sellerWhatsApp: form.sellerWhatsApp.replace(/\+/g, '').replace(/\s/g, ''),
      createdAt: Date.now()
    };

    setTimeout(() => {
      onSubmit(newProduct);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Post an Ad</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[75vh]">
          <div className="space-y-4">
            {/* Image Upload */}
            <div className="flex flex-col items-center">
              <div 
                className={`w-full h-40 border-2 border-dashed rounded-xl flex items-center justify-center bg-gray-50 cursor-pointer overflow-hidden relative ${preview ? 'border-orange-500' : 'border-gray-300 hover:border-orange-400'}`}
                onClick={() => document.getElementById('image-input')?.click()}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm text-gray-500 font-medium">Click to upload product image</span>
                  </div>
                )}
                <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. iPhone 13"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Price ($) *</label>
                <input
                  type="number"
                  required
                  placeholder="99.99"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  value={form.price}
                  onChange={e => setForm({...form, price: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
              <select
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all appearance-none"
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value as Category})}
              >
                <option value="Phones">Phones</option>
                <option value="Laptops">Laptops</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp Number *</label>
              <input
                type="tel"
                required
                placeholder="2348000000000"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                value={form.sellerWhatsApp}
                onChange={e => setForm({...form, sellerWhatsApp: e.target.value})}
              />
              <p className="text-[10px] text-gray-400 mt-1">Include country code without + (e.g. 2348012345678)</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Tell buyers more about your product..."
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition-all h-24 resize-none"
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-orange-200 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Posting...' : 'Post Ad Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerModal;
