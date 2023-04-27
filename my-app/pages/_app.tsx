import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeProvider } from "next-themes"
import { SessionProvider, useSession } from 'next-auth/react'
import { StoreProvider } from '../utils/Store'
import "@fontsource/acme"


export default function App({ Component, pageProps: {session, ...pageProps}, }: AppProps) {
  return (  
    <SessionProvider session={session}>
      <StoreProvider>
      {Component.auth ? (
        <Auth>
          <ThemeProvider attribute="class">
            <Component {...pageProps} />
          </ThemeProvider>
        </Auth>
      ) : (
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      )}
      </StoreProvider>
    </SessionProvider>
  )
}

type ChildrenProps = {
  children: React.ReactNode;
}

function Auth({ children }: ChildrenProps) {
  const router = useRouter()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required')
    }
  })
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  return children;
}