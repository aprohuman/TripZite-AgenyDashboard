import React, { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import BreakdownDays from './BreakdownDays'

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
    // setFiles([...files, ...selectedFiles])
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
    <div className="mx-auto bg-white p-4 sm:p-8 w-full max-w-screen">
      <h2 className="text-[2rem] font-[400]  text-black mb-6">
        Trip Breakdown
      </h2>
      {isValidTripBreakdownCount &&
        expandedBreakdown?.map((item, index) => {
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
                <BreakdownDays 
                   item={item}
                   index={index}
                   errors={errors}
                   files={files}
                   tripBreakdownData={tripBreakdownData}
                   handleDrop={handleDrop}
                   handleFileSelect={handleFileSelect}
                   handleSelectChange={handleSelectChange}
                   addItinerary={addItinerary}
                   removeItinerary={removeItinerary}
                   handleItineraryChange={handleItineraryChange}
                />
              )}
            </>
          )
        })}
    </div>
  )
}
