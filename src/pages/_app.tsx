import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/index.css'
import { SessionProvider } from "next-auth/react"
import AuthWrapper from './authWrapper'
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <>
      <Head>
        <title>Phinans</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>

        <AuthWrapper Component={Component} pageProps={pageProps}/>
      </SessionProvider>
    </>
  )
}

export default appWithTranslation(MyApp);