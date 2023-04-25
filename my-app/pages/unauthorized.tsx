import React from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'


export default function Unauthorized() {

  const router = useRouter()
  const message = router.query

  return (
    <Layout title="Unauthorized page">
      <h1 className="mb-2 ml-4 text-xl">Access Denied ! </h1>
      <button
        onClick={() => router.push('/login')}
        className="secondary-button ml-4"
      >
        Go to login
      </button>
      {message && <div className="mb-4 text-red-500">
        {message}
      </div>}
    </Layout>
  )
}