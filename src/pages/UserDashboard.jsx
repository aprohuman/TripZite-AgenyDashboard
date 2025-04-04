import React from 'react'
import Sidebar from '../components/userDashboard/Sidebar'
import Header from '../components/Header'
import MainContent from '../components/userDashboard/MainContent'
import logo from '../assets/images/ColoredLogo.svg'

const user = {
  firstName: 'Seethong',
  lastName: 'Khamphanthong',
  email: 'xyz123456@gmail.com',
  mobile: '+91 9999966666',
  country: 'India',
  state: 'Bihar',
  personalId: 'Adhar Card.pdf / Passport.pdf',
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
      <div className="p-4 relative w-full">
        {/* Gradient Background with Blur - Covers 20% Height */}
        <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-[#102728]/80 to-[#FFFFFF] backdrop-blur-md"></div>

        {/* Content */}
        <div className="relative z-10">
          {/* Lower Header */}
          <div className="flex justify-between items-center w-full">
            <div>
              <button>Back</button>
              <div className="flex items-center">
                <h1>Welcome Par</h1>
                <img src={logo} alt="logo" />
              </div>
            </div>
            <div>
              <h2>Hello User</h2>
            </div>
          </div>

          {/* Main Section */}
          <div className="relative flex flex-row h-screen w-full">
            <Sidebar />
            <MainContent
              user={user}
              company={company}
              notifications={notifications}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default userDashboard
