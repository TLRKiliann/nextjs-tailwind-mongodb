import React, { useContext, Dispatch } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { data } from '../../utils/data'
import { Store } from '../../utils/Store'
import { State, Cart, Item } from '../../type/StoreType'

/*
interface SubProductProps {
  slug: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  price: number;
  countInStock: number;
  description: string;
  rating: number;
  numReviews: number;
}
*/
interface ProductProps {
    slug: string;
    name: string;
    category: string;
    brand: string;
    image: string;
    price: number;
    countInStock: number;
    description: string;
    rating: number;
    numReviews: number;
}

interface Action {
  type: 'CART_RESET';
  payload?: Item;
}

type StoreStateValues = {
  state?: State;
  dispatch: Dispatch<Action>;
}

export default function ProductScreen() {
  const { state, dispatch } = useContext<StoreStateValues>(Store)
  const router = useRouter()
  const { query } = useRouter()
  const { slug } = query as {slug: string}

  const product: ProductProps = data.products.find(x => x.slug === slug)

  if (!product) {
    return <div>Product Not Found</div>
  }

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x: Product) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert("Sorry no more in stock")
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: {...product, quantity}})
    router.push('/cart')
  }

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href={'/'} className="ml-4 rounded-full primary-button 
          text-blue-800 hover:text-white"
        >
          Back to products
        </Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={680}
            height={680}
          />
        </div>
        <div>
          
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>{product.rating} of {product.numReviews} reviews</li>
            <li>Description: {product.description}</li>
          </ul>

        </div>
        <div>
          <div className="card p-5">

            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>  
            </div>

            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>  
            </div>

            <button
              type='button'
              onClick={addToCartHandler}
              className="primary-button w-full"
            >
              Add to cart
            </button>

          </div>
        </div>
      </div>
    </Layout>
  )
}