/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";


export default function AddWalletFormNiceHash({walletFields, setWalletFields}) {
  // i18n
  const { t } = useTranslation('common');

  // States
  const [label, setLabel] = useState("")
  const [organizationId, setOrganizationId] = useState("")
  const [apiKey, setApiKey] = useState("")
  const [apiSecret, setApiSecret] = useState("")

  useEffect(() => {
    setWalletFields({
      label: label,
      organizationId: organizationId,
      apiKey: apiKey,
      apiSecret: apiSecret, 
    })

  }, [organizationId, apiKey, apiSecret, label])

  return (
    <div className="isolate -space-y-px rounded-md shadow-sm">
      
      <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label htmlFor="label" className="block text-xs font-medium text-gray-900">
          {t('crypto-wallets.nicehash.label')}
        </label>
        <input
          type="text"
          name="label"
          id="label"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder={t('crypto-wallets.voluntary')}
          value={label}
          onChange={e => setLabel(e.target.value)}
        />
      </div>
      
      <div className="relative border border-gray-300 rounded-md rounded-b-none rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label htmlFor="organization_id" className="block text-xs font-medium text-gray-900">
          {t('crypto-wallets.nicehash.organization_id')}
        </label>
        <input
          type="text"
          name="organization_id"
          id="organization_id"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder=""
          value={organizationId}
          onChange={e => setOrganizationId(e.target.value)}
        />
      </div>

      <div className="relative border border-gray-300 rounded-md rounded-t-none rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label htmlFor="api_key" className="block text-xs font-medium text-gray-900">
          {t('crypto-wallets.nicehash.api_key')}
        </label>
        <input
          type="text"
          name="api_key"
          id="api_key"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder=""
          value={apiKey}
          onChange={e => setApiKey(e.target.value)}
        />
      </div>

      <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label htmlFor="api_secret" className="block text-xs font-medium text-gray-900">
          {t('crypto-wallets.nicehash.api_secret')}
        </label>
        <input
          type="text"
          name="api_secret"
          id="api_secret"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder=""
          value={apiSecret}
          onChange={e => setApiSecret(e.target.value)}
        />
      </div>
    </div>
  )
  }