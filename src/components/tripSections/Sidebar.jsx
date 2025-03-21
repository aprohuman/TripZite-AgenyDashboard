import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Sidebar = ({ packageFieldSets, stepsCompleted }) => {
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

  return (
    <div
      className={` flex sm:flex-col sm:justify-between   sm:h-[90vh] ${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-width duration-300 pt-2  sm:w-48 md:w-64 lg:w-72 xl:w-80`}
    >
      <div className="flex bg-white sm:flex-col sm:h-[85%] sm:overflow-auto">
        <button onClick={() => window.history.back()} className="self-start">
          <ChevronLeft />
        </button>

        {!isCollapsed &&
          packages.map((pkg, index) => (
            <div
              key={index}
              className="flex-column justify-content-between p-2"
            >
              <div className="text-[20px] font-[400]">{pkg}</div>
              <ul className="text-gray-600 pl-4">
                {packageFieldSets.map((field, idx) => (
                  <li
                    key={idx}
                    className="flex text-sm items-center my-1 sm:text-base"
                  >
                    <div className="border-1 h-[9px] rounded-[50%] w-[9px] mr-2"></div>
                    <p
                      className={`text-[1rem] font-[400] ${
                        stepsCompleted[field]
                          ? `text-black font-medium`
                          : `text-gray`
                      }`}
                    >
                      {' '}
                      {field}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>

      <div className="bg-white p-10">
        <button
          onClick={addPackage}
          className="flex text-black font-bold items-center"
        >
          + Add another Package
        </button>
      </div>
    </div>
  )
}

export default Sidebar
