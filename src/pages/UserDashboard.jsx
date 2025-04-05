import React from 'react'
import Sidebar from '../components/userDashboard/Sidebar'
import Header from '../components/Header'
import MainContent from '../components/userDashboard/MainContent'
import logo from '../assets/images/ColoredLogo.svg'
import { ChevronLeft, X } from 'lucide-react'
import Footer from '../components/Footer'
const user = {
  firstName: 'Seethong',
  lastName: 'Khamphanthong',
  email: 'xyz123456@gmail.com',
  mobile: '+91 9999966666',
  country: 'India',
  state: 'Bihar',
  personalId: 'Adhar Card.pdf / Passport.pdf',
  postalCode: '800020',
  gender: 'Male',
  dob: '30-20-2000',
}

const company = {
  name: 'XYZ Travels',
  email: 'something0000@gmail.com',
  mobile: '+91 9999966666',
  address: 'likufylhgiku.jng jdsjklo',
}

const notifications = [
  {
    title: 'Upcoming Trips',
    message: 'You have 3 trips next week.',
    link: '#',
  },
  {
    title: 'From Tripzite',
    message: 'You have 1 unread notification.',
    link: '#',
  },
]

const userDashboard = () => {
  return (
    <>
      <Header username="*username*" profileImg="/profile.jpg" />

      {/* Main Content */}
      <div className="relative w-full">
        {/* Gradient Background with Blur - Covers 20% Height */}
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-[#102728]/69 to-[#FFFFFF] backdrop-blur-md"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Lower Header */}
          <div className="flex justify-between items-center w-full px-[10px] py-[17px]   ">
            <div className=" flex w-[30%]">
              <ChevronLeft />

              <div className="flex items-center   gap-15">
                <h1 className="text-[24px] text-white font-bold">
                  Welcome <br />
                  Partner !
                </h1>
                <img src={logo} alt="logo" />
              </div>
            </div>
            <div>
              <h2 className="text-[44px] font-normal text-white ">
                Hi *username !
              </h2>
            </div>
          </div>

          {/* Main Section */}
          <div className=" flex flex-row  w-full pt-[24px]">
            <Sidebar />
            <MainContent
              user={user}
              company={company}
              notifications={notifications}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="bg-[#CFDAF0] h-[125px]"></div>
        <Footer />
      </div>
    </>
  )
}

export default userDashboard
