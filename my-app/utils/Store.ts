import { createContext, useReducer } from 'react'

export const Store = createContext<any>({});

const initialState = {
  cart: { cartItems: [] },
}

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item: { slug: any; }) => item.slug === newItem.slug
      )
      const cartItems = existItem 
        ? state.cart.cartItems.map((item: { name: any; }) =>
          item.name === existItem.name ? newItem : item
        )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: {...state.cart, cartItems }}
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}