import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
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
      <form onSubmit={(e) => submitHandler(e)}>
        <h1>Payment Method</h1>
        {
          ['PayPal', 'Stripe', 'CashOneDelivery'].map((payment) => (
            <div key={payment}>
              <input 
                id={payment} 
                name="paymentMethod" 
                type="radio"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />
              <label htmlFor={payment}>{payment}</label>
            </div>
          ))
        }
        <div>
          <button type="button" onClick={() => router.push('/shipping')}>Back</button>
          <button type="button" onClick={() => router.push('/placeorder')}>Next</button>
        </div>
      </form>
    </Layout>
  )
}
