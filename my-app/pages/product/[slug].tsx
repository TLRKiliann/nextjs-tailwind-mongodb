import { GetServerSideProps } from 'next'
import { StoreContextValue, Item } from '@/type/StoreType'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Layout from '@/components/Layout'
import { Store } from '@/utils/Store'
import db from '@/utils/db'
import Product from '@/models/Product'

type ProductProps = {
  product: {
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
}

export default function ProductScreen(props: ProductProps) {
  const { product } = props;
  const { state, dispatch } = useContext<StoreContextValue | undefined>(Store)
  const router = useRouter()

  if (!product) {
    return <Layout title="Product Not Found">Product Not Found</Layout>
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`)

    if (data.countInStock < quantity) {
      return toast.error("Sorry no more in stock")
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: {...product, quantity}})
    router.push('/cart')
  }

  return (
    <Layout title={product.name}>
      <div className="md:ml-12">
        <Link href={'/'} className="text-lg text-sky-500"
        >
          Back to products
        </Link>
      </div>
      <div className="mb-4 md:ml-12 ml-1 grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="rounded shadow-lg"
          />
        </div>

        <div className="m-2">
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
          <div className="card p-5 md:mr-12">
            
            <div className="mb-2 flex justify-between">
              <div>Price :</div>
              <div>${product.price}</div>  
            </div>

            <div className="mb-2 flex justify-between">
              <div>Status :</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>  
            </div>
            <div>
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
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { params } = context
  const { slug } = params

  await db.connect()
  const product = await Product.findOne({ slug }).lean()
  await db.disconnect()

  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    }
  }
}