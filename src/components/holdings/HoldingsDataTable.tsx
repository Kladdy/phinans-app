/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next';



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function WalletDataInfo({holdingsData, categories}) {
  // i18n
  const { t } = useTranslation('common');

  // States
  const [tableData, setTableData] = useState([])
  const [totalSum, setTotalSum] = useState(0)

  // Create the tabel data from the holdingsData
  useEffect(() => {
    let tempTableData = []

    // Extract all the categories
    let allCategories = holdingsData.map(holding => categories.find(category => category.name == holding.category))

    // Remove duplicate categories
    allCategories = Array.from(new Set(allCategories));

    // Create the table data
    tempTableData = allCategories.map(category => {return {category: category, holdings: holdingsData.filter(holding => holding.category === category.name)}})

    setTableData(tempTableData)

    // Update the total sum
    const amounts = holdingsData.map(holding => holding.amount)
    const sum = amounts.reduce((a, b) => a + b, 0)
    setTotalSum(sum)

  }, [holdingsData])



  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{t('holdings.title')}</h1>
          <p className="mt-2 text-sm text-gray-700">
            {t('holdings.text')}
          </p>
        </div>
  
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-white">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      {t('holdings.label')}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t('holdings.amount')}
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      {t('holdings.last_updated')}
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">{t('holdings.edit')}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {tableData.map((data) => (
                    <Fragment key={data.category.name}>
                      <tr className="border-t border-gray-200">
                        <th
                          colSpan={5}
                          scope="colgroup"
                          className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                        >
                          <i className={data.category.icon + ' mr-2'}></i> {t('holdings.categories.' + data.category.name)}
                        </th>
                      </tr>
                      {data.holdings.map((holding, holdingIdx) => (
                        <tr
                          key={holding._id}
                          className={classNames(holdingIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                        >
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {holding.label}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{holding.amount}</td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{(new Date(holding.lastUpdated)).toLocaleString()}</td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              {t('holdings.edit')}<span className="sr-only">, {holding.label}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
                <tfoot>
                  <tr >
                    <th
                      scope="row"
                      colSpan={1}
                      className="hidden pl-6 pr-3 pt-4 pb-6 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
                    >
                      {t('holdings.total')}
                    </th>
                    <th scope="row" className="pl-4 pr-3 pt-4 pb-6 text-left text-sm font-semibold text-gray-900 sm:hidden">
                      {t('holdings.total')}
                    </th>
                    <td className="pl-3 pr-4 pt-4 pb-6 text-left text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                      {totalSum}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




