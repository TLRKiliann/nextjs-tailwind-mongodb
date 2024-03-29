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
          className="rounded-t-lg transition duration-300 ease-in opacity-90 hover:ease-out hover:opacity-100"
        />
      </a>

      <div className="flex flex-col items-center justify-center p-5">
        <a href={`/product/${product.slug}`}>
          <h2 className="text-xl font-serif text-slate-900 dark:text-cyan-400">{product.name}</h2>
        </a>
        <p className="text-lg text-slate-600 dark:text-slate-500">{product.brand}</p>
        <p className="mb-2 text-lg font-serif dark:text-slate-50/90">${product.price}</p>
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