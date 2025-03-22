import React, { useState } from 'react';

import Header from '../components/Header';
import Sidebar from '../components/formFiledsets/Sidebar';
import PackageForm from '../components/PackageForm';

const packageFieldSets = [
  'Package Description',
  'Duration',
  'Trip Details',
  'Trip Breakdown',
  'Passenger count and pricing',
  'Media Upload',
]

export default function TripDetailFomPage() {
  const [packages, setPackages] = useState(['PACKAGE No.#001'])
  const [tripBreakdownCount, setTripBreakDownCount] = useState([])
  const [stepsCompleted, setStepsCompleted] = useState({
    'Package Description': false,
    Duration: false,
    'Trip Details': false,
    'Trip Breakdown': false,
    'Passenger count and pricing': false,
    'Media Upload': false,
  })

  const addPackage = () => {
    const newPackageNumber = packages.length + 1
    setPackages([
      ...packages,
      `PACKAGE No.#${String(newPackageNumber).padStart(3, '0')}`,
    ])
  }

  const moveToDraft = () => {
    console.log('Moving to draft with packages:', packages)
    alert('Packages moved to draft!')
  }


  return (
    <div className="flex flex-col fixed border-2 w-full">
      <Header />
        <div className=" flex flex-col bg-[#CFDAF0] gap-2 md:flex-row">
          <Sidebar
            packages={packages}
            packageFieldSets={packageFieldSets}
            stepsCompleted={stepsCompleted}
          />
          <div className="h-[90vh] flex-[0_1_80%]">
              <h2 className="py-6 px-1 text-[1.1rem] font-[500]">
                Fill out below your package details :
              </h2>
              <div className='h-[82vh] overflow-y-auto'>
              <PackageForm 
                setStepsCompleted={setStepsCompleted}
                stepsCompleted={stepsCompleted}
                setTripBreakDownCount={setTripBreakDownCount}
                tripBreakdownCount={tripBreakdownCount}
              />
              </div>
          </div>
        </div>
    </div>
  )
}
