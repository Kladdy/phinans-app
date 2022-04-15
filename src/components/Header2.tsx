/* This example requires Tailwind CSS v2.0+ */
// https://tailwindui.com/components/marketing/elements/headers
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useTranslation } from 'next-i18next';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header2() {
  const { t } = useTranslation('common');

  const { data: session, status } = useSession()
  const loading = status === "loading"

  const handleSignin = (e) => {
    e.preventDefault()
    signIn()
  }    
  const handleSignout = (e) => {
    e.preventDefault()
    signOut()
  }

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <span className="sr-only">{t('phinans')}</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="img/logo_800x800.png"
                alt="Phinans"
              />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">{t('open_menu')}</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            {loading && <div className={styles.title}>{t('loading')}...</div>}
            {
              session &&
                <>
                <img src={session.user.image} alt="" className={styles.avatar} />
                {/* <p style={{ marginBottom: '10px' }}> Welcome, {session.user.name ?? session.user.email}</p> <br /> */}
                <p className="pl-3"> {t('welcome')}, {session.user.name ?? session.user.email}</p> <br />
                
                </>
            }
            {session && <a href="#" onClick={handleSignout} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">{t("sign_out")}</a>  } 
            {!session && <a href="#" onClick={handleSignin}  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">{t("sign_in")}</a>  } 
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="img/logo_800x800.png"
                    alt="Phinans"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center md:flex-1">
              {loading && <div className={styles.title}>{t('loading')}...</div>}
              {
                session &&
                  <>
                  <img src={session.user.image} alt="" className={styles.avatar} />
                  {/* <p style={{ marginBottom: '10px' }}> Welcome, {session.user.name ?? session.user.email}</p> <br /> */}
                  <p className="pl-3"> {t('welcome')}, {session.user.name ?? session.user.email}</p> <br />
                  
                  </>
              }
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                {session && <a href="#" onClick={handleSignout} className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">{t('sign_out')}</a>  } 
                {!session && <a href="#" onClick={handleSignin}  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">{t('sign_in')}</a>  } 
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
