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


export default function AddHoldingForm({holdingFields, setHoldingFields}) {
  // i18n
  const { t } = useTranslation('common');

  // States
  const [label, setLabel] = useState("")
  const [amount, setAmount] = useState<number>()
  const [lastUpdated, setLastUpdated] = useState("")

  useEffect(() => {
    setHoldingFields({
      label: label,
      amount: amount,
      lastUpdated: lastUpdated,
    })

  }, [amount, lastUpdated, label])

  return (
    <>
      <div className="isolate -space-y-px rounded-md shadow-sm">
        
        <div className="relative border border-gray-300 rounded-md rounded-b-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
          <label htmlFor="label" className="block text-xs font-medium text-gray-900">
            {t('holdings.label')}
          </label>
          <input
            type="text"
            name="label"
            id="label"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder=""
            value={label}
            onChange={e => setLabel(e.target.value)}
          />
        </div>
        
        <div className="relative border border-gray-300 rounded-md rounded-b-none rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
          <label htmlFor="amount" className="block text-xs font-medium text-gray-900">
            {t('holdings.amount')}
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder=""
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="relative border border-gray-300 rounded-md rounded-t-none px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
          <label htmlFor="last_updated" className="block text-xs font-medium text-gray-900">
            {t('holdings.last_updated')}
          </label>
          <input
            type="text"
            name="last_updated"
            id="last_updated"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder={t('holdings.voluntary')}
            value={lastUpdated}
            onChange={e => setLastUpdated(e.target.value)}
          />
        </div>
        
  
      </div>

      <p className="mt-4 text-sm text-gray-500"> {t('holdings.text')} </p>
    </>
  )
  }