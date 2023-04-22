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