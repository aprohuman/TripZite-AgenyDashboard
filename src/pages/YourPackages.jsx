import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import Filters from '../components/Filters';

const tabs = ['All Packages', 'Under Review', 'Draft', 'Trash'];

export default function YourPackages() {
    const [currentTab, setCurrentTab] = useState('');
    const [filters, setFilters] = useState({
        sortMethod:'',
        location:'',
        priceRange:'',
        rating:'',
        category:''
    });

    console.log(filters, 'okok')
  return (<>
    <Header />
    <Filters filters={filters} setFilters={setFilters} />
    <div className='flex justify-between items-start container mx-auto px-4 py-8'>
        <aside className='flex-[0_1_20%]'>
        <nav>
            <ul>
                {tabs.map((tab)=><li onClick={()=>setCurrentTab(tab)} key={tab} className='cursor-pointer'>{tab}</li>)}
            </ul>
        </nav>
        </aside>
        <main>
        <h1 className='text-[36px] font-medium border-b-1 border-b-[#102728] mb-6'>{currentTab}</h1>
        <div className='flex-[0_1_80%] flex justify-start items-center flex-wrap gap-2'>
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

