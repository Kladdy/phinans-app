import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import { AppProps } from 'next/app'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Test() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  const onClickButtonTest = () => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/user/all",
      {
        method: "GET",
        headers: {
          "x-auth-token": String(session.access_token)
        }
      })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <div className='grid place-items-center py-5'>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => onClickButtonTest()}
        >
          Test fetch data
        </button>
    </div>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})