import React, { useState } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/tripSections/Sidebar'
import PackageDescription from '../components/tripSections/PackageDescription'
import TripDuration from '../components/tripSections/TripDuration'
import TripDetails from '../components/tripSections/TripDetails'
import TripBreakdownForm from '../components/tripSections/TripBreakdown'
import PassengerPricingForm from '../components/tripSections/PassengerPricing'
import MediaUploadComponent from '../components/tripSections/MediaUpload'

export default function TripDetailFomPage() {
  const [packages, setPackages] = useState(['PACKAGE No.#001'])

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-[#CFDAF0] gap-2 flex flex-col md:flex-row">
        <Sidebar packages={packages} />
        <main className="w-full">
          <h2 className="p-6 text-[1.1rem] font-[400]">
            Fill out below your package details :
          </h2>
          <form action="" className="flex-col space-y-2">
            <PackageDescription />
            <TripDuration />
            <TripDetails />
            <TripBreakdownForm />
            <PassengerPricingForm />
            <MediaUploadComponent />
          </form>
        </main>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4 p-10 w-[90%] m-auto justify-end">
        <button
          onClick={moveToDraft}
          className="bg-blue-800 text-white px-4 py-2 rounded-lg w-full md:w-auto"
        >
          Move to Draft
        </button>
        <button
          onClick={addPackage}
          className="bg-blue-800 text-white px-4 py-2 rounded-lg w-full md:w-auto"
        >
          Add Package
        </button>
      </div>
    </div>
  )
}
