import { State, Item, StoreContextValue } from '@/type/StoreType'
import React, { ReactNode, useState, useEffect, useContext } from 'react'
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
import { Store } from '@/utils/Store'
import { BiFemaleSign } from 'react-icons/bi'
import { BiMaleSign } from 'react-icons/bi'

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

      <div className="flex min-h-screen flex-col justify-between
        dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-700">
        
        <header>

          <nav 
            className="mt-7 h-12 flex px-4 justify-between shadow-md item-center dark:shadow-slate-50/20">
            <a 
              href="/" 
              style={{fontFamily: "Acme"}}
              className="flex uppercase text-xl md:text-3xl leading-8 md:leading-6 
                antialiased font-bold hover:text-slate-500
                dark:text-slate-50/90 dark:hover:text-slate-50/70"
            >
              Clothing Store
            <div className="invisible md:visible flex block ml-2 justify-start text-2xl">
              <BiFemaleSign size={26}
                className="absolute top-6 text-pink-400 rounded backdrop-blur-none" />
              <BiMaleSign size={26} 
                className="absolute top-6 ml-6 text-sky-600 rounded backdrop-blur-none dark:text-cyan-400" />
            </div>
            </a>
            <div className="flex">
              <button onClick={() => router.push('/cart')} 
                className="mr-6 md:mr-10 flex md:text-xl text-slate-500 dark:text-slate-400">
                Cart
              {cartItemsCount > 0 && (
                <span className="absolute mt-4 ml-9 rounded-full bg-red-600 px-2 py-1 
                  text-xs text-white font-bold">
                  { cartItemsCount }
                </span>
              )}
              </button>
              {status === 'loading' ? (
                <p className="mr-24 flex text-xl text-slate-500 dark:text-slate-400">
                  loading
                </p>
                
                ) : session?.user ? (
                  <Menu as="div" className="mr-14 md:mr-20 text-md">
                    <Menu.Button 
                      className="md:text-xl text-sky-600 dark:text-cyan-400">
                      { session.user.name }
                    </Menu.Button>
                    <Menu.Items className="absolute z-2 right-0 w-56 origin-top-right shadow-lg">
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
                        <button className="w-full dropdown-link"
                          onClick={logoutClickHandler}>
                          Logout
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <a href="/login" 
                    className="mr-24 flex text-xl text-slate-500 dark:text-slate-400">
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

