import { createContext, useReducer, ReactNode } from 'react';

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
  type: string;
  payload?: Item;
}

interface StoreContextValue {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const Store = createContext<StoreContextValue | undefined>(undefined);

const initialState: State = {
  cart: { cartItems: [] },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload!;
      const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug);
      const cartItems = existItem 
        ? state.cart.cartItems.map((item) => (item.name === existItem.name ? newItem : item))
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: {...state.cart, cartItems} };
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