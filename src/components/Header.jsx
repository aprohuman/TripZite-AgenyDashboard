import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeToken } from '../utils/auth'
import logoImage from '../assets/images/Icon.svg'
import userImage from '../assets/images/User.svg'
import { cn } from '../utils/cn'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { logOutUser } from '../services/apiService'
export default function Header() {
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)
  console.log(auth, 'auth')

  const handleLogout = () => {
    removeToken()
    dispatch(logout())
    setIsUserProfileOpen(false)
    navigate('/login')
  }
  return (
    <div className="flex justify-between items-center md:px-[1.5625rem] py-[0.625rem]">
      <a href="#">
        <img src={logoImage} alt="company logo" className="w-[10rem]" />
      </a>

      <div
        onMouseEnter={() => setIsUserProfileOpen(true)}
        onMouseLeave={() => setIsUserProfileOpen(false)}
        className="flex justify-between gap-1 items-center relative z-50"
      >
        <div className="flex border-1 h-[24px] justify-center p-1 rounded-full w-[24px] items-center">
          <img src={userImage} alt="Agency Logo" className="w-[18px]" />
        </div>
        <span> {auth.email}</span>

        <div
          onMouseEnter={() => setIsUserProfileOpen(true)}
          onMouseLeave={() => setIsUserProfileOpen(false)}
          className={cn(
            'absolute top-[20px] right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border transition-all duration-300 overflow-hidden',
            isUserProfileOpen
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 pointer-events-none',
          )}
        >
          <div className="p-2">
            <p className="text-sm font-semibold">XYZ Agency</p>
            <p className="text-gray-500 text-xs">
              {auth.email || 'xyz@gmail.com'}
            </p>
          </div>
          <hr />
          <button
            onClick={() => handleLogout()}
            className="flex text-sm w-full hover:bg-gray-100 items-center px-4 py-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
