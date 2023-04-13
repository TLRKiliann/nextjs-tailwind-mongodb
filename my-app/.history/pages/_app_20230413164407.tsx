import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeProvider } from "next-themes"
import { SessionProvider, useSession } from 'next-auth/react'
import { StoreProvider } from '../utils/Store'


export default function App({ Component, pageProps: {session, ...pageProps}, }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <StoreProvider>
        {Component.auth? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        </StoreProvider>
      </SessionProvider>
    </ThemeProvider>
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