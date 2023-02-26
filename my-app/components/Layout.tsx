import React from 'react'
import Head from 'next/head'

export default function Layout({ title, children }: any) {
  return (
    <>

      <Head>
        <title>{title ? title + "- corp" : "e-commerce corp"}</title>
        <meta name="description" content="e-commerce website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="mt-6 flex h-12 px-4 justify-between shadow-md item-center">
            <a href="/" className="text-lg text-bold">
              Corporation
            </a>
            <div>
              <a href="/cart" className="p-2">Cart</a>
              <a href="/login" className="mr-12 p-2">Login</a>
            </div>
          </nav>
        </header>
        <main className="w-full m-auto mt-4">
          {children}
        </main>
        <footer className="flex h-12 justify-center items-center shadow-inner">
          <p>Copyright © 2023 Corporation</p>
        </footer>
      </div>

    </>
  )
}