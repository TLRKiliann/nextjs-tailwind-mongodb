import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "next-themes"
import { SessionProvider } from 'next-auth/react'
import { StoreProvider } from '../utils/Store'

export default function App({ Component, pageProps: {session, ...pageProps}, }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider session={session}>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
