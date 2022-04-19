/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'
import { useTranslation } from 'next-i18next';
import AddWalletDropdown from './AddWalletDropdown';
import AddWalletFormNiceHash from './AddWalletFormNiceHash';
import { useSession } from 'next-auth/react';
import WalletDataGraph from './WalletDataGraph'
import { brokers } from '../../pages/crypto-wallets';




export default function WalletDataInfo({broker, wallet}) {
  // i18n
  const { t } = useTranslation('common');

  if (broker.name == "NiceHash") {
    return (
      <>
        <WalletDataGraph broker={broker} wallet={wallet}/>
      </>
    )
  }

  return (
    <p>Unsupported broker</p>
  )
}