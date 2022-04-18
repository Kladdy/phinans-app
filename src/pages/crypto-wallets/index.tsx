import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useState } from 'react';
import AddWalletModal from '../../components/crypto-wallets/AddWalletModal';

export default function CryptoWallets() {
  // i18n
  const { t } = useTranslation('common');

  // Session
  const { data: session, status } = useSession()
  const loading = status === "loading"

  // States
  const [openAddWallet, setOpenAddWallet] = useState(false)

  const pages = [
    { name: t('index.crypto-wallets'), href: '#', current: true },
  ]

  return (
    <>
      <AddWalletModal open={openAddWallet} setOpen={setOpenAddWallet}/>

      <Breadcrumbs pages={pages}/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className='flex justify-end mr-4'>
            <button
              type="button"
              className=" inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => setOpenAddWallet(true)}
            >
              <i className='fas fa-plus mr-2' />
              {t('crypto-wallets.add_wallet')}
            </button>
          </div>

        <div className="container flex flex-col items-center p-4 mx-auto justify-center">
        
          

        
            Content
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})