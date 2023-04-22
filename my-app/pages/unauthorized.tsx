import React from 'react'
import { useRouter } from 'next/navigation'
import Layout from '@/components/Layout'

type UnauthorizedProps = {}

export default function Unauthorized(props: UnauthorizedProps): JSX.Element {

  const router = useRouter()
  const message = router.query

  return (
    <Layout title="Unauthorized page ">
      <h1 className="m-2 text-xl">Access Denied ! </h1>
      <button
        onClick={() => router.push('/login')}
        className="w-40 ml-2 py-1 text-lg text-center 
        text-slate-50 bg-blue-600 border rounded-lg"
      >
        Go to login
      </button>
      {message && <div className="mb-4 text-red-500">
        {message}
      </div>}
    </Layout>
  )
}