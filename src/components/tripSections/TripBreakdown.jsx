import React, { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export default function TripBreakdownForm({ tripBreakdownCount }) {
  const [openSection, setOpenSection] = useState(null)

  // const [itinerary, setItinerary] = useState([])
  const [files, setFiles] = useState([])

  const [expandedBreakdown, setExpandedBreakdown] = useState([])
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
      itinerary: [],
      media: [],
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
          id: i + 1,
          accommodation: false,
          accommodationType: '',
          accommodationLocation: '',
          transport: false,
          transportType: '',
          meal: false,
          mealOption: '',
          itinerary: [],
          media: [''],
          country: item.country,
          state: item.state,
          city: item.city,
        }
      })

      let tempErrors = newArray.map((item, i) => {
        return {
          id: i + 1,
          accommodation: null,
          accommodationType: null,
          accommodationLocation: null,
          transport: null,
          transportType: null,
          meal: null,
          mealOption: null,
        }
      })

      setTripBreakdownData(tempBreakdownData)
      setErrors(tempErrors)
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
      let tempArr = [...prev]
      tempArr[id] = {
        ...tempArr[id],
        [name]: value,
      }
      return tempArr
    })

    const errorMessage = validateFieldDetails[name](value)

    setErrors((prev) => {
      let tempArr = [...prev]
      tempArr[id] = {
        ...tempArr[id],
        [name]: errorMessage,
      }
      return tempArr
    })
  }

  const addItinerary = (e, day) => {
    e.preventDefault()
    console.log('add-inti-hit', day)
    setTripBreakdownData((prev) => {
      let tempArr = [...prev]
      tempArr[day] = {
        ...tempArr[day],
        itinerary: [
          ...tempArr[day]['itinerary'],
          { id: tempArr[day]['itinerary'].length, value: '' },
        ],
      }
      return [...tempArr]
    })
  }

  const removeItinerary = (e, day, id) => {
    console.log('rem-inti-hit', day, id)

    e.preventDefault()
    setTripBreakdownData((prev) => {
      let tempArr = [...prev]
      tempArr[day] = {
        ...tempArr[day],

        itinerary: tempArr[day]['itinerary'].filter((it) => id !== it.id),
      }
      return [...tempArr]
    })
  }

  const handleItineraryChange = (e, day, id) => {
    e.preventDefault()
    const { value } = e.target
    console.log('iti-change', value)
    setTripBreakdownData((prev) => {
      let tempArr = [...prev]
      tempArr[day] = {
        ...tempArr[day],
        itinerary: tempArr[day]['itinerary'].map((it) => {
          if (it.id === id) {
            return {
              ...it,
              value: value,
            }
          } else {
            return it
          }
        }),
      }
      return [...tempArr]
    })
  }

  const handleDrop = (e, day) => {
    e.preventDefault()

    const droppedFiles = Array.from(e.dataTransfer.files)

    setTripBreakdownData((prev) => {
      let tempArr = [...prev]
      tempArr[day] = {
        ...tempArr[day],
        media: [...tempArr[day].media, ...droppedFiles], // Append files instead of replacing
      }
      return tempArr
    })
  }

  const handleFileSelect = (e, day) => {
    e.preventDefault()

    console.log('media--', e.target, day)

    const selectedFiles = Array.from(e.target.files)
    setFiles([...files, ...selectedFiles])
    setTripBreakdownData((prev) => {
      let tempArr = [...prev]
      tempArr[day] = {
        ...tempArr[day],
        media: [...tempArr[day].media, ...selectedFiles], // Append files instead of replacing
      }
      return tempArr
    })
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

  console.log(
    tripBreakdownData,

    expandedBreakdown,
    'data here',
  )

  return (
    <div className="bg-white p-4 w-full max-w-screen mx-auto sm:p-8">
      <h2 className="text-[2rem] text-black font-[400] mb-6">Trip Breakdown</h2>
      {isValidTripBreakdownCount &&
        expandedBreakdown?.map((item, index) => {
          return (
            <>
              <div className="flex justify-start items-center">
                <h3 className="text-[24px] font=[400] mt-4">DAY {item.days}</h3>
                <span
                  className="flex justify-center cursor-pointer items-center ml-2 mt-3"
                  onClick={() => toggleSection(item.id)}
                >
                  {isOpen(item.days) ? <ChevronUp /> : <ChevronDown />}{' '}
                </span>
              </div>
              {isOpen(item.days) && (
                <div>
                  <div className="flex flex-col justify-between items-center mt-4 sm:flex-row">
                    <p className="text-[20px] font-[400] mb-2 sm:mb-0">
                      Location: {item.city}, {item.state} ,{item.country}
                    </p>
                    <div className="flex flex-col w-full md:flex-row md:items-center md:justify-around sm:w-1/2">
                      <label className="text-[22px] font-[400] mb-2">
                        Upload Images/Media
                      </label>
                      <div
                        className="flex flex-col bg-blue-100 border-2 border-dashed border-gray-400 justify-center p-8 rounded-lg items-center"
                        onDrop={(e) => handleDrop(e, item.days)}
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
                          onChange={(e) => handleFileSelect(e, item.days)}
                        />
                        <label
                          htmlFor="file-upload"
                          className="text-gray-500 text-sm cursor-pointer underline"
                        >
                          (UPLOAD FROM COMPUTER)
                        </label>
                        <p className="text-gray-500 text-sm mt-2">or</p>
                        <p className="text-gray-500 text-sm">(drag & drop)</p>
                      </div>
                      {files.length > 0 && (
                        <ul className="mt-2">
                          {files.map((file, index) => (
                            <li key={index} className="text-gray-700 text-sm">
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

                      <div className="flex flex-col w-full gap-4 my-2 sm:flex-row sm:w-[75%]">
                        <div className="flex flex-col justify-start w-full items-start sm:w-[32%]">
                          <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
                            Accommodation
                          </label>
                          <select
                            id="accommodation"
                            name="accommodation"
                            className="border border-[#0000004D] p-3 rounded-[6px] text-center w-full box-border outline-0"
                            onChange={(e) => handleSelectChange(e, item.id - 1)}
                          >
                            <option value="none" hidden></option>
                            <option value="included">Included</option>
                            <option value="notIncluded">Not Included</option>
                          </select>
                          <span className="text-red-500 text-xs mt-1">
                            {errors[item.id]?.accommodation}
                          </span>
                        </div>

                        <div className="flex flex-col justify-start w-full items-start sm:w-[32%]">
                          <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
                            Accommodation Type
                          </label>
                          <select
                            id="accommodationType"
                            name="accommodationType"
                            className="border border-[#0000004D] p-3 rounded-[6px] text-center w-full box-border outline-0"
                            onChange={(e) => handleSelectChange(e, item.id - 1)}
                            disabled={
                              tripBreakdownData[item.id - 1]?.accommodation ===
                              'notIncluded'
                            }
                          >
                            <option value="none" hidden></option>
                            <option value="Home Stay">Home Stay</option>
                            <option value="Hotel">Hotel</option>
                            <option value="Guest House">Guest House</option>
                            <option value="Hostel">Hostel</option>
                          </select>
                          <span className="text-red-500 text-xs mt-1">
                            {errors[item.id]?.accommodationType}
                          </span>
                        </div>

                        <div className="flex flex-col justify-start w-full items-start sm:w-[32%]">
                          <label
                            htmlFor="accommodationLocation"
                            className="text-[18px] font-[400] md:mb-2 sm:mb-0"
                          >
                            Accommodation Location
                          </label>
                          <select
                            id="accommodationLocation"
                            name="accommodationLocation"
                            className="border border-[#0000004D] p-3 rounded-[6px] text-center w-full box-border outline-0"
                            onChange={(e) => handleSelectChange(e, item.id - 1)}
                          >
                            <option value="none" hidden></option>
                            <option value={item.city}>{item.city}</option>
                          </select>
                          <span className="text-red-500 text-xs mt-1">
                            {errors[item.id]?.accommodationLocation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Transport */}
                  <div className="my-4">
                    <h4 className="text-[24px] font-[400] my-6 sm:my-8">
                      Transport
                    </h4>
                    <div className="flex flex-col w-full gap-4 my-2 sm:flex-row sm:w-[75%]">
                      <div className="flex flex-col justify-start w-full items-start sm:w-[45%]">
                        <label
                          htmlFor="transport"
                          className="text-[18px] font-[400] md:mb-2 sm:mb-0"
                        >
                          Transport
                        </label>
                        <select
                          id="transport"
                          name="transport"
                          className="border border-[#0000004D] p-3 rounded-[6px] text-center w-full box-border outline-0 sm:w-[50%]"
                          onChange={(e) => handleSelectChange(e, item.id - 1)}
                        >
                          <option value="none" hidden></option>
                          <option value="included">Included</option>
                          <option value="notIncluded">Not Included</option>
                        </select>
                        <span className="text-red-500 text-xs mt-1">
                          {errors[item.id]?.transport}
                        </span>
                      </div>
                      <div className="flex flex-col justify-start w-full items-start sm:w-[45%]">
                        <label
                          htmlFor="transportType"
                          className="text-[18px] font-[400] md:mb-2 sm:mb-0"
                        >
                          Transport Type
                        </label>
                        <select
                          id="transportType"
                          name="transportType"
                          className="border border-[#0000004D] p-3 rounded-[6px] text-center w-full box-border outline-0 sm:w-[50%]"
                          onChange={(e) => handleSelectChange(e, item.id - 1)}
                          disabled={
                            (tripBreakdownData[item.id - 1]?.transport ??
                              '') === false ||
                            tripBreakdownData[item.id - 1]?.transport ===
                              'notIncluded'
                          }
                        >
                          <option value="none" hidden></option>
                          <option value="flight">Flight</option>
                          <option value="train">Train</option>
                          <option value="bus">Bus</option>
                          <option value="car-service">Car service</option>
                        </select>
                        <span
                          className={`${
                            tripBreakdownData[item.id - 1]?.transport ===
                            'notIncluded'
                          }? text-red-500 text-xs mt-1:""`}
                        >
                          {/* {errors[item.id]?.transportType} */}
                          field not included
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Meal */}
                  <div className="my-4">
                    <h4 className="text-[24px] font-[400] my-6 sm:my-8">
                      Meal
                    </h4>
                    <div className="flex flex-col w-full gap-4 my-2 sm:flex-row sm:w-[75%]">
                      <div className="flex flex-col justify-start w-full items-start sm:w-[45%]">
                        <label
                          htmlFor="meal"
                          className="text-[18px] font-[400] mb-2"
                        >
                          Meal
                        </label>
                        <select
                          id="meal"
                          name="meal"
                          className="border border-[#0000004D] p-3 rounded-[6px] text-center w-full box-border outline-0 sm:w-[50%]"
                          onChange={(e) => handleSelectChange(e, item.id - 1)}
                        >
                          <option value="none" hidden></option>
                          <option value="included">Included</option>
                          <option value="notIncluded">Not Included</option>
                        </select>
                        <span className="text-red-500 text-xs mt-1">
                          {errors[item.id]?.meal}
                        </span>
                      </div>
                      <div className="flex flex-col justify-start w-full items-start sm:w-[45%]">
                        <label
                          htmlFor="mealOption"
                          className="text-[18px] font-[400] mb-2"
                        >
                          Meal Option
                        </label>
                        <select
                          id="mealOption"
                          name="mealOption"
                          className="border border-[#0000004D] p-3 rounded-[6px] text-center w-full box-border outline-0 sm:w-[50%]"
                          onChange={(e) => handleSelectChange(e, item.id - 1)}
                          disabled={
                            tripBreakdownData[item.id - 1]?.meal ===
                            'notIncluded'
                          }
                        >
                          <option value="" hidden></option>
                          <option value="veg">Vegetarian</option>
                          <option value="non-Vegetarian">Non-Vegetarian</option>
                          <option value="Jain">Jain</option>
                          <option value="Vegan">Vegan</option>
                        </select>
                        <span className="text-red-500 text-xs mt-1">
                          {errors[item.id]?.mealOption}
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
                      {tripBreakdownData[index]?.itinerary?.map(
                        (itinerary, i) => {
                          return (
                            <div
                              key={itinerary.id}
                              className="flex w-full items-center relative sm:w-auto"
                            >
                              <input
                                id={itinerary.id}
                                type="text"
                                value={itinerary.value}
                                onChange={(e) =>
                                  handleItineraryChange(
                                    e,
                                    item.id - 1,
                                    itinerary.id,
                                  )
                                }
                                className="border-[#0000004D] border-1 p-3 rounded-[6px] w-full box-border mr-4 outline-0"
                              />
                              <button
                                type="button"
                                onClick={(e) =>
                                  removeItinerary(e, item.id - 1, itinerary.id)
                                }
                                className="text-[24px] text-blue-500 absolute cursor-pointer ml-2 right-6"
                              >
                                x
                              </button>
                            </div>
                          )
                        },
                      )}
                      <button
                        type="button"
                        onClick={(e) => addItinerary(e, item.id - 1)}
                        className="text-[28px] text-lg text-red-500 cursor-pointer"
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
