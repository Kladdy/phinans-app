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
import { useTranslation } from 'next-i18next';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function Income() {
  const { t } = useTranslation('common');

  const { data: session, status } = useSession()
  const loading = status === "loading"

  const pages = [
    { name: t('index.income'), href: '#', current: true },
  ]

  return (
    <>
      <Breadcrumbs pages={pages}/>
      <div className="container flex flex-col items-center p-4 mx-auto justify-center">
          Content
      </div>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})