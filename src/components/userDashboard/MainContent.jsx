import React from 'react'
import NotificationCard from './NotificationCard'
import ProfileDetails from './ProfileDetails'
import CompanyDetails from './CompanyDetails'

const MainContent = ({ user, company, notifications }) => {
  return (
    <main className="main-content  w-full p-4 overflow-y-auto">
      <div>
        <h1 className="text-[24px] font-[400] pb-[4rem]">Notifications</h1>
        <div className="flex gap-20">
          {notifications.map((note, index) => (
            <NotificationCard key={index} {...note} />
          ))}
        </div>
      </div>
      <ProfileDetails user={user} />
      <CompanyDetails company={company} />
    </main>
  )
}
export default MainContent
