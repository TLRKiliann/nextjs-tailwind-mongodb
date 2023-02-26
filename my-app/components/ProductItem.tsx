import React from 'react'

export default function ProductItem({ product }) {
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
        <button type="button" className="primary-button">
          Add to cart
        </button>
      </div>

    </div>
  )
}