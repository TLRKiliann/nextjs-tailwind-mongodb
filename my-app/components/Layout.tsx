import React, { useContext } from 'react'
import Head from 'next/head'
import { Store } from '../utils/Store'

export default function Layout({ title, children }: any) {

  const { state, dispatch } = useContext(Store)
  const { Cart } = state
  
  return (
    <>

      <Head>
        <title>{title ? title + "- corp" : "e-commerce corp"}</title>
        <meta name="description" content="e-commerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="mt-6 flex h-12 px-4 justify-between shadow-md item-center">
            <a href="/" className="text-lg text-bold">
              Corporation
            </a>
            <div>
              <a href="/cart" className="p-2">Cart
              {cart.cartItems.length > 0 && (
                <span className="ml-1 rounded-full bgg-red-600 px-2 py-1 
                  text-xs font-bold text-white">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </span>
              )}
              </a>
              <a href="/login" className="mr-12 p-2">Login</a>
            </div>
          </nav>
        </header>
        <main className="w-full m-auto mt-4">
          {children}
        </main>
        <footer className="flex h-12 justify-center items-center shadow-inner">
          <p>Copyright © 2023 Corporation</p>
        </footer>
      </div>

    </>
  )
}