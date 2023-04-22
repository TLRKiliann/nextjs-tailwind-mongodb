import { StoreContextValue, State } from '@/type/StoreType'
import React, { useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Layout from '@/components/Layout'
import CheckoutWizard from '@/components/CheckoutWizard'
import { Store } from '@/utils/Store'

type FormValues = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function ShippingScreen() {
  const { handleSubmit, register, formState: {errors}, setValue } = useForm<FormValues>()

  const { state, dispatch } = useContext<StoreContextValue | undefined>(Store)
  const { cart }: State = state;
  const { shippingAddress } = cart;
  const router = useRouter()

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName)
    setValue('address', shippingAddress.address)
    setValue('city', shippingAddress.city)
    setValue('postalCode', shippingAddress.postalCode)
    setValue('country', shippingAddress.country)
  }, [setValue, shippingAddress])

  const submitHandler = ({ fullName, address, city, postalCode, country }: FormValues) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    })
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: { fullName, address, city, postalCode, country }
      })
    )
    router.push('/payment')
  }
  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />

      <form className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}>
        <h1 className="mb-4 text-xl">
          Shipping Address
        </h1>

        <div>
          <label htmlFor="fullName">
            Full Name
          </label>
          <input id="fullName" className="w-full"
            autoFocus{...register('fullName', {
              required: 'Please enter full name !'
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">
              {errors.fullName.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="address">
            Address
          </label>
          <input id="address" className="w-full"
            autoFocus{...register('address', {
              required: 'Please enter address !',
              minLength: {value: 3, message: 'address is more than 3 chars'}
            })}
          />
          {errors.address && (
            <div className="text-red-500">
              {errors.address.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="city">
            City
          </label>
          <input id="city" className="w-full"
            autoFocus{...register('city', {
              required: 'Please enter city !',
            })}
          />
          {errors.city && (
            <div className="text-red-500">
              {errors.city.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="postalCode">
            Postal Code
          </label>
          <input id="postalCode" className="w-full"
            autoFocus{...register('postalCode', {
              required: 'Please enter postal code !',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">
              {errors.postalCode.message}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="country">
            Country
          </label>
          <input id="country" className="w-full"
            autoFocus{...register('country', {
              required: 'Please enter country !',
            })}
          />
          {errors.country && (
            <div className="text-red-500">
              {errors.country.message}
            </div>
          )}
        </div>

        <div className="mb-4 flex justify-between">
          <button className="secondary-button mt-2">Next</button>
        </div>

      </form>
    </Layout>
  )
}

ShippingScreen.auth = true;