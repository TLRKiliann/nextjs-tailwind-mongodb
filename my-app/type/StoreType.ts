import { Dispatch } from 'react'

export type Item = {
  quantity: number;
  name: string;
  slug: string;
  image: string;
  price: number;
}

export type Cart = {
  cartItems: Item[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    location: object;
  };
  paymentMethod: string;
}

export type State = {
  cart: Cart;
}

export type StoreAction = {
  type: 'CART_ADD_ITEM' | 'CART_REMOVE_ITEM' | 'CART_RESET' | 'SAVE_SHIPPING_ADDRESS';
  payload?: Item;
}

export type StoreContextValue = {
  state: State | null;
  dispatch: Dispatch<StoreAction>;
}

export type User = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export type Product = {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  description: string;
}

export type Data = {
  users: User[];
  products: Product[];
}