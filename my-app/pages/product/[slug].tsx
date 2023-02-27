import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import data from '../../utils/data'

export default function ProductScreen() {

  const { query } = useRouter() as any
  const { slug } = query

  const product = data.products.find(x => x.slug === slug)

  if (!product) {
    return <div>Product Not Found</div>
  }

  return (
    <Layout title={product.name}>
      <h1>{product.name}</h1>
    </Layout>
  )
}
