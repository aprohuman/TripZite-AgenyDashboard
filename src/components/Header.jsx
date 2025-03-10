import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/auth";
import logoImage from '../assets/images/Icon.svg'
import userImage from "../assets/images/User.svg"
import { cn } from "../utils/cn";


export default function Header() {
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

  const navigate = useNavigate();
  
  const handleLogout = () => {
      removeToken();
      navigate("/login");
  };
  return (
    <div className=" md:px-[1.5625rem] py-[0.625rem]  flex justify-between items-center relative">
      <a href="#">
        <img src={logoImage} alt="company logo" className="w-[10rem]" />
      </a>

  
<div  onMouseEnter={() => setIsUserProfileOpen(true)}
      onMouseLeave={() => setIsUserProfileOpen(false)} 
      className='flex justify-between items-center gap-1 relative z-50'>

<div className='border-1 rounded-full flex justify-center items-center p-1 w-[24px] h-[24px]'>
<img src={userImage} alt="Agency Logo" className="w-[18px]" />
</div>
<span> XYZ Agency</span>

<div
onMouseEnter={() => setIsUserProfileOpen(true)}
onMouseLeave={() => setIsUserProfileOpen(false)} 
className={cn(
          "absolute top-[20px] right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border transition-all duration-300 overflow-hidden",
          isUserProfileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}>
        <div className="p-2">
          <p className="text-sm font-semibold">XYZ Agency</p>
          <p className="text-xs text-gray-500">user@xyz.com</p>
        </div>
        <hr />
        <button onClick={()=>handleLogout()} className="w-full flex items-center px-4 py-2 text-sm hover:bg-gray-100">
           Logout
        </button>
</div>
 </div>

    </div>
  )
}
