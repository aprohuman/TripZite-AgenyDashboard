import React from 'react';

export default function FormActions({addPackage,moveToDraft}) {

  return (
    <div className="flex flex-col bg-white justify-end p-10 md:flex-row md:space-x-4 md:space-y-0 space-y-4">
    <button
      onClick={(e)=>{addPackage(e)}}
      className="bg-[#4B66F2] rounded-lg text-white w-full md:w-auto px-4 py-2"
    >
      Move to Draft
    </button>
    <button
      onClick={(e)=>{moveToDraft(e)}}
      className="bg-[#4B66F2] rounded-lg text-white w-full md:w-auto px-4 py-2"
    >
      Add Package
    </button>
  </div>
  )
}
