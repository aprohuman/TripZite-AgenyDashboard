import React, { useState } from 'react'

export default function TripBreakdownForm() {
  const [itinerary, setItinerary] = useState([''])
  const [files, setFiles] = useState([])
  const addItinerary = () => setItinerary([...itinerary, ''])

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

  return (
    <div className="mx-auto bg-white p-4 sm:p-8 w-full max-w-screen">
      <h2 className="text-[2rem] font-[400]  text-black mb-6">
        Trip Breakdown
      </h2>

      <h3 className="text-[24px] font=[400] mt-4">DAY 1</h3>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between ">
        <p className="text-[20px] font-[400] mb-2 sm:mb-0">
          Location: City, State/Province, Country
        </p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-around w-full sm:w-1/2 ">
          <label className="text-[24px] font-[400] mb-2">
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
            <p className="text-gray-500 text-sm">(drag & drop)</p>
          </div>
          {files.length > 0 && (
            <ul className="mt-2">
              {files.map((file, index) => (
                <li key={index} className="text-sm text-gray-700">
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
          <h4 className="text-[24px] font-[400] my-6 sm:my-8">Accommodation</h4>
          <div className="flex flex-col sm:flex-row  w-full sm:w-[75%] my-2 gap-4">
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-[45%]">
              <label className="text-[20px] font-[400] mb-2 sm:mb-0">
                Accommodation
              </label>
              <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%] sm:ml-4 outline-0">
                <option value="none" hidden></option>
                <option value="hotel">Hotel</option>
                <option value="hostel">Hostel</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-[45%]">
              <label className="text-[20px] font-[400] mb-2 sm:mb-0">
                Accommodation type
              </label>
              <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%] sm:ml-4 outline-0">
                <option value="none" hidden></option>
                <option value="single">Single Room</option>
                <option value="double">Double Room</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="my-4">
          <div className="flex flex-col sm:flex-row sm:justify-between w-full sm:w-[75%] my-2 gap-4 ">
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-full">
              <label className="text-[20px] font-[400] mb-2 sm:mb-0">
                Accommodation location
              </label>
              <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%] sm:ml-4 outline-0">
                <option value="none" hidden></option>
                <option value="hotel">Delhi</option>
                <option value="hostel">Mumbai</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Transport */}
      <div className="my-4 ">
        <h4 className="text-[24px] font-[400] my-6 sm:my-8">Transport</h4>
        <div className="flex flex-col sm:flex-row  w-full sm:w-[75%] my-2 gap-4 ">
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-[45%]">
            <label className="text-[20px] font-[400] mb-2 sm:mb-0">
              Transport
            </label>
            <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%] sm:ml-4 outline-0">
              <option value="none" hidden></option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="flight">Flight</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-[45%]">
            <label className="text-[20px] font-[400] mb-2 sm:mb-0">
              Transport type
            </label>
            <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%] sm:ml-4 outline-0">
              <option value="none" hidden></option>
              <option value="air">By Air</option>
              <option value="road">By Road</option>
            </select>
          </div>
        </div>
      </div>

      {/* Meal */}
      <div className="my-4 ">
        <h4 className="text-[24px] font-[400] my-6 sm:my-8">Meal</h4>
        <div className="flex flex-col sm:flex-row  w-full sm:w-[75%] my-2 gap-4">
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-[45%]">
            <label className="text-[20px] font-[400] mb-2 sm:mb-0">Meal</label>
            <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%] sm:ml-4 outline-0">
              <option value="none" hidden></option>
              <option value="breakfast">Breakfast</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row items-center w-full sm:w-[45%]">
            <label className="text-[20px] font-[400] mb-2 sm:mb-0">
              Meal option
            </label>
            <select className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%] sm:ml-4 outline-0">
              <option value="none" hidden></option>
              <option value="veg">Veg</option>
              <option value="nonveg">Non-Veg</option>
            </select>
          </div>
        </div>
      </div>

      {/* itinerary */}
      <div className="mt-4">
        <h4 className="text-[24px] font-[400] my-10">Itinerary of the Day 1</h4>
        <div className="flex flex-wrap gap-4 mt-2">
          {itinerary.map((item, index) => (
            <div key={index} className="flex items-center w-full sm:w-auto">
              <input
                type="text"
                value={item}
                onChange={(e) => handleItineraryChange(index, e.target.value)}
                className="box-border p-3  border-1 border-[#0000004D] rounded-[6px]  text-center  ml-4  outline-0 w-full"
              />
              <button
                onClick={() => removeItinerary(index)}
                className="text-blue-500 ml-2"
              >
                X
              </button>
            </div>
          ))}
          <button onClick={addItinerary} className="text-red-500 text-lg">
            +
          </button>
        </div>
      </div>
    </div>
  )
}
