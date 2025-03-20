import React from 'react'
import curve1Image from '../assets/images/Curve-1.svg'
import curve2Image from '../assets/images/AssetCurve.png'
import { useNavigate } from 'react-router-dom'

const Notification = () => {
  const navigate = useNavigate()
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* Curve Background Elements */}
      <div className="absolute top-0 left-0 w-1/6 h-1/6 md:h-[12rem] md:w-1/9 object-cover">
        <img
          src={curve1Image}
          alt="Curve 1"
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      <div className="absolute bottom-0  left-0 w-full h-1/2 md:h-[55%]">
        <img
          src={curve2Image}
          alt="Curve 2"
          className="w-full h-full object-center opacity-90 z-50"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 py-8 h-[90vh] flex flex-col md:flex-row justify-between md:gap-6">
        {/* Priority Notifications Section */}
        <div className="box-border w-full md:w-[68%] h-1/2 md:h-[80%] bg-transparent border-8 border-[#5F6E6F] rounded-lg shadow-lg p-6 z-0">
          <h2 className="text-black font-semibold text-xl md:text-2xl">
            Priority Notifications
          </h2>
        </div>

        {/* Buttons Panel */}
        <div className="box-border w-full md:w-[28%] flex flex-col gap-4 md:gap-4">
          <button className="w-full py-3 bg-[#102728] text-white text-base md:text-lg rounded-lg shadow hover:bg-[#102728DA] hover:cursor-pointer  transition-transform">
            View all Notifications
          </button>
          <button className="w-full py-3 bg-[#102728] text-white text-base md:text-lg rounded-lg shadow hover:bg-[#102728DA] hover:cursor-pointer  transition-transform">
            Notice board
          </button>
          <button
            onClick={() => navigate('/your-packages')}
            className="w-full py-3 bg-[#102728] text-white text-base md:text-lg rounded-lg shadow hover:bg-[#102728DA] hover:cursor-pointer  transition-transform"
          >
            Your Packages
          </button>
          <button
            onClick={() => navigate('/add-package')}
            className="w-full py-3 bg-[#102728] text-white text-base md:text-lg rounded-lg shadow hover:bg-[#102728DA] hover:cursor-pointer transition-transform"
          >
            Add Package
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notification
