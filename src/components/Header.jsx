import React from 'react'
import logoImage from '../assets/images/Icon.svg'

export default function Header() {
  return (
    <div className=" md:px-[1.5625rem] py-[0.625rem] border-b-[6px] border-[#CFDAF0] ">
      <a href="#">
        <img src={logoImage} alt="company-logo" className="w-[15.6875rem]" />
      </a>
      <nav></nav>
    </div>
  )
}
