import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import { Store, Action, ActionType, State } from '../utils/Store'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import dynamic from 'next/dynamic'

interface CartItem {
  slug: string;
  image: string;
  name: string;
  quantity: number;
  price: number;
  countInStock: number;
}

export default function CartScreen() {
  const { state, dispatch } = useContext<React.ReducerContext<React.Reducer<State, Action>>>(Store)
  const router = useRouter();
  const { 
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  }
  const updateCartHandler = (item: CartItem, qty: string) => {
    const quantity = Number(qty);
    dispatch({type:'CART_ADD_ITEM', payload:{...item, quantity}})
  }

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {
        cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href={"/"}>Go Shopping</Link>
        </div>
        ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-left">Quantity</th>
                  <th className="px-5 text-left">Price</th>
                  <th className="px-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <div className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          >
                          </Image>
                          &nbsp;
                          {item.name}
                        </div>
                      </Link>
                    </td>
                    <td className="pl-10 text-left">
                      {item.quantity}
                    </td>
                    <td className="p-5 text-left">
                      <select value={item.quantity} onChange={(e) => updateCartHandler(item, e.target.value)}>
                      {
                        [...Array(item.countInStock).keys()].map((x: number) => (
                          <option key={x+1} value={x+1}>
                            {x + 1}
                          </option>
                        ))
                      }
                      </select>
                    </td>
                    <td className="p-5 text-center">
                      {item.price}
                    </td>
                    <td className="p-5 text-center">
                      <button type='button' onClick={() => removeItemHandler(item)}>
                        <AiOutlineExclamationCircle className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal {cartItems.reduce((a, c) => a + c.quantity, 0)} : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push('/shipping')}
                  className="primary-button w-full">Check Out</button>
              </li>
            </ul>
          </div>
        </div>
        )
      }
    </Layout>
  )
}
//export default dynamic(() => Promise.resolve(CartScreen, {ssr:false}))