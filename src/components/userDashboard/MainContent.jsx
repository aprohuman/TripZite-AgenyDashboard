import React from 'react'
import NotificationCard from './NotificationCard'
import ProfileDetails from './ProfileDetails'
import CompanyDetails from './CompanyDetails'

const MainContent = ({ user, company, notifications }) => {
  return (
    <main className="w-full pl-10 pt-30 ">
      <div>
        <h1 className="text-[24px] font-[400] pb-[20px]">Notifications</h1>
        <div className="flex gap-20 pb-[67px]">
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
