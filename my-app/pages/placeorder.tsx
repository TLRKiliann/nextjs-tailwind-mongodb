import { State, Item, StoreContextValue } from '@/type/StoreType'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Link from 'next/link'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import CheckoutWizard from '@/components/CheckoutWizard'
import Layout from '@/components/Layout'
import { getError } from '@/utils/error'
import { Store } from '@/utils/Store'

export default function PlaceorderScreen() {
  const { state, dispatch } = useContext<StoreContextValue | undefined>(Store)
  const { cart }: State = state || { cart: {} }
  const { cartItems, shippingAddress, paymentMethod } = cart

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100
  const itemsPrice = round2(cartItems.reduce((a, c) => a + c.quantity * c.price, 0))

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15)
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice)

  const router = useRouter()

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment')
    }
  }, [paymentMethod, router])

  const [loading, setLoading] = useState<boolean>(false)

  const placeOrderHandler = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
      setLoading(false)
      dispatch({ type: 'CART_CLEAR_ITEMS' })
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      )
      router.push(`/order/${data._id}`)
    } catch(err) {
      setLoading(true)
      toast.error(getError(err))
    }
  }

  return (
    <Layout>
      <CheckoutWizard activeStep={3} />
      <h1 className="m-4 text-2xl">Place Order</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty !
          <Link href="/">
            Go shopping
          </Link>
        </div>
      ) : (
      <div>
        <div className="flex">
          <div className="w-2/3 flex-col">

            <div className="p-4 m-4 border rounded-lg">
              <h2 className="text-xl py-1 font-bold">
                Shipping Address
              </h2>
              <div className="mb-4 ml-2 flex-col">
                <p>{shippingAddress.fullName}</p>
                <p>{shippingAddress.address}</p>
                <p>{shippingAddress.city}</p>
                <p>{shippingAddress.postalCode}</p>
                <p>{shippingAddress.country}</p>
              </div>
              <Link href="/shipping" className="secondary-button">Edit</Link>
            </div>
            <div className="p-4 m-4 border rounded-lg">
              <h2 className="text-xl py-1 font-bold">Payment Method</h2>
              <div className="mb-4 ml-2">{paymentMethod}</div>
              <Link href="/payment" className="secondary-button">Edit</Link>
            </div>
          </div>

          <div className="w-1/3 p-4 m-4 border rounded-lg">
            <h2 className="mb-4 py-1 text-xl font-bold">Order Items</h2>
            <table className="mb-8">
              <thead className="border">
                <tr>
                  <th className="px-5 text-left">Item1</th>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-center">Quantity</th>
                  <th className="px-5 text-center">Price</th>
                </tr>
              </thead>
              <tbody className="m-auto border">
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <a href={`/product/${item.slug}`}>
                        <Image
                          src={item.image}
                          width={50}
                          height={50}
                          alt={item.name}
                          className="m-auto"
                        />
                        <span className="ml-1 text-xs">{item.name}</span>
                      </a>
                    </td>
                    <td className="px-8">{item.quantity}</td>
                    <td className="px-8">${item.price}</td>
                    <td className="px-8">${item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <Link href="/cart" className="secondary-button">Edit</Link>
            </div>
          </div>
        </div>
        <div className="m-4 p-4 border rounded-lg">
          <h2 className="text-xl py-1 font-bold">Order Summary</h2>
          <ul>
            <li>
              <div className="ml-2 flex items-center">
                <div className="text-lg">Items: &nbsp;</div>
                <div>{itemsPrice}</div>
              </div>
            </li>
            <li>
              <div className="ml-2 flex items-center">
                <div className="text-lg">Tax: &nbsp;</div>
                <div>{taxPrice}</div>
              </div>
            </li>
            <li>
              <div className="ml-2 flex items-center">
                <div className="text-lg">Shipping: &nbsp;</div>
                <div>{shippingPrice}</div>
              </div>
            </li>
            <li>
              <div className="mt-2 ml-2 flex items-center">
                <div className="text-xl font-bold">Total: &nbsp;</div>
                <div className="text-xl font-bold">${totalPrice}</div>
              </div>
            </li>
            <li className="mt-4">
              <button
                disabled={loading}
                type="button"
                onClick={placeOrderHandler}
                className="secondary-button w-full"
              >
                {loading ? 'loading...' : 'Place Order'}
              </button>
            </li>
          </ul>
        </div>
      </div>
      )}
    </Layout>
  )
}

PlaceorderScreen.auth = true;