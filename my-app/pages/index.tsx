import { GetServerSideProps } from 'next'
import { State, StoreContextValue } from '@/type/StoreType'
import { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Layout from '@/components/Layout'
import ProductItem from '@/components/ProductItem'
import Product from '@/models/Product'
import db from '@/utils/db'
import { Store } from '@/utils/Store'

type ProductProps = {
    _id: number;
    name: string;
    slug: string;
    category: string;
    image: string;
    price: number;
    brand: string;
    rating: number;
    numReviews: number;
    countInStock: number;
    description: string;
}

type AllProductsProps = {
  products: ProductProps[];
}

export default function Home({ products }: AllProductsProps) {

  const { state, dispatch } = useContext<StoreContextValue | undefined>(Store)
  const { cart }: State = state || { cart: {} }

  const addToCartHandler = async (product: ProductProps) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < quantity) {
      return toast.error("Sorry no more in stock")
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: {...product, quantity}})
    toast.success("Product added to cart !")
  }

  return (
    <Layout title="Home page ">
      <main>

        <h1 className="ml-4 text-3xl font-bold">
          Dark mode with Tailwind and Next-themes
        </h1>

        <h2 className="mt-1 ml-4 text-2xl font-bold">E-commerce Next.js</h2>

        <div className="mt-10 mr-14 ml-14 grid grid-cols-1 gap-14 md:grid-cols-3 lg:grid-cols-3">
          {products.map((product) => (
            <ProductItem key={product.slug} product={product} addToCartHandler={addToCartHandler} />
          ))}
        </div>

      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  await db.connect()
  const products = await Product.find().lean()
  return {
    props: {
      products: products.map(db.convertDocToObj),
    }
  }
}