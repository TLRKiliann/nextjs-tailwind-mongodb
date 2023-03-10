import { createContext, useReducer, ReactNode, Dispatch } from 'react';
import Cookie from 'js-cookie';

interface Item {
  quantity: number;
  name: string;
  slug: string;
}

interface Cart {
  cartItems: Item[];
}

interface State {
  cart: Cart;
}

interface Action {
  type: 'CART_ADD_ITEM' | 'CART_REMOVE_ITEM';
  payload?: Item;
}

interface StoreContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}

export const Store = createContext<StoreContextValue | undefined>(undefined);

const initialState: State = {
  cart: Cookie.get('cart')
    ? JSON.parse(Cookie.get('cart'))
    : { cartItems: [] },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload!;
      const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);
      const cartItems = existItem
        ? state.cart.cartItems.map((item) => (item.name === existItem.name ? newItem : item))
        : [...state.cart.cartItems, newItem];
      Cookie.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter((item) => item.slug !== action.payload!.slug);
      Cookie.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

interface Props {
  children: ReactNode;
}

export function StoreProvider({ children }: Props): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value: StoreContextValue = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}