import React, { useState, useRef, useCallback } from 'react'
import { Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addItinerary,
  addMedia,
  updateField,
} from '../../redux/slices/packageBreakDownSlice'
const BreakdownDays = ({
  item,
  index,
  errors,
  files,
  tripBreakdownData,
  handleSelectChange,
  addItinerary,
  removeItinerary,
  handleItineraryChange,
  // setTripBreakdownData,
}) => {
  const [isAccommodationExcluded, setIsAccommodationExcluded] = useState(true)
  const [isTransportExcluded, setIsTransportExcluded] = useState(true)
  const [isMealExcluded, setIsMealExcluded] = useState(true)
  const [fileList, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()
  const handleFileUpload = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrops = useCallback((e, day) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles)
      // setTripBreakdownData((prev) => {
      //   let tempArr = [...prev]
      //   tempArr[day] = {
      //     ...tempArr[day],
      //     media: [...tempArr[day].media, ...droppedFiles],
      //   }
      //   return tempArr
      // })

      dispatch(addMedia({ id: day, files: droppedFiles }))
    }
  }, [])

  const handleFileChange = (e, day) => {
    e.preventDefault()
    const selectedFiles = Array.from(e.target.files)

    if (selectedFiles.length > 0) {
      handleFileUpload(selectedFiles)
      setTripBreakdownData((prev) => {
        let tempArr = [...prev]
        tempArr[day] = {
          ...tempArr[day],
          media: [...tempArr[day].media, ...selectedFiles],
        }
        return tempArr
      })
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    fileInputRef.current.click()
  }

  const handleRemoveFile = (e, day, index) => {
    e.preventDefault()
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
    setTripBreakdownData((prev) => {
      let tempArr = [...prev]
      tempArr[day] = {
        ...tempArr[day],
        media: [...tempArr[day]['media']].filter((_, i) => i !== index),
      }
      return tempArr
    })
  }

  const handleChange = (e, day) => {
    const { name, value } = e.target
    if (name === 'accommodation') {
      setIsAccommodationExcluded(value == 'notIncluded' ? true : false)
      // setTripBreakdownData((prev) => {
      //   let tempArr = [...prev]
      //   tempArr[day] = {
      //     ...tempArr[day],
      //     accommodation: value,
      //     accommodationType: '',
      //     accommodationLocation: '',
      //   }
      //   return tempArr
      // })
      dispatch(updateField({ id: day, name: 'accommodation', value }))
    } else if (name === 'transport') {
      setIsTransportExcluded(value == 'notIncluded' ? true : false)
      setTripBreakdownData((prev) => {
        let tempArr = [...prev]
        tempArr[day] = {
          ...tempArr[day],
          transport: value,
          transportType: '',
        }
        return tempArr
      })
    } else if (name === 'meal') {
      setIsMealExcluded(value == 'notIncluded' ? true : false)
      setTripBreakdownData((prev) => {
        let tempArr = [...prev]
        tempArr[day] = {
          ...tempArr[day],
          meal: value,
          mealOption: '',
        }
        return tempArr
      })
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between items-center mt-4 sm:flex-row">
        <p className="text-[20px] font-[400] mb-2 sm:mb-0">
          Location :{' '}
          <span className="text-gray-400">
            {' '}
            {item.city}, {item.state} ,{item.country}
          </span>
        </p>
        <div className="flex flex-col w-full md:flex-row md:items-center md:justify-around sm:w-1/2">
          <label className="text-[22px] font-[400] mb-2">Upload Media :</label>
          <div
            className="flex flex-col bg-[#CFDAF0] border-2 border-dashed border-gray-400 justify-center p-5 rounded-lg items-center"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrops(e, item.days - 1)}
          >
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              id="file-upload"
              onChange={(e) => handleFileChange(e, item.days - 1)}
            />
            {fileList.length > 0 ? (
              <div className="flex flex-col justify-center items-center">
                <p className="text-[20px] text-black mb-4">Uploaded Files</p>
                <ul className="max-h-[130px] mt-2 overflow-scroll pr-3">
                  {fileList.map((file, index) => (
                    <li
                      key={index}
                      className="flex bg-gray-200 justify-between p-2 rounded-lg shadow-md items-center mb-2"
                    >
                      <div className="flex justify-start items-center">
                        <div className="flex justify-center gap-0 items-center">
                          <p className="text-[#102728] text-ellipsis w-32 mr-[-4px] overflow-hidden whitespace-nowrap">{`[${file.name}`}</p>
                          <p className="ml-[-2px]">{`].${
                            file.name.split('.')[1]
                          }`}</p>
                        </div>

                        <div className="flex flex-col justify-center items-center mx-6">
                          <p className="text-[10px] text-gray-600 capitalize">
                            {file.type.split('/')[0]}
                          </p>
                          <p className="text-[10px] text-gray-600">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <button
                        className="text-red-600 hover:cursor-pointer hover:text-red-800 transition"
                        onClick={(e) =>
                          handleRemoveFile(e, item.days - 1, index)
                        }
                      >
                        <Trash2 size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={(e) => handleClick(e)}
                  className="text-blue-600 cursor-pointer mt-4 underline"
                >
                  Add More
                </button>
              </div>
            ) : (
              <div
                className="flex flex-col justify-between items-center"
                onClick={(e) => handleClick(e)}
              >
                <p className="text-gray-500 text-sm">DRAG AND DROP</p>
                <p className="text-gray-500 text-sm my-2">or</p>
                <p className="text-gray-500 text-sm"> UPLOAD FROM COMPUTER</p>
                <p className="text-gray-500 text-sm mt-2">(images/videos)</p>
              </div>
            )}
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
          <h4 className="text-[24px] font-[400] my-6 sm:my-8">Accommodation</h4>

          <div className="flex flex-col w-full gap-4 my-2 sm:flex-row sm:w-[75%]">
            <div className="flex flex-col justify-start w-full items-start sm:w-[32%]">
              <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
                Accommodation
              </label>
              {console.log(
                tripBreakdownData[item.id - 1]['accommodation'],
                'ok',
              )}
              <select
                id="accommodation"
                name="accommodation"
                className="border border-[#0000004D] p-3 rounded-[6px] text-center w-full box-border outline-0"
                onChange={(e) => handleChange(e, item.id - 1)}
                value={tripBreakdownData[item.id - 1]['accommodation']}
              >
                <option value="" hidden></option>
                <option value="included">Included</option>
                <option value="notIncluded">Not Included</option>
              </select>
              <span className="text-red-500 text-xs mt-1">
                {errors[item.id - 1]?.accommodation}
              </span>
            </div>

            <div className="flex flex-col justify-start w-full items-start sm:w-[32%]">
              <label className="text-[18px] font-[400] md:mb-2 sm:mb-0">
                Accommodation Type
              </label>
              <select
                id="accommodationType"
                name="accommodationType"
                className={`box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full outline-0 ${
                  isAccommodationExcluded
                    ? `bg-gray-100 cursor-not-allowed text-gray-200 border-gray-200`
                    : ``
                }`}
                onChange={(e) => handleSelectChange(e, item.id - 1)}
                disabled={isAccommodationExcluded}
                value={tripBreakdownData[item.id - 1]['accommodationType']}
              >
                <option value="" hidden></option>
                <option value="Home Stay">Home Stay</option>
                <option value="Hotel">Hotel</option>
                <option value="Guest House">Guest House</option>
                <option value="Hostel">Hostel</option>
              </select>
              <span className="text-red-500 text-xs mt-1">
                {errors[item.id - 1]?.accommodationType}
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
                className={`box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full outline-0 ${
                  isAccommodationExcluded
                    ? `bg-gray-100 cursor-not-allowed text-gray-200 border-gray-200`
                    : ``
                }`}
                onChange={(e) => handleSelectChange(e, item.id - 1)}
                disabled={isAccommodationExcluded}
                value={tripBreakdownData[item.id - 1]['accommodationLocation']}
              >
                <option value="" hidden></option>
                <option value={item.city}>{item.city}</option>
              </select>
              <span className="text-red-500 text-xs mt-1">
                {errors[item.id - 1]?.accommodationLocation}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Transport */}
      <div className="my-4">
        <h4 className="text-[24px] font-[400] my-6 sm:my-8">Transport</h4>
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
              onChange={(e) => handleChange(e, item.id - 1)}
              value={tripBreakdownData[item.id - 1]['transport']}
            >
              <option value="none" hidden></option>
              <option value="included">Included</option>
              <option value="notIncluded">Not Included</option>
            </select>
            <span className="text-red-500 text-xs mt-1">
              {errors[item.id - 1]?.transport}
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
              className={`box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%]  outline-0 ${
                isTransportExcluded
                  ? `bg-gray-100 cursor-not-allowed text-gray-200 border-gray-200`
                  : ``
              }`}
              onChange={(e) => handleSelectChange(e, item.id - 1)}
              value={tripBreakdownData[item.id - 1]['transportType']}
              // multiple
              disabled={isTransportExcluded}
            >
              <option value="none" hidden></option>
              <option value="flight">Flight</option>
              <option value="train">Train</option>
              <option value="bus">Bus</option>
              <option value="car-service">Car service</option>
            </select>
            <span className="text-red-500 text-xs mt-1">
              {errors[item.id - 1]?.transportType}
            </span>
          </div>
        </div>
      </div>
      {/* Meal */}
      <div className="my-4">
        <h4 className="text-[24px] font-[400] my-6 sm:my-8">Meal</h4>
        <div className="flex flex-col w-full gap-4 my-2 sm:flex-row sm:w-[75%]">
          <div className="flex flex-col justify-start w-full items-start sm:w-[45%]">
            <label htmlFor="meal" className="text-[18px] font-[400] mb-2">
              Meal
            </label>
            <select
              id="meal"
              name="meal"
              className="border border-[#0000004D] p-3 rounded-[6px] text-center w-full box-border outline-0 sm:w-[50%]"
              onChange={(e) => handleChange(e, item.id - 1)}
              value={tripBreakdownData[item.id - 1]['meal']}
            >
              <option value="none" hidden></option>
              <option value="included">Included</option>
              <option value="notIncluded">Not Included</option>
            </select>
            <span className="text-red-500 text-xs mt-1">
              {errors[item.id - 1]?.meal}
            </span>
          </div>
          <div className="flex flex-col justify-start w-full items-start sm:w-[45%]">
            <label htmlFor="mealOption" className="text-[18px] font-[400] mb-2">
              Meal Option
            </label>
            <select
              id="mealOption"
              name="mealOption"
              className={`box-border p-3 border border-[#0000004D] rounded-[6px] text-center w-full sm:w-[50%] outline-0 ${
                isMealExcluded
                  ? `bg-gray-100 cursor-not-allowed text-gray-200 border-gray-200`
                  : ``
              }`}
              onChange={(e) => handleSelectChange(e, item.id - 1)}
              disabled={isMealExcluded}
              value={tripBreakdownData[item.id - 1]['mealOption']}
            >
              <option value="" hidden></option>
              <option value="veg">Vegetarian</option>
              <option value="non-Vegetarian">Non-Vegetarian</option>
              <option value="Jain">Jain</option>
              <option value="Vegan">Vegan</option>
            </select>
            <span className="text-red-500 text-xs mt-1">
              {errors[item.id - 1]?.mealOption}
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
          {tripBreakdownData[index]?.itinerary?.map((itinerary, i) => {
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
                    handleItineraryChange(e, item.id - 1, itinerary.id)
                  }
                  className="border-[#0000004D] border-1 p-3 rounded-[6px] w-full box-border mr-4 outline-0"
                />
                <button
                  type="button"
                  onClick={(e) => removeItinerary(e, item.id - 1, itinerary.id)}
                  className="text-[24px] text-blue-500 absolute cursor-pointer ml-2 right-6"
                >
                  x
                </button>
              </div>
            )
          })}
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
  )
}

export default BreakdownDays
