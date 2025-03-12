import React, { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function TripBreakdownForm({ tripBreakdownCount }) {
  const [itinerary, setItinerary] = useState([])
  const [files, setFiles] = useState([])
  const addItinerary = () => setItinerary([...itinerary, ''])

  // console.log('count', tripBreakdownCount)
  const removeItinerary = (index) => {
    const updatedItinerary = itinerary.filter((_, i) => i !== index)
    setItinerary(updatedItinerary)
  }

  const handleItineraryChange = (index, value) => {
    const updatedItinerary = [...itinerary]
    updatedItinerary[index] = value
    setItinerary(updatedItinerary)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles([...files, ...droppedFiles])
  }

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles([...files, ...selectedFiles])
  }

  const preventDefaults = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const isValidTripBreakdownCount =
    Array.isArray(tripBreakdownCount) &&
    tripBreakdownCount.length > 0 &&
    tripBreakdownCount.every((obj) =>{
      let temp = {...obj}
      delete temp.id;
      return Object.values(temp).every(
        (value) =>
          value !== undefined && value !== null && value !== '' &&  value !== 0,
      );
    }
    )
  console.log(
    'isValidTripBreakdownCount',
    isValidTripBreakdownCount,
    tripBreakdownCount,
  )
  return (
    <div className="mx-auto bg-white p-4 sm:p-8 w-full max-w-screen">
      <h2 className="text-[2rem] font-[400]  text-black mb-6">
        Trip Breakdown
      </h2>
      {isValidTripBreakdownCount &&
        tripBreakdownCount?.map((item) => {
          let daysArray = Array.from({ length: item.days }, (_, i) => i + 1)
          return (
            <>
              {daysArray.map((day) => {
                return (
                  <>
                    <div className="flex justify-start items-center">
                      <h3 className="text-[24px] font=[400] mt-4">DAY {day}</h3>
                      <span className='flex justify-center items-center cursor-pointer mt-3 ml-2' 
                      // onClick={()=> item.isOpen = !item.isOpen}
                      >
                        {item.isOpen ? <ChevronUp /> : <ChevronDown />}{' '}
                      </span>
                    </div>
                    {!item.isOpen && (
                      <div>
                        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between ">
                          <p className="text-[20px] font-[400] mb-2 sm:mb-0">
                            Location: {item.city}, {item.state} ,{item.country}
                          </p>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-around w-full sm:w-1/2 ">
                            <label className="text-[22px] font-[400] mb-2">
                              Upload Images/Media
                            </label>
                            <div
                              className="border-2 border-dashed border-gray-400 bg-blue-100 rounded-lg p-8 flex flex-col items-center justify-center"
                              onDrop={handleDrop}
                              onDragOver={preventDefaults}
                              onDragEnter={preventDefaults}
                              onDragLeave={preventDefaults}
                            >
                              <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                className="hidden"
                                id="file-upload"
                                onChange={handleFileSelect}
                              />
                              <label
                                htmlFor="file-upload"
                                className="cursor-pointer text-gray-500 text-sm underline"
                              >
                                (UPLOAD FROM COMPUTER)
                              </label>
                              <p className="text-gray-500 text-sm mt-2">or</p>
                              <p className="text-gray-500 text-sm">
                                (drag & drop)
                              </p>
                            </div>
                            {files.length > 0 && (
                              <ul className="mt-2">
                                {files.map((file, index) => (
                                  <li
                                    key={index}
                                    className="text-sm text-gray-700"
                                  >
                                    {file.name}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        {/* Accommodation */}

                        <div className=" ">
                          <div className="my-4">
                            <h4 className="text-[24px] font-[400] my-6 sm:my-8">
                              Accommodation
                            </h4>

                            <div className="flex flex-col sm:flex-row  w-full sm:w-[75%] my-2 gap-4">
                              <div className="flex flex-col justify-start items-start w-full sm:w-[32%]">
                                <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
                                  Accommodation
                                </label>
                                <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full  outline-0">
                                  <option value="none" hidden></option>
                                  <option value="hotel">Included</option>
                                  <option value="hostel">Not Included</option>
                                </select>
                              </div>

                              <div className="flex flex-col justify-start items-start w-full sm:w-[32%] ">
                                <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
                                  Accommodation type
                                </label>
                                <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full outline-0">
                                  <option value="none" hidden></option>
                                  <option value="single">Home Stay</option>
                                  <option value="double">Hotel</option>
                                  <option value="double">Guest House</option>
                                  <option value="double">Hostel</option>
                                </select>
                              </div>

                              <div className="flex flex-col justify-start items-start w-full sm:w-[32%] ">
                                <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
                                  Accommodation Location
                                </label>
                                  <input 
                                  type="text" 
                                  name="location"
                                  placeholder='Location'
                                  className={`box-border p-[11px] border border-[#0000004D] rounded-[6px] w-full  outline-0 `}
                                  />
                              </div>

                            </div>
                          </div>
                        </div>

                        {/* Transport */}
                        <div className="my-4 ">
                          <h4 className="text-[24px] font-[400] my-6 sm:my-8">
                            Transport
                          </h4>
                          <div className="flex flex-col sm:flex-row  w-full sm:w-[75%] my-2 gap-4 ">
                            <div className="flex flex-col justify-start items-start w-full sm:w-[45%]">
                              <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
                                Transport
                              </label>
                              <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%]  outline-0">
                                <option value="none" hidden></option>
                                <option value="included">Included</option>
                                <option value="not-Included">
                                  Not Included
                                </option>
                              </select>
                            </div>
                            <div className="flex flex-col justify-start items-start w-full sm:w-[45%]">
                              <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
                                Transport type
                              </label>
                              <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%]  outline-0">
                                <option value="none" hidden></option>
                                <option value="flight">Flight</option>
                                <option value="train">Train</option>
                                <option value="bus">Bus</option>
                                <option value="car-service">Car service</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Meal */}
                        <div className="my-4 ">
                          <h4 className="text-[24px] font-[400] my-6 sm:my-8">
                            Meal
                          </h4>
                          <div className="flex flex-col sm:flex-row  w-full sm:w-[75%] my-2 gap-4">
                            <div className="flex flex-col justify-start items-start w-full sm:w-[45%]">
                              <label className="text-[18px] font-[400] mb-2 ">
                                Meal
                              </label>
                              <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%]  outline-0">
                                <option value="none" hidden></option>
                                <option value="included">Included</option>
                                <option value="not-Included">
                                  Not Included
                                </option>
                              </select>
                            </div>
                            <div className="flex flex-col justify-start items-start w-full sm:w-[45%]">
                              <label className="text-[18px] font-[400] mb-2 ">
                                Meal option
                              </label>
                              <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%] outline-0">
                                <option value="" hidden></option>
                                <option value="veg">Vegetarian</option>
                                <option value="non-Vegetarian">
                                  Non-Vegetarian
                                </option>
                                <option value="Jain">Jain</option>
                                <option value="Vegan">Vegan</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* itinerary */}
                        <div className="mt-4">
                          <h4 className="text-[24px] font-[400] my-10">
                            Itinerary Of Day {day}
                          </h4>
                          <div className="flex flex-wrap gap-4 mt-2">
                            {itinerary.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-center w-full sm:w-auto relative"
                              >
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) =>
                                    handleItineraryChange(index, e.target.value)
                                  }
                                  className="box-border p-3  border-1 border-[#0000004D] rounded-[6px]  mr-4  outline-0 w-full"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeItinerary(index)}
                                  className="text-[24px] text-blue-500 ml-2 absolute right-6 cursor-pointer"
                                >
                                  x
                                </button>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={addItinerary}
                              className=" text-[28px] text-red-500 text-lg cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )
              })}
            </>
          )
        })}
    </div>
  )
}