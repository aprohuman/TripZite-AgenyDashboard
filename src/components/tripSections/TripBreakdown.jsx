import React, { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function TripBreakdownForm({ tripBreakdownCount }) {
  const [openSection, setOpenSection] = useState(null)

  const [itinerary, setItinerary] = useState([])
  const [files, setFiles] = useState([])

  const [expandedBreakdown, setExpandedBreakdown] = useState([]);
  const [tripBreakdownData, setTripBreakdownData] = useState([
    {
      id: 0,
      accommodation: false,
      accommodationType: '',
      accommodationLocation: '',
      transport: false,
      transportType: '',
      meal: false,
      mealOption: '',
      itinerary: [{ id: 0, value: '' }],
    },
  ])

  const [errors, setErrors] = useState([
    {
      id: 0,
      accommodation: '',
      accommodationType: '',
      accommodationLocation: '',
      transport: '',
      transportType: '',
      meal: '',
      mealOption: '',
    },
  ])

  const isOpen = (section) => openSection === section 

  const toggleSection = (section) => {
    setTimeout(() => {
      setOpenSection((prev) => (prev === section ? null : section))
    }, 200)
  }

  useEffect(() => {
    if (tripBreakdownCount?.length > 0) {
      let dayCounter = 1 

      const newArray = tripBreakdownCount.flatMap((item) =>
        Array.from({ length: item.days }, (_, index) => ({
          ...item,
          id: dayCounter,
          days: dayCounter++, 
        })),
      )

      setExpandedBreakdown(newArray)
      
      let tempBreakdownData = newArray.map((item, i) => {
          return {
            id: i+1,
            accommodation: false,
            accommodationType: '',
            accommodationLocation: '',
            transport: false,
            transportType: '',
            meal: false,
            mealOption: '',
            itinerary: [{ id: 0, value: '' }],
          }
         });

         let tempErrors = newArray.map((item, i) => {
          return {
            id: i+1,
            accommodation: null,
            accommodationType: null,
            accommodationLocation: null,
            transport: null,
            transportType: null,
            meal: null,
            mealOption: null,
          }
         });

      setTripBreakdownData(tempBreakdownData);
      setErrors(tempErrors);

    } else {
      setExpandedBreakdown([])
      setTripBreakdownData([])
    }
  }, [tripBreakdownCount])


  const validateFieldDetails = {
    accommodation: (value) => (value ? '' : 'Accommodation is required'),
    accommodationType: (value) =>
      value ? '' : 'Accommodation type is required',
    accommodationLocation: (value) =>
      value ? '' : 'Accommodation location is required',
    meal: (value) => (value ? '' : 'Meal option is required'),
    mealOption: (value) => (value ? '' : 'Meal option is required'),
    transport: (value) => (value ? '' : 'Transport option is required'),
    transportType: (value) => (value ? '' : 'Transport type is required'),
  }

  const handleSelectChange = (e, id) => {
    const { name, value } = e.target
    setTripBreakdownData((prev) => {
      let tempArr = [...prev];
         tempArr[id] = {
         ...tempArr[id],
         [name]: value,
      }
      return tempArr;
    })

    const errorMessage = validateFieldDetails[name](value);

    setErrors((prev) => {
        let tempArr = [...prev];
           tempArr[id] = {
           ...tempArr[id],
           [name]: errorMessage,
        }
        return tempArr;
      });
  };


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

  const isValidTripBreakdownCount =
    Array.isArray(tripBreakdownCount) &&
    tripBreakdownCount.length > 0 &&
    tripBreakdownCount.every((obj) => {
      let temp = { ...obj }
      delete temp.id
      return Object.values(temp).every(
        (value) =>
          value !== undefined && value !== null && value !== '' && value !== 0,
      )
    })


  console.log(tripBreakdownData, errors, expandedBreakdown, 'data here')

  return (
    <div className="mx-auto bg-white p-4 sm:p-8 w-full max-w-screen">
      <h2 className="text-[2rem] font-[400]  text-black mb-6">
        Trip Breakdown
      </h2>
      {isValidTripBreakdownCount &&
        expandedBreakdown?.map((item) => {
          return (
            <>
              <div className="flex justify-start items-center">
                <h3 className="text-[24px] font=[400] mt-4">DAY {item.days}</h3>
                <span
                  className="flex justify-center items-center cursor-pointer mt-3 ml-2"
                  onClick={() => toggleSection(item.id)}
                >
                  {isOpen(item.days) ? <ChevronUp /> : <ChevronDown />}{' '}
                </span>
              </div>
              {isOpen(item.days) && (
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
                      <h4 className="text-[24px] font-[400] my-6 sm:my-8">
                        Accommodation
                      </h4>

                      <div className="flex flex-col sm:flex-row  w-full sm:w-[75%] my-2 gap-4">
                        <div className="flex flex-col justify-start items-start w-full sm:w-[32%]">
                          <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
                            Accommodation
                          </label>
                          <select
                            id="accommodation"
                            name="accommodation"
                            className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full  outline-0"
                            onChange={(e) => handleSelectChange(e, item.id)}
                          >
                            <option value="none" hidden></option>
                            <option value="included">Included</option>
                            <option value="notIncluded">Not Included</option>
                          </select>
                          <span className="text-red-500 text-xs mt-1">
                          {errors[item.id].accommodation}
                          </span>
                        </div>

                        <div className="flex flex-col justify-start items-start w-full sm:w-[32%] ">
                          <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
                            Accommodation Type
                          </label>
                          <select
                            id="accommodationType"
                            name="accommodationType"
                            className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full outline-0"
                            onChange={(e) => handleSelectChange(e, item.id)}
                          >
                            <option value="none" hidden></option>
                            <option value="Home Stay">Home Stay</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Guest House">Guest House</option>
                            <option value="Hostel">Hostel</option>
                          </select>
                          <span className="text-red-500 text-xs mt-1">
                          {errors[item.id].accommodationType}
                          </span>
                        </div>

                        <div className="flex flex-col justify-start items-start w-full sm:w-[32%] ">
                          <label
                            htmlFor="accommodationLocation"
                            className="text-[18px] font-[400] md:mb-2 sm:mb-0"
                          >
                            Accommodation Location
                          </label>
                          <select
                          id="accommodationLocation"
                          name="accommodationLocation"
                          className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full outline-0"
                          onChange={(e) => handleSelectChange(e, item.id)}
                        >
                          <option value="none" hidden></option>
                          <option value={item.city}>{item.city}</option>
                        </select>
                          <span className="text-red-500 text-xs mt-1">
                          {errors[item.id].accommodationLocation}
                          </span>
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
                        <label
                          htmlFor="transport"
                          className="text-[18px] font-[400] md:mb-2 sm:mb-0"
                        >
                          Transport
                        </label>
                        <select
                          id="transport"
                          name="transport"
                          className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%]  outline-0"
                          onChange={(e) => handleSelectChange(e, item.id)}
                        >
                          <option value="none" hidden></option>
                          <option value="included">Included</option>
                          <option value="notIncluded">Not Included</option>
                        </select>
                        <span className="text-red-500 text-xs mt-1">
                          {errors[item.id].transport}
                          </span>
                      </div>
                      <div className="flex flex-col justify-start items-start w-full sm:w-[45%]">
                        <label
                          htmlFor="transportType"
                          className="text-[18px] font-[400] md:mb-2 sm:mb-0"
                        >
                          Transport Type
                        </label>
                        <select
                          id="transportType"
                          name="transportType"
                          className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%]  outline-0"
                          onChange={(e) => handleSelectChange(e, item.id)}
                        >
                          <option value="none" hidden></option>
                          <option value="flight">Flight</option>
                          <option value="train">Train</option>
                          <option value="bus">Bus</option>
                          <option value="car-service">Car service</option>
                        </select>
                        <span className="text-red-500 text-xs mt-1">
                          {errors[item.id].transportType}
                        </span>
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
                        <label
                          htmlFor="meal"
                          className="text-[18px] font-[400] mb-2 "
                        >
                          Meal
                        </label>
                        <select
                          id="meal"
                          name="meal"
                          className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%]  outline-0"
                          onChange={(e) => handleSelectChange(e, item.id)}
                        >
                          <option value="none" hidden></option>
                          <option value="included">Included</option>
                          <option value="notIncluded">Not Included</option>
                        </select>
                        <span className="text-red-500 text-xs mt-1">
                          {errors[item.id].meal}
                        </span>
                      </div>
                      <div className="flex flex-col justify-start items-start w-full sm:w-[45%]">
                        <label
                          htmlFor="mealOption"
                          className="text-[18px] font-[400] mb-2 "
                        >
                          Meal Option
                        </label>
                        <select
                          id="mealOption"
                          name="mealOption"
                          className="box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%] outline-0"
                          onChange={(e) => handleSelectChange(e, item.id)}
                        >
                          <option value="" hidden></option>
                          <option value="veg">Vegetarian</option>
                          <option value="non-Vegetarian">Non-Vegetarian</option>
                          <option value="Jain">Jain</option>
                          <option value="Vegan">Vegan</option>
                        </select>
                        <span className="text-red-500 text-xs mt-1">
                          {errors[item.id].mealOption}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* itinerary */}
                  <div className="mt-4">
                    <h4 className="text-[24px] font-[400] my-10">
                      Itinerary Of Day {item.days}
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
    </div>
  )
}
