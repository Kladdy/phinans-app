import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import { AppProps } from 'next/app'
import Header from '../components/common/Header'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export default function AuthWrapper({ Component, pageProps }) {
  const { t } = useTranslation('common');
  
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <>
      <Header /> 
      {!session && !loading &&
        <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
          <main>
            <h1 className="font-mono text-xl code">
              {t('please')} <span className="text-purple-700">{t('sign_in')} </span> {t('to_access')}  <span className="text-indigo-700">{t('phinans')} </span>
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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})
