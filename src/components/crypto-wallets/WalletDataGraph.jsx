// Adapted from https://github.com/bxb100/react-tailwind-chart
// which is adapted from https://codepen.io/ScottWindon/pen/RwrXLJR

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { useTranslation } from 'next-i18next';

import React, { useEffect, useState } from 'react';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);
const formatter = (number) => (number > 999999 ? (number / 1000000).toFixed(1) + 'M' : number);

const options = {
    plugins: {
        legend: {
            display: false,
        }
    },
    scales: {
        yAxes: {
            ticks: {
                color: 'rgba(255, 255, 255, 1)'
            },
            grid: {
                display: false,
                drawBorder: false,
            },
        },

        xAxes: {
            ticks: {
                color: 'rgba(255, 255, 255, 1)'
            },
            grid: {
                circular: true,
                borderColor: 'rgba(255, 255, 255, .2)',
                color: 'rgba(255, 255, 255, .2)',
                borderDash: [5, 5]
            },
        },
    },
    layout: {
        padding: {
            right: 10,
        },
    },
};

const numberToFix = (number, fix) => (number || 0).toFixed(fix);

export default function WalletDataGraph({ broker, wallet }) {
  // i18n
  const { t } = useTranslation('common');

  // States
  const [graphData, setGraphData] = useState({x_data: [], y_data: []})
  const [data, setData] = useState({labels: [], datasets: [{data: []}]})
  const [stats, setStats] = useState({
    min: 0,
    max: 0,
    start: 0,
    current: 0,
    change: 0,
    changePercentage: 0,
  })

  useEffect(() => {
    setGraphData({x_data: wallet.data.map((d) => d.time), y_data: wallet.data.map((d) => d.totalBalance)})
  }, [wallet])

  useEffect(() => {
    const chartData = {labels: graphData.x_data, data: graphData.y_data}
    const buildData = {
      labels: chartData.labels,
      datasets: [
        {
          label: '',
          data: chartData.data,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 1)',
          pointBackgroundColor: 'rgba(255, 255, 255, 1)',
          fill: 'start',
          tension: 0.4,
        },
      ],
    }

    setData(buildData)

    const min =  Math.min(...graphData.y_data)
    const max = Math.max(...graphData.y_data)
    const start = graphData.y_data[0]
    const current = graphData.y_data[graphData.y_data.length - 1]
    const change = current - start
    const changePercentage = change / start * 100

    setStats({
      min: min,
      max: max,
      start: start,
      current: current,
      change: change,
      changePercentage: changePercentage 
    })
  }, [graphData])

  if (data.labels?.length < 2) {
    return (
      <>
      <div className="rounded shadow-xl overflow-hidden w-full md:flex" style={{ maxWidth: '900px' }}>
        <div className="flex w-full md:w-1/2 px-5 pb-4 pt-8 bg-indigo-500 text-white items-center">
          <p className='pb-4'>{t('crypto-wallets.too_few_datapoints')}</p>
        </div>
        <div className="flex w-full md:w-1/2 p-10 bg-gray-100 text-gray-600 items-center">
          <div className="w-full">
            <img src={broker.avatar} alt={broker.name} className="h-10 w-10 mb-2" />
            <h3 className="text-lg font-semibold leading-tight text-gray-800">{wallet.walletLabel ? wallet.walletLabel : t('crypto-wallets.wallet')}</h3>
            <h6 className="text-sm leading-tight mb-2">
              <span>{broker.name}</span>
              {/* &nbsp;&nbsp;-&nbsp;&nbsp;Aug 2nd 4:10pm AEST */}
            </h6>
          </div>
        </div>
      </div>
    </>
    )
  }

  return (
    <>
      <div className="rounded shadow-xl overflow-hidden w-full md:flex" style={{ maxWidth: '900px' }}>
        <div className="flex w-full md:w-1/2 px-5 pb-4 pt-8 bg-indigo-500 text-white items-center">
            <Line type="line" data={data} options={options} />
        </div>
        <div className="flex w-full md:w-1/2 p-10 bg-gray-100 text-gray-600 items-center">
          <div className="w-full">
            <img src={broker.avatar} alt={broker.name} className="h-10 w-10 mb-2" />
            <h3 className="text-lg font-semibold leading-tight text-gray-800">{wallet.walletLabel ? wallet.walletLabel : t('crypto-wallets.wallet')}</h3>
            <h6 className="text-sm leading-tight mb-2">
              <span>{broker.name}</span>
              {/* &nbsp;&nbsp;-&nbsp;&nbsp;Aug 2nd 4:10pm AEST */}
            </h6>
              <div className="flex w-full items-end mb-6">
                <span className="block leading-none text-3xl text-gray-800">{numberToFix(stats.current, 5)}</span>
                {stats.changePercentage <= 0 ? (
                  <span className="block leading-5 text-sm ml-4 text-red-500">
                    {`${stats.change < 0 ? '▼' : '▲'} (${stats.changePercentage?.toFixed(3)}%)`}
                  </span>
                ) : (
                  <span className="block leading-5 text-sm ml-4 text-green-500">
                    {`${stats.change < 0 ? '▼' : '▲'} (${stats.changePercentage?.toFixed(3)}%)`}
                  </span>
                )}
                
              </div>
              <div className="flex w-full text-xs">
                <div className="flex w-5/12">
                  <div className="flex-1 pr-3 text-left font-semibold">{t('crypto-wallets.min')}</div>
                  <div className="flex-1 px-3 text-right">{stats.min?.toFixed(5)}</div>
                </div>
                <div className="flex w-7/12">
                  <div className="flex-1 px-3 text-left font-semibold">{t('crypto-wallets.start')}</div>
                  <div className="flex-1 pl-3 text-right">{stats.start?.toFixed(5)}</div>
                </div>
              </div>
              <div className="flex w-full text-xs">
                <div className="flex w-5/12">
                  <div className="flex-1 pr-3 text-left font-semibold">{t('crypto-wallets.max')}</div>
                  <div className="px-3 text-right">{stats.max?.toFixed(5)}</div>
                </div>
                <div className="flex w-7/12">
                  <div className="flex-1 px-3 text-left font-semibold">{t('crypto-wallets.current')}</div>
                  <div className="pl-3 text-right">{stats.current?.toFixed(5)}</div>
                </div>
              </div>
              {/* <div className="flex w-full text-xs">
                <div className="flex w-5/12">
                  <div className="flex-1 pr-3 text-left font-semibold">{t('crypto-wallets.min')}</div>
                  <div className="px-3 text-right">{info.price.low.toFixed(3)}</div>
                </div>
                <div className="flex w-7/12">
                  <div className="flex-1 px-3 text-left font-semibold">{t('crypto-wallets.min')}</div>
                  <div className="pl-3 text-right">{`${info.price.dividend}%`}</div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </>
  );
};