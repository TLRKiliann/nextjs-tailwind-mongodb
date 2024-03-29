import { useRouter } from 'next/router' //navigation doesn't work
import { useSession } from 'next-auth/react';
import { useEffect, useReducer } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import Layout from '@/components/Layout'
import { getError } from '@/utils/error'

interface OrderState {
  loading: boolean;
  error: string;
  order: {
  _id?: string;
  shippingAddress?: string;
  paymentMethod?: string;
  orderItems?: [];
  itemsPrice?: number;
  taxPrice?: number;
  shippingPrice?: number;
  totalPrice?: number;
  isPaid?: boolean;
  paidAt?: string;
  isDelivered?: boolean;
  deliveredAt?: string;
  };
}

type OrderAction =
  | { type: 'FETCH_REQUEST' }
  | { type: 'FETCH_SUCCESS'; payload: OrderState['order'] }
  | { type: 'FETCH_FAIL'; payload: string };


function reducer(state: OrderState, action: OrderAction) {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function OrderScreen() {
  const { data: session } = useSession();

  const { query } = useRouter();
  console.log(query)
  const orderId = query?.id;

  const [{ loading, error, order }, dispatch, ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch(err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order, orderId]);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  return (
    <Layout title={`Order ${orderId}`}>
      <h1 className="m-2">{`Order : ${orderId}`}</h1>
      {loading ? (
      <div>Loading...</div>
      ) : error ? (
      <div className="alert-error">{error}</div>
      ) : (
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card p-5">
            <h2>Shipping Address</h2>
            <div>
              {shippingAddress.fullName},
              {shippingAddress.address}, {' '},
              {shippingAddress.city},
              {shippingAddress.postalCode}, {' '},
              {shippingAddress.country}
            </div>
            {isDelivered ? (
              <div className="alert-success">Delivered at {deliveredAt}</div>
            ) : (
              <div className="alert-error">Not delivered</div>
            )}
          </div>

          <div className="card p-5">
            <h2>Payment Method</h2>
            <div>
              {paymentMethod}
            </div>
            {isPaid ? (
              <div className="alert-success">Paid at {paidAt}</div>
            ) : (
              <div className="alert-error">Not paid</div>
            )}
          </div>
          <div className="card overflow-x-auto p-5">
            <h2 className="mb-2 text-lg">Order Items</h2>
            
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-center">Quantity</th>
                  <th className="px-5 text-center">Price</th>
                  <th className="px-5 text-center">Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {orderItems.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td>
                      <a href={`/product/${item.slug}`} className="px-4 flex items-center text-sm">
                        <Image
                          src={item.image}
                          width={50}
                          height={50}
                          alt={item.name}
                          style={{
                            maxWidth: '100%',
                            height: 'auto',
                          }}
                        />
                        {item.name}
                      </a>
                    </td>
                    <td className="p-5 text-center">{item.quantity}</td>
                    <td className="p-5 text-center">${item.price}</td>
                    <td className="p-5 text-center">${item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-5">
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

            <li className="flex w-full mt-2">
              <Link
                href={'/'}
                className="paypal-button w-full flex justify-center"
              >
                <Image src={'/../public/images/paypal.png'} width={50} height={50} alt="paypay logo" />
              </Link>
            </li>

            <li className="flex w-full mt-2">
              <Link
                href={'/'}
                className="stripe-button w-full text-center"
              >
                Stripe
              </Link>
            </li>

          </ul>
        </div>

      </div>
      )}
    </Layout>
  )
}
OrderScreen.auth = true;
export default OrderScreen;