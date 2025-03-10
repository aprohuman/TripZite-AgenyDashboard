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
    <div className="p-4 bg-white w-full mx-auto">
      <h2 className="text-2xl font-bold">Trip Breakdown</h2>

      <h3 className="text-lg font-semibold mt-4">DAY 1</h3>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-gray-500 mb-2 sm:mb-0">
          Location: City, State/Province, Country
        </p>
        <div className="flex flex-col w-full sm:w-1/2">
          <label className="block font-semibold mb-2">Upload Media</label>
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

      <div className="my-4">
        <h4 className="font-semibold">Accommodation</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
          <div className="flex items-center">
            <h4 className="text-gray-400">Accommodation</h4>
            <select className="border p-2 rounded-lg w-full ml-4">
              <option value="none" hidden></option>
              <option value="hotel">Hotel</option>
              <option value="hostel">Hostel</option>
            </select>
          </div>
          <div className="flex items-center">
            <h4 className="text-gray-400">Accommodation type</h4>
            <select className="border p-2 rounded-lg w-full ml-4">
              <option value="none" hidden></option>
              <option value="single">Single Room</option>
              <option value="double">Double Room</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold">Itinerary of the Day 1</h4>
        <div className="flex flex-wrap gap-4 mt-2">
          {itinerary.map((item, index) => (
            <div key={index} className="flex items-center w-full sm:w-auto">
              <input
                type="text"
                value={item}
                onChange={(e) => handleItineraryChange(index, e.target.value)}
                className="border p-2 rounded-lg w-full"
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
