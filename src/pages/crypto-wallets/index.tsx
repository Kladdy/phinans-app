import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { useEffect, useState } from 'react';
import AddWalletModal from '../../components/crypto-wallets/AddWalletModal';
import WalletDataInfo from '../../components/crypto-wallets/WalletDataInfo';

// Do not change name of brokers. They are used in backend aswell
export const brokers = [
  {
    id: 1,
    name: 'NiceHash',
    avatar: 'img/crypto-wallets/icons/logo_small_dark.png',
  },
]

export default function CryptoWallets() {
  // i18n
  const { t } = useTranslation('common');

  // Session
  const { data: session, status } = useSession()
  const loading = status === "loading"

  // States
  const [openAddWallet, setOpenAddWallet] = useState(false)
  const [isFetchingWalletData, setIsFetchingWalletData] = useState(false);
  const [walletData, setWalletData] = useState<any>({});

  const pages = [
    { name: t('index.crypto-wallets'), href: '#', current: true },
  ]

  const getWalletData = () => {
    
    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/crypto-wallets/get-wallet-data",
      {
        method: "GET",
        headers: {
          "x-auth-token": String(session.access_token),
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.error != null) {
          
        } else {
          setWalletData(data)
        }
      })
      .finally(() => {

      })
  }

  const fetchWalletData = () => {
    setIsFetchingWalletData(true);

    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/crypto-wallets/fetch",
      {
        method: "GET",
        headers: {
          "x-auth-token": String(session.access_token),
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.error != null) {

        } else {

        }
      })
      .finally(() => {
        getWalletData()
        setIsFetchingWalletData(false);
      })
  }

  useEffect(() => {
    getWalletData()
  }, [])

  return (
    <>
      <AddWalletModal open={openAddWallet} setOpen={setOpenAddWallet}/>

      <Breadcrumbs pages={pages}/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className='flex justify-end mr-4'>
          <button
            type="button"
            className="mx-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => fetchWalletData()}
            disabled={isFetchingWalletData}
          >
            {isFetchingWalletData ? 
              <div className='flex items-center '> 
                <svg role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-blue-400 fill-gray-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                {t('crypto-wallets.fetching_wallet_data')} 
              </div> 
            : 
              <div className='flex items-center '> 
                <i className='fas fa-redo mr-2' />
                {t('crypto-wallets.fetch_wallet_data')}
              </div> 
            }
            
          </button>
          <button
            type="button"
            className=" inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => setOpenAddWallet(true)}
          >
            <i className='fas fa-plus mr-2' />
            {t('crypto-wallets.add_wallet')}
          </button>
        </div>

        <div className="container flex flex-col items-center p-4 mx-auto justify-center mt-10">
          {walletData.nicehash != null ? (
            walletData.nicehash.map(wallet => <WalletDataInfo key={wallet.walletId} broker={brokers.find(b => b.name == "NiceHash")} wallet={wallet} />)
          ) : (
            <></>
          )}
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