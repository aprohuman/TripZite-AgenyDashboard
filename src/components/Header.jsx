import React from 'react'
import logoImage from '../assets/images/Icon.svg'

export default function Header() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between md:px-[1.5625rem] py-[0.625rem] border-b-[6px] border-[#CFDAF0]">
      <a href="#">
        <img
          src={logoImage}
          alt="company-logo"
          className="w-[10rem] sm:w-[15.6875rem]"
        />
      </a>
      <nav className="mt-4 sm:mt-0">
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-gray-700 hover:text-black">
              notification icon
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
