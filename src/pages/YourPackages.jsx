import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PackageCard from '../components/PackageCard'
import Filters from '../components/Filters'
import { usePackages } from '../hook/usePackages'
import darjeelingImage from '../assets/images/Darjeeling.svg';
import locationImage from '../assets/images/Location.svg';

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
          <aside className="w-full md:w-1/5 lg:w-1/6 bg-[#4050A0]">
            <nav>
              <ul className="flex flex-row md:flex-col md:justify-center md:itmes-center flex-wrap gap-2 md:p-10">
                {tabs.map((tab) => (
                  <li
                    key={tab}
                    onClick={() => setCurrentTab(tab)}
                    className={` text-sm md:text-base lg:text-lg pt-2 md:pt-2 rounded-md hover:text-gray hover:cursor-pointer transition-colors text-white
                      ${
                        tab === currentTab
                          ? 'font-extrabold'
                          : 'font-400'
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium border-b border-[#10272862] py-4 my-8 min-w-[25%] inline-block">
              {currentTab}
            </h1>
           <div className='max-h-[720px]' style={{overflow:'scroll'}}>
            <div className="flex flex-row justify-start items-center flex-wrap gap-4 pt-2 ">
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
              <PackageCard />
            </div>
            </div>
          </main>
        </div>
      </div>
      <div style={{height:"400px", overflow:"hidden", position:"relative"}}>
        <img style={{objectFit:'cover', width:'100%', height:'100%'}} src={darjeelingImage} alt="Darjeeling" />
         <div className='flex justify-center items-center' style={{position:'absolute', bottom:'10px', right:'20px'}}>
          <img src={locationImage} alt="Location" width={40} height={40} />
          <span className='text-white mb-2'>Darjeeling, India</span>
         </div>
      </div>

      <Footer />
    </div>
  )
}
