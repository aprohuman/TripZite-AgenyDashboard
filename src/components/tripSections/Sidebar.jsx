import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [packages, setPackages] = useState(['PACKAGE No.#001'])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const addPackage = () => {
    const newPackageNumber = packages.length + 1
    setPackages([
      ...packages,
      `PACKAGE No.#${String(newPackageNumber).padStart(3, '0')}`,
    ])
  }

  const packageFields = [
    'Package Description',
    'Duration',
    'Trip Details',
    'Trip Breakdown',
    'Passenger count and pricing',
    'Media Upload',
  ]

  return (
    <div
      className={`flex ${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-width duration-300 bg-white p-2  sm:w-48 md:w-64 lg:w-72 xl:w-80`}
    >
      <div className="flex flex-col w-full">
        <button onClick={toggleSidebar} className="self-start">
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
        {!isCollapsed &&
          packages.map((pkg, index) => (
            <div key={index} className="p-2">
              <div className="text-[20px] font-[400]">{pkg}</div>
              <ul className="pl-4 text-gray-600">
                {packageFields.map((field, idx) => (
                  <li
                    key={idx}
                    className="text-sm sm:text-base flex items-center my-1 "
                  >
                    <div className="mr-2 border-1 rounded-[50%] w-[9px] h-[9px]"></div>
                    <p className="text-[1rem] font-[400]"> {field}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        {!isCollapsed && (
          <div className="mt-4 border-t pt-4">
            <button
              onClick={addPackage}
              className="text-gray-400 flex items-center"
            >
              + Add another Package
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
