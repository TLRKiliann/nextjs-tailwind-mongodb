'use client'

import { StoreContextValue, Item } from '@/type/StoreType'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'
import dynamic from 'next/dynamic'
import Layout from '@/components/Layout'
import { Store } from '@/utils/Store'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

const CartScreen = () => {
  const { state, dispatch } = useContext<StoreContextValue | undefined>(Store)
  const router = useRouter();
  const { cart: { cartItems },} = state;

  const removeItemHandler = (item: Item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  }
  const updateCartHandler = async (item: Item, qty: string) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`)
    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock !")
    }
    dispatch({type:'CART_ADD_ITEM', payload:{...item, quantity}})
    toast.success("Product updated to cart !")
  }

  return (
    <Layout title="Shopping Cart">
      <h1 className="m-4 text-xl">Shopping Cart</h1>
      {
        cartItems.length === 0 ? (
        <div className="m-4">
          Cart is empty. 
          <Link href={"/"} className="rounded-full ml-4 text-slate-50 primary-button"
          >
            Go Shopping
          </Link>
        </div>
        ) : (
        <div className="m-4 grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border">
                <tr>
                  <th className="px-5 text-left">Item1</th>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-center">Quantity</th>
                  <th className="px-5 text-center">Price</th>
                  <th className="px-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: Item) => (
                  <tr key={item.slug} className="border">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <div className="flex-col items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={70}
                            height={70}
                            className="mb-0 ml-3"
                          />
                          &nbsp;
                          <p className="ml-2 text-xs">{item.name}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="pl-10 text-left">
                      {item.quantity}
                    </td>
                    <td className="p-5 text-center">
                      <select 
                        value={item.quantity}
                        onChange={(e) => updateCartHandler(item, e.target.value)}
                      >
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
                      ${item.price}
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
export default dynamic(() => Promise.resolve(CartScreen, {ssr: false}))