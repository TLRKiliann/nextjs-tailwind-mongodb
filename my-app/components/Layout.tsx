import Head from 'next/head'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ToastContainer } from 'react-toastify'
import React, { useState, useEffect, useContext } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { Store } from '../utils/Store'

interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }) {
  
  const { status, data: session } = useSession();

  const { state } = useContext(Store)
  const { cart } = state
  const [cartItemsCount, setCartItemsCount] = useState<number>(0)
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])
  return (
    <>

      <Head>
        <title>{title ? title + "- corp" : "e-commerce corp"}</title>
        <meta name="description" content="e-commerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="mt-6 flex h-12 px-4 justify-between shadow-md item-center">
            <a href="/" className="text-lg text-bold">
              Corporation
            </a>
            <div>
              <a href="/cart" className="p-2">Cart
              {cartItemsCount > 0 && (
                <span className="ml-1 rounded-full bgg-red-600 px-2 py-1 
                  text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
              </a>
              {status === 'loading' ? (
                'loading'
                ) :
                session?.user ? (
                  session.user.name 
                ) : (
                  <a href="/login" className="mr-12 p-2">Login</a>
              )}
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