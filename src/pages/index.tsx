// import { useSession, signIn, signOut } from "next-auth/react"

// export default function Home() {
//   const { data: session } = useSession()

//   if(session) {
//     return (
//       <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
//         <main>
//           <h1 className="font-mono text-xl code">
//             Welcome to <span className="text-purple-700">Nextjs</span>, <span className="text-indigo-700">TailwindCSS</span> and <span className="text-gray-700">TypeScript</span>
//           </h1>
//         </main>
//       </div>
//     )
//   }

//   return <>
//     Not signed in <br/>
//     <button onClick={() => signIn()}>Sign in</button>
//   </>
// }

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Home() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <div className={styles.container}>
        <main className={styles.main}>
            
        </main>
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})