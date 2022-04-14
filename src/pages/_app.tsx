import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/index.css'
import { SessionProvider } from "next-auth/react"
import Header2 from '../components/Header2'
import AuthWrapper from './authWrapper'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <>
      <Head>
        <title>Phinans</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Header2 />
        <AuthWrapper Component={Component} pageProps={pageProps}/>
      </SessionProvider>
    </>
  )
}

export default MyApp