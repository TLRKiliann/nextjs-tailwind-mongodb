import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from "next-themes"
import { StoreProvider } from '../utils/Store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </ThemeProvider>
  )
}
