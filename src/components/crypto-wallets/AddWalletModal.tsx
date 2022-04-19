/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'
import { useTranslation } from 'next-i18next';
import AddWalletDropdown from './AddWalletDropdown';
import AddWalletFormNiceHash from './AddWalletFormNiceHash';
import { useSession } from 'next-auth/react';

// Do not change name of brokers. They are used in backend aswell
const brokers = [
  {
    id: 1,
    name: 'NiceHash',
    avatar: 'img/crypto-wallets/icons/logo_small_dark.png',
  },
]

export default function AddWalletModal({open, setOpen}) {
  // i18n
  const { t } = useTranslation('common');

  // Session
  const { data: session, status } = useSession()

  // States
  const [selectedBroker, setSelectedBroker] = useState(brokers[0])
  const [walletFields, setWalletFields] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionErrors, setSubmissionErrors] = useState([])

  const renderForm = () => {
    if (selectedBroker.name == "NiceHash") {
      return <AddWalletFormNiceHash walletFields={walletFields} 
              setWalletFields={setWalletFields} />
    }
    else {
      return <p>Unsupported broker</p>
    }
  }

  const addWallet = () => {
    setIsSubmitting(true)

    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/crypto-wallets/add",
      {
        method: "POST",
        headers: {
          "x-auth-token": String(session.access_token),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          brokerName: selectedBroker.name,
          walletFields: walletFields
        })
      })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        // console.log(submissionErrors)
        if (data.error != null) {
          setIsSubmitting(false)
          setSubmissionErrors(data.errors)
        } else {
          setOpen(false)
          setIsSubmitting(false)
          setSubmissionErrors([])
          setWalletFields({})
        }
      })
      // .then(() => {
      //   setIsSubmitting(false)
      //   setOpen(false)
      // });
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    setOpen(false)
                    setSubmissionErrors([])
                    setWalletFields({})
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                  {/* <ExclamationIcon /> */}
                  <i className='fas fa-plus text-blue-600' aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    {t('crypto-wallets.add_wallet')}
                  </Dialog.Title>
                  <div className="mt-2">
                    <AddWalletDropdown selected={selectedBroker} setSelected={setSelectedBroker} brokers={brokers} />
                  </div>

                  <div className="mt-4">
                  { renderForm() }
                  </div>
                  
                  <div className="flex-row">
                    {submissionErrors.map((e, idx) => <p className='text-red-600 mt-2' key={idx}>{e.message} </p>)}
                  </div>    
                </div>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => addWallet()}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 
                    <div className='flex items-center '> 
                      <svg role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-blue-400 fill-gray-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      {t('crypto-wallets.adding')} 
                    </div> 
                  : 
                    <> {t('crypto-wallets.add')} </>}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setOpen(false)
                    setSubmissionErrors([])
                    setWalletFields({})
                  }}
                >
                  {t('crypto-wallets.cancel')}
                </button>

              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}