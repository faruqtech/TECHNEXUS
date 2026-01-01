
export type Category = 'Phones' | 'Laptops' | 'Accessories' | 'All';

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: Category;
  imageUrl: string;
  sellerWhatsApp: string;
  createdAt: number;
}

export interface SellerFormData {
  title: string;
  price: string;
  description: string;
  category: Category;
  sellerWhatsApp: string;
  image: File | null;
}
