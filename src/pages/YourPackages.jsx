import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import Filters from '../components/Filters';

const tabs = ['All Packages', 'Published' , 'Under Review', 'Drafts', 'Trash'];

export default function YourPackages() {
    const [currentTab, setCurrentTab] = useState('All Packages');
    const [filters, setFilters] = useState({
        sortMethod:'Sort By',
        location:'Location',
        priceRange:'Price Range',
        rating:'Rating',
        category:'Travel Category'
    });

  return (<>
    <Header />
    <Filters filters={filters} setFilters={setFilters} />
    <div className='flex justify-between items-stretch mx-auto'>
        <aside className='flex-[0_1_20%] bg-[#102728]  flex justify-center'>
        <nav>
            <ul className='flex flex-col justify-start items-start gap-2 mt-4'>
                {tabs.map((tab)=><li onClick={()=>setCurrentTab(tab)} key={tab} className={`inline-block cursor-pointer m-1 text-white ${tab === currentTab ? `border-b-1`: ``}`}>{tab}</li>)}
            </ul>
        </nav>
        </aside>
        <main>
        <h1 className='text-[36px] font-medium border-b-1 border-b-[#102728] mb-6 p-4'>{currentTab}</h1>
        <div className='flex-[0_1_80%] flex justify-start items-center flex-wrap gap-2 pb-5'>
        <PackageCard />
        <PackageCard />
        <PackageCard />
        <PackageCard />
        </div>
        </main>


    </div>
  
    <Footer />
  </>)
}

