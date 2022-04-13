import Head from 'next/head'
import { AppProps } from 'next/app'
import '../styles/index.css'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS TailwindCSS TypeScript Starter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps}/>
      </SessionProvider>
    </>
  )
}

export default MyApp