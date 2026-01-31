export interface QuizOption {
  label: string;
  value: string | number;
  icon?: string;
}

export interface QuizStep {
  id: string;
  type: 'single' | 'multi' | 'slider' | 'review';
  question: string;
  options?: QuizOption[];
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  unit?: string;
}

export interface QuizState {
  currentStep: number;
  answers: QuizAnswers;
  isCompleted: boolean;
}

export interface QuizAnswers {
  purpose?: string;
  personality?: string;
  scentFamilies?: string[];
  intensity?: number;
  budget?: string;
  gender?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  description: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: string;
  sillage: string;
  seasons: string[];
  gender: string;
  scentFamilies: string[];
  style?: string[];
  releaseYear?: number;
  tags: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sizes: { size: string; price: number }[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedSize: string;
  priceAtTime: number;
  addedAt: Date;
  name?: string;
  image?: string;
  brand?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  promoCode?: string;
  discount?: number;
  giftWrap?: boolean;
  giftMessage?: string;
}

export interface Order {
  id: string;
  number: string;
  items: CartItem[];
  total: number;
  shippingInfo: ShippingInfo;
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped';
}

export interface ShippingInfo {
  email: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
}
