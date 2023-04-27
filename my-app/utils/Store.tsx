import React, { createContext, useReducer, ReactNode } from 'react'
import { State, StoreContextValue, StoreAction, Item } from '../type/StoreType'
import Cookies from 'js-cookie'

interface Props {
  children: React.ReactNode;
}

export const Store = createContext<StoreContextValue | undefined>(undefined);

const initialState: State = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart')!)
    : { cartItems: [], shippingAddress: {}, paymentMethod: '' },
};

function reducer(state: State, action: StoreAction): State {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload!;
      const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);
      const cartItems = existItem
        ? state.cart.cartItems.map((item) => (item.name === existItem.name ? newItem : item))
        : [...state.cart.cartItems, newItem];
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter((item) => item.slug !== action.payload!.slug);
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { 
        ...state,
        cart:
          { ...state.cart, cartItems }
      }
    }
    case 'CART_RESET': {
      Cookies.set('cart', JSON.stringify({ ...initialState.cart }));
      return { 
        ...state,
        cart: { 
          ...initialState.cart } };
    }
    case 'CART_CLEAR_ITEMS':
      return {
        ...state,
        cart: { 
          ...state.cart, cartItems: [] }
      }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          }
        }
      }
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        }
      }
    default:
      return state;
  }
}

export function StoreProvider({ children }: Props): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value: StoreContextValue = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}