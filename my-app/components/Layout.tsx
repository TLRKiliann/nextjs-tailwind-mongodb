import { State, Item, StoreContextValue } from '@/type/StoreType'
import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Cookies from 'js-cookie'
import { ToastContainer } from 'react-toastify'
import { Menu } from '@headlessui/react'
import 'react-toastify/dist/ReactToastify.css'
import ThemeColor from './ThemeColor'
import SuperHead from './SuperHead'
import Footer from './Footer'
import DropdownLink from './DropdownLink'
import { Store } from './../utils/Store'

interface PropsValues {
  title?: string;
  children: React.ReactNode;
}

export default function Layout({ title, children }: PropsValues) {
  const router = useRouter()
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext<StoreContextValue | undefined>(Store)
  const { cart }: State = state || { cart: {} }
  const [cartItemsCount, setCartItemsCount] = useState<number>(0)

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
  }, [cart.cartItems])

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' })
    signOut()
  }
  return (
    <>
    
      <SuperHead title={title} />

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        
        <header>

          <nav className="mt-7 flex h-12 px-4 justify-between shadow-md item-center">
            <a href="/" className="text-lg text-bold">
              Clothing Store
            </a>
            <div>
              <button onClick={() => router.push('/cart')} className="mr-20 text-md">
                Cart
              {cartItemsCount > 0 && (
                <span className="absolute ml-1 mt-2 rounded-full bg-red-600 px-1 py-1 
                  text-xs font-bold text-white">
                  { cartItemsCount }
                </span>
              )}
              </button>
              {status === 'loading' ? (
                <p className="mr-12 p-2 flex items-center">
                  loading
                </p>
                ) :
                session?.user ? (
                  <Menu as="div" className="mr-10 relative inline-block">
                    <Menu.Button className="text-blue-600">
                      { session.user.name }
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/order_history">
                          Order history
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <button className="dropdown-link"
                          onClick={logoutClickHandler}>
                          Logout
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <a href="/login" className="mr-20">
                    Login
                  </a>
              )}

              <ThemeColor />
            
            </div>
          </nav>
        </header>

        <main className="w-full m-auto mt-4">
          {children}
        </main>
        
        <Footer />
      
      </div>
    </>
  )
}

