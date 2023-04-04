import React from 'react'
import { useRouter } from 'next/navigation'

type ProductProps = {
  product: {
    name: string,
    slug: string,
    category: string,
    image: string,
    price: number,
    brand: string,
    rating: number,
    numReviews: number,
    countInStock: number,
    description: string
  }
}

export default function ProductItem({ product }: ProductProps) {
  const router = useRouter()
  const handleRoute = () => {
    router.push(`/product/${product.slug}`)
  }
  return (
    <div className="card">
      <a href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </a>

      <div className="flex flex-col items-center justify-center p-5">
        <a href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </a>
        <p className="mb-2">{product.brand}</p>
        <p>${product.price}</p>
        <button type="button" onClick={handleRoute} className="primary-button">
          Add to cart
        </button>
      </div>

    </div>
  )
}