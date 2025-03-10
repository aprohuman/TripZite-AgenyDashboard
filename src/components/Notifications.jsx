import React from 'react';
import curve1Image from "../assets/images/Curve-1.svg";
import curve2Image from "../assets/images/Curve-2.svg";

const Notification = () => {
    return (
      <div className="relative w-full h-screen bg-white overflow-hidden">
 
        <div className="absolute top-0 left-0 w-1/6 h-1/6">
        <img src={curve1Image} alt="" className="w-full object-cover" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2">
        <img src={curve2Image} alt="" className="w-full object-cover" />
        </div>

   <div className='h-[90%] container mx-auto px-4 py-8 flex justify-between items-start'>

        <div className=" h-full flex-[0_1_75%] bg-transparent border-8 border-[#5F6E6F] rounded-lg shadow-lg p-4">
          <h2 className="text-black font-semibold">Priority Notifications</h2>
        </div>
        
        <div className="flex-[0_1_20%] flex flex-col space-y-4">
          <button className="w-59  py-2 bg-[#102728] text-white text-[15px] rounded-[6px] shadow cursor-pointer">View all Notifications</button>
          <button className="w-59  py-2 bg-[#102728] text-white text-[15px] rounded-[6px] shadow cursor-pointer">Notice board</button>
          <button className="w-59  py-2 bg-[#102728] text-white text-[15px] rounded-[6px] shadow cursor-pointer">Your Packages</button>
          <button className="w-59  py-2 bg-[#102728] text-white text-[15px] rounded-[6px] shadow cursor-pointer">Add Package</button>
        </div>
      </div>

  </div>
    );
  };
  
  export default Notification;