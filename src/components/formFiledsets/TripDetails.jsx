import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTrip, updateTrip } from '../../redux/slices/packageDetailSlice'

const countriesData = {
  India: {
    Maharashtra: ['Mumbai', 'Pune'],
    Karnataka: ['Bangalore', 'Mysore'],
  },
  USA: {
    California: ['Los Angeles', 'San Francisco'],
    'New York': ['New York City', 'Buffalo'],
  },
}

export default function TripDetailsForm({ setTripBreakDownCount }) {
  const dispatch = useDispatch()
  const tripDetails = useSelector((state) => state.packageDetail.trips)

  console.log('tripDetails', tripDetails)
  // const [tripDetails, setTripDetails] = useState([
  //   {
  //     id: 0,
  //     country: '',
  //     state: '',
  //     city: '',
  //     days: 0,
  //   },
  // ])

  const [errors, setErrors] = useState([
    {
      id: 0,
      country: null,
      state: null,
      city: null,
      days: null,
    },
  ])

  const [travelType, setTravelType] = useState('Singular Travel Location')

  const isValidTripDetail =
    Array.isArray(tripDetails) &&
    tripDetails.length > 0 &&
    tripDetails.every((obj) =>
      Object.values(obj).every(
        (value) =>
          value !== undefined && value !== null && value !== ' && value!==0',
      ),
    )

  useEffect(() => {
    if (isValidTripDetail) {
      setTripBreakDownCount((prev) => {
        const updatedBreakdown = [...prev]

        tripDetails.forEach((trip, index) => {
          if (updatedBreakdown[index]) {
            updatedBreakdown[index] = { ...updatedBreakdown[index], ...trip }
          } else {
            updatedBreakdown.push(trip)
          }
        })
        return updatedBreakdown
      })
    }
  }, [tripDetails, isValidTripDetail, setTripBreakDownCount])

  const validateTripDetails = {
    country: (value) => {
      if (!value) return 'Country is required.'
      return ''
    },
    state: (value) => {
      if (!value) return 'State is required.'
      return ''
    },
    city: (value) => {
      if (!value) return 'City is required.'
      return ''
    },
    days: (value) => {
      if (!value) return 'Days are required.'
      if (parseInt(value) < 1) return 'Days can not be 0 or negative.'
      return ''
    },
  }

  const addNewTrip = (e, type, prefill = {}) => {
    e.preventDefault()

    dispatch(addTrip(prefill))

    setErrors((prev) => {
      return [
        ...prev,
        {
          id: prev.length,
          country: null,
          state: null,
          city: null,
          days: null,
        },
      ]
    })
  }

  const handleChange = (e, id) => {
    e.preventDefault()
    const { name, value } = e.target
    console.log('dat-check', name, value)

    const updatedErrors = {}

    if (name === 'country') {
      dispatch(updateTrip({ id, name, value }))

      updatedErrors.state = validateTripDetails.state('')
      updatedErrors.city = validateTripDetails.city('')
    }

    if (name === 'state') {
      dispatch(updateTrip({ id, name, value }))

      updatedErrors.city = validateTripDetails.city('')
    } else {
      dispatch(updateTrip({ id, name, value }))
    }

    updatedErrors[name] = validateTripDetails[name](value)

    setErrors((prev) => {
      return [
        ...prev.map((error) => {
          if (error.id === id) {
            return { ...error, ...updatedErrors }
          }
          return error
        }),
      ]
    })
  }

  const updateDays = (e, id, change) => {
    e.preventDefault()

    const currentDays = tripDetails[id].days || 0
    const newDays = currentDays + change

    const errorMessage = validateTripDetails.days(newDays)

    // Dispatch Redux action
    dispatch(updateTrip({ id, name: 'days', value: newDays }))
  }

  return (
    <div className="p-4 md:p-8 bg-white mt-2">
      <h2 className="text-[2rem] font-[400]  text-black mb-6">
        Trip Details :
      </h2>

      <div className="mt-4">
        <h2 className="text-[20px] font-[400]  text-black mb-6">
          Multi/Singular Travel Location
        </h2>
        <select
          value={travelType}
          onChange={(e) => setTravelType(e.target.value)}
          className="box-border p-3  mt-2 border-1 border-[#0000004D] rounded-[6px]  w-full md:w-[40%] outline-0"
        >
          <option value="Singular Travel Location">
            Singular Travel Location
          </option>
          <option value="Multiple Travel Locations">
            Multiple Travel Locations
          </option>
        </select>
      </div>

      {tripDetails.map((trip) => (
        <div key={trip.id} className="mt-4 rounded-lg">
          <h3 className="text-[24px] font-[400]  text-black mb-6">
            {trip.id + 1}st Country / State / City
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div>
              <label className="text-[20px] font-[400]">
                Country Of The Destination
              </label>
              <select
                value={trip.country}
                name="country"
                onChange={(e) => handleChange(e, trip.id)}
                className="box-border p-3  mt-2 border-1 border-[#0000004D] rounded-[6px] w-full"
              >
                <option value="" disabled>
                  Select Country
                </option>
                {Object.keys(countriesData).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <span className="text-red-500 text-xs mt-2">
                {errors[trip.id].country}
              </span>
            </div>
            <div>
              <label className="text-[20px] font-[400]"> State/Province</label>
              <select
                value={trip.state}
                name="state"
                onChange={(e) => handleChange(e, trip.id)}
                disabled={!trip.country}
                className={`box-border p-3  mt-2 border-1 border-[#0000004D] rounded-[6px] w-full ${
                  !trip.country
                    ? `bg-gray-100 cursor-not-allowed text-gray-200 border-gray-200`
                    : ``
                } `}
              >
                <option value="">Select State</option>
                {trip.country &&
                  Object.keys(countriesData[trip.country]).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
              </select>
              <span className="text-red-500 text-xs mt-2">
                {errors[trip.id].state}
              </span>
            </div>
            <div>
              <label className="text-[20px] font-[400]">Select City</label>
              <select
                value={trip.city}
                name="city"
                onChange={(e) => handleChange(e, trip.id)}
                disabled={!trip.state}
                className={`box-border p-3  mt-2 border-1 border-[#0000004D] rounded-[6px] w-full ${
                  !trip.state
                    ? `bg-gray-100 cursor-not-allowed text-gray-200 border-gray-200`
                    : ``
                }`}
              >
                <option value="">Select City</option>
                {trip.state &&
                  countriesData[trip.country][trip.state]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
              <span className="text-red-500 text-xs mt-2">
                {errors[trip.id].city}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col md:flex-row items-center">
            <label className="mr-2 text-[20px] font-[400]">No. of days:</label>
            <div className="flex flex-col">
              <div className="flex items-center ">
                <input
                  type="number"
                  name="days"
                  value={trip.days === undefined ? 0 : trip.days}
                  onChange={(e) => handleChange(e, trip.id)}
                  placeholder="0 days"
                  className="box-border p-3  border-1 border-[#0000004D] rounded-[6px] w-24 text-center mr-2 "
                />
                <button
                  type="button"
                  onClick={(e) => updateDays(e, trip.id, 1)}
                  className="box-border border-1 border-[#0000004D] rounded-[6px] p-3 h-full w-[44px]"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={(e) => updateDays(e, trip.id, -1)}
                  className=" border-1 border-[#0000004D] rounded-[6px] p-3 w-[44px] ml-2 "
                >
                  -
                </button>
              </div>
              <span className="text-red-500 text-xs mt-2">
                {errors[trip.id].days}
              </span>
            </div>
          </div>
        </div>
      ))}

      {travelType === 'Multiple Travel Locations' && (
        <div className="flex flex-col md:flex-row justify-around mt-4">
          <button
            type="button"
            onClick={(e) => addNewTrip(e, 'country')}
            className="text-gray-400 px-4 py-2 rounded-lg"
          >
            + Add Country
          </button>
          <button
            type="button"
            onClick={(e) =>
              addNewTrip(e, 'state', {
                country: tripDetails[tripDetails.length - 1]?.country,
              })
            }
            className="text-gray-400 px-4 py-2 rounded-lg"
          >
            + Add State/Province
          </button>
          <button
            type="button"
            onClick={(e) =>
              addNewTrip(e, 'city', {
                country: tripDetails[tripDetails.length - 1]?.country,
                state: tripDetails[tripDetails.length - 1]?.state,
              })
            }
            className="text-gray-400 px-4 py-2 rounded-lg"
          >
            + Add City
          </button>
        </div>
      )}
    </div>
  )
}
