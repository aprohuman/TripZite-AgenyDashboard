import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/tripSections/Sidebar'
export default function TripDetailFomPage() {
  return (
    <div>
      <Header />
      <div className="gap-2 bg-[#CFDAF0]  ">
        <Sidebar />
        <form action=""></form>
      </div>
    </div>
  )
}
