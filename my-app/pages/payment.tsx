import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { State } from '../type/StoreType'
import { Store } from '../utils/Store'

export default function PaymentScreen() {
  /*const {state, dispatch} = useContext(Store)
  const {cart} = state*/
  const { state, dispatch } = useContext<StoreContextValue | undefined>(Store)
  const { cart }: State = state || { cart: {} }

  const {shippingAddress, paymentMethod} = cart
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")
  const router = useRouter()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedPaymentMethod) {
      return toast.error('Payment Method Required')
    }
    dispatch({type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod})
    Cookie.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    )
    router.push('/placeorder')
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping')
    }
    setSelectedPaymentMethod(paymentMethod || '')
  }, [])

  return (
    <Layout title="Payment Method ">
      <CheckoutWizard activeStep={2} />
      <form 
        onSubmit={(e) => submitHandler(e)}
        className="w-1/3 m-auto mt-32 px-10 py-2 bg-slate-100/60 border rounded-xl"  
      >
        <h1 className="py-6 text-3xl text-slate-500 decoration-teal-600 font-bold">Payment Method</h1>
        {
          ['PayPal', 'Stripe', 'CashOneDelivery'].map((payment) => (
            <div key={payment} className="ml-4 py-1">
              <input 
                id={payment} 
                name="paymentMethod" 
                type="radio"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
                className="my-2 px-2 text-lg"

              />
              <label htmlFor={payment} className="m-4 text-lg font-bold">{payment}</label>
            </div>
          ))
        }
        <div className="mt-6 mb-4 flex justify-between">
          <button type="button" onClick={() => router.push('/shipping')}
            className="px-10 py-2 text-slate-50 bg-sky-600 border rounded-xl hover:bg-sky-700"
          >
            Back
          </button>
          <button type="button" onClick={() => router.push('/placeorder')}
            className="px-10 py-2 text-slate-50 bg-sky-600 border rounded-xl hover:bg-sky-700"
          >
            Next
          </button>
        </div>
      </form>
    </Layout>
  )
}
