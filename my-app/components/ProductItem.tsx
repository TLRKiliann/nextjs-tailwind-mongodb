import React from 'react'

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

export default function ProductItem({ product, addToCartHandler }: ProductProps) {
  return (
    <div className="card m-auto">
      <a href={`/product/${product.slug}`}>
        <img
          src={product.image}
          width={300}
          height={300}
          alt={product.name}
          className="rounded-t-lg"
        />
      </a>

      <div className="flex flex-col items-center justify-center p-5">
        <a href={`/product/${product.slug}`}>
          <h2 className="text-2xl font-serif">{product.name}</h2>
        </a>
        <p className="text-lg">{product.brand}</p>
        <p className="mb-2 text-lg">${product.price}</p>
        <button
          type="button"
          onClick={() => addToCartHandler(product)}
          className="primary-button"
        >
          Add to cart
        </button>
      </div>

    </div>
  )
}