import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import { AppProps } from 'next/app'

export default function AuthWrapper({ Component, pageProps }) {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <>
      {!session && !loading &&
        <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
          <main>
            <h1 className="font-mono text-xl code">
              Please <span className="text-purple-700">Sign in</span> to access <span className="text-indigo-700">Phinans</span>
            </h1>
          </main>
        </div>
      }
      {session && !loading &&
        <Component {...pageProps}/>
      }
    </>
  )
}
