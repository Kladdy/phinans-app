/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'

// const pages = [
//   { name: 'Projects', href: '#', current: false },
//   { name: 'Project Nero', href: '#', current: true },
// ]

export default function Breadcrumbs({pages}) {
  const { t } = useTranslation('common');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <nav className="flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div>
                <a href="/" className="text-gray-400 hover:text-gray-500" 
                  aria-current={pages.length != null && pages.length == 0 ? 'page' : undefined}
                >
                  <HomeIcon className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">{t('home')}</span>
                </a>
              </div>
            </li>
            {pages.map((page) => (
              <li key={page.name}>
                <div className="flex items-center">
                  <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <a
                    href={page.current ? undefined : page.href}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    aria-current={page.current ? 'page' : undefined}
                  >
                    {page.name}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}
