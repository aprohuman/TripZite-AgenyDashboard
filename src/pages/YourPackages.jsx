import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PackageCard from '../components/PackageCard'
import Filters from '../components/Filters'
import { usePackages } from '../hook/usePackages'

const tabs = ['All Packages', 'Published', 'Under Review', 'Drafts', 'Trash']

export default function YourPackages() {
  const [currentTab, setCurrentTab] = useState('All Packages')
  const [filters, setFilters] = useState({
    sortMethod: 'Sort By',
    location: 'Location',
    priceRange: 'Price Range',
    rating: 'Rating',
    category: 'Travel Category',
  })
  const { packages, loading, error } = usePackages(filters)

  return (
    <div>
      <Header />
      <Filters filters={filters} setFilters={setFilters} />

      <div className="h-full">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-1/5 lg:w-1/6 bg-[#A3AAD179] ">
            <nav>
              <ul className="flex flex-row md:flex-col flex-wrap gap-2 md:gap-3">
                {tabs.map((tab) => (
                  <li
                    key={tab}
                    onClick={() => setCurrentTab(tab)}
                    className={`text-sm md:text-base lg:text-lg p-2 md:p-3 rounded-md cursor-pointer transition-colors
                      ${
                        tab === currentTab
                          ? 'bg-[#102728] text-white'
                          : 'hover:bg-gray-200 text-black'
                      }
                    `}
                  >
                    {tab}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-4/5 lg:w-5/6">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium border-b border-[#102728] mb-4 md:mb-6 pb-2 md:pb-4">
              {currentTab}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 ">
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
