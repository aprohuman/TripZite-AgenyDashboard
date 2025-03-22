import React from 'react';
import { ChevronLeft, X } from 'lucide-react';

export const packageFieldSets = [
  'Package Description',
  'Duration',
  'Trip Details',
  'Trip Breakdown',
  'Passenger Count And Pricing',
  'Media Upload',
];

const Sidebar = ({ packages, setPackages, selectedPackage, setSelectedPackage, stepsCompleted }) => {

  const addPackage = () => {
    const newPackage = String(packages.length + 1).padStart(3, '0');
    setPackages([
      ...packages,
      newPackage
    ]);
  };

  const changeSelectedPackage = (pkg)=>{
       setSelectedPackage(pkg);
  };

  const deletePackage = (e, pkg) =>{
      e.preventDefault();
      setPackages(prev=>{
        return [...prev].filter((p) => p != pkg);
      })
  }

  return (
    <div
      className={`flex flex-col justify-between items-stretch flex-[0_1_20%]  h-[90vh]  sm:w-48 md:w-64 lg:w-72 xl:w-80 bg-white`}
    >
      <div className="flex flex-col  bg-white overflow-auto h-[calc(100vh-100px)] border-t-8 border-[#CFDAF0]">
        <button onClick={() => window.history.back()} className="self-start mt-2 ">
          <ChevronLeft />
        </button>
        <div className='h-[calc(100%-8px)] overflow-auto mt-2'>
        {
          packages.map((pkg) => (
            <div key={pkg} className={`flex-column justify-content-between p-2 ${selectedPackage === pkg ? ` bg-gray-200`: ``}`}
              onClick={()=>{changeSelectedPackage(pkg)}}
            >
              {
                console.log(selectedPackage, pkg)
              }
              <div className='flex flex-row justify-between items-center'>
              <h3 className="text-[20px] font-[400]">{`PACKAGE NO. # ${pkg}`}</h3>
               <X className='text-gray-400 hover:text-red-400 hover:cursor-pointer mr-2'
                onClick={(e)=>{deletePackage(e,pkg)}} />
              </div>
              
              <ul className="text-gray-600 pl-4">
                {packageFieldSets.map((field, idx) => (
                  <li
                    key={idx}
                    className="flex text-sm items-center my-1 sm:text-base"
                  >
                    <span className="border-1 h-[9px] rounded-[50%] w-[9px] mr-2"></span>
                    <p
                      className={`text-[1rem] font-[400] ${
                        stepsCompleted[field]
                          ? `text-black font-medium`
                          : `text-gray`
                      }`}>
                      {field}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        }
        </div>
      </div>

      <div className="bg-white p-5 flex justify-center items-center h-[100px] border-t-8 border-[#CFDAF0]">
        <button
          onClick={addPackage}
          className="flex text-black font-semibold items-center cursor-pointer"
        >
          <span className='font-bold mr-2'> + </span>
          Add another Package 
        </button>
      </div>
    </div>
  )
}

export default Sidebar
