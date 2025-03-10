import React from 'react'
import logoImage from '../assets/images/Icon.svg'
import userImage from "../assets/images/User.svg"
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className=" md:px-[1.5625rem] py-[0.625rem] border-b-[6px] border-[#CFDAF0] flex justify-between ">
      <a href="#">
        <img src={logoImage} alt="company logo" className="w-[10rem]" />
      </a>
      <nav>
        <Link className='flex justify-between items-center gap-1'>
        <img src={userImage} alt="Agency Logo" className="w-[1rem]" />
         XYZ Agency</Link>
      </nav>
    </div>
  )
}
