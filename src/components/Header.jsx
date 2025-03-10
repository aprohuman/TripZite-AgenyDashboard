import React from 'react';
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import logoImage from '../assets/images/Icon.svg'
import userImage from "../assets/images/User.svg"


export default function Header() {

  const navigate = useNavigate();
  
  const handleLogout = () => {
      removeToken();
      navigate("/login");
  };
  return (
    <div className=" md:px-[1.5625rem] py-[0.625rem]  flex justify-between ">
      <a href="#">
        <img src={logoImage} alt="company logo" className="w-[10rem]" />
      </a>
      <nav>
        <p onClick={()=>handleLogout()} className='flex justify-between items-center gap-1'>
        <img src={userImage} alt="Agency Logo" className="w-[1rem]" />
         XYZ Agency
         </p>
      </nav>
    </div>
  )
}
