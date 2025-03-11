import React, { useState } from 'react'

const initialTripDetails = [
  {
    country: '',
    state: '',
    city: '',
    days: 0,
  },
]

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

export default function TripDetailsForm() {
  const [tripDetails, setTripDetails] = useState(initialTripDetails)
  const [travelLocation, setTravelLocation] = useState('')

  const addNewTrip = (e) => {
    e.preventDefault()
    setTripDetails([
      ...tripDetails,
      { country: '', state: '', city: '', days: 0 },
    ])
  }

  const handleChange = (index, field, value) => {
    const updatedTrips = [...tripDetails]
    updatedTrips[index][field] = value

    if (field === 'country') {
      updatedTrips[index].state = ''
      updatedTrips[index].city = ''
    }

    if (field === 'state') {
      updatedTrips[index].city = ''
    }

    setTripDetails(updatedTrips)
  }

  const incrementDays = (index, e) => {
    e.preventDefault()
    const updatedTrips = [...tripDetails]
    updatedTrips[index].days += 1
    setTripDetails(updatedTrips)
  }

  const decrementDays = (index, e) => {
    e.preventDefault()
    const updatedTrips = [...tripDetails]
    if (updatedTrips[index].days > 0) {
      updatedTrips[index].days -= 1
    }
    setTripDetails(updatedTrips)
  }

  return (
    <div className="p-4 md:p-8 bg-white">
      <h2 className="text-[2rem] font-[400]  text-black mb-6">Trip Details</h2>

      <div className="mt-4">
        <h2 className="text-[20px] font-[400]  text-black mb-6">
          Multi/Singular Travel Location
        </h2>
        <select
          value={travelLocation}
          onChange={(e) => setTravelLocation(e.target.value)}
          className="box-border p-3  mt-2 border-1 border-[#0000004D] rounded-[6px]  w-full md:w-[40%] outline-0"
        >
          <option value="">Select Travel Location</option>
          <option value="us">United States</option>
          <option value="ca">Canada</option>
          <option value="uk">United Kingdom</option>
        </select>
      </div>

      {tripDetails.map((trip, index) => (
        <div key={index} className="mt-4 rounded-lg">
          <h3 className="text-[24px] font-[400]  text-black mb-6">
            {index + 1}st Country / State / City
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
            <div>
              <span className="text-[20px] font-[400]">
                Country of the destination
              </span>
              <select
                value={trip.country}
                onChange={(e) => handleChange(index, 'country', e.target.value)}
                className="box-border p-3  mt-2 border-1 border-[#0000004D] rounded-[6px] w-full"
              >
                <option value="">Select Country</option>
                {Object.keys(countriesData).map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <span className="text-[20px] font-[400]"> State/Province</span>

              <select
                value={trip.state}
                onChange={(e) => handleChange(index, 'state', e.target.value)}
                disabled={!trip.country}
                className="box-border p-3  mt-2 border-1 border-[#0000004D] rounded-[6px] w-full"
              >
                <option value="">Select State</option>
                {trip.country &&
                  Object.keys(countriesData[trip.country]).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <span className="text-[20px] font-[400]">Select city</span>

              <select
                value={trip.city}
                onChange={(e) => handleChange(index, 'city', e.target.value)}
                disabled={!trip.state}
                className="box-border p-3  mt-2 border-1 border-[#0000004D] rounded-[6px] w-full"
              >
                <option value="">Select City</option>
                {trip.state &&
                  countriesData[trip.country][trip.state].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-col md:flex-row items-center">
            <label className="mr-2 text-[20px] font-[400]">No. of days:</label>
            <div className="flex items-center ">
              <input
                type="number"
                value={trip.days}
                readOnly
                className="box-border p-3  border-1 border-[#0000004D] rounded-[6px] w-24 text-center mr-2 "
              />
              <button
                onClick={(e) => incrementDays(index, e)}
                className="box-border border-1 border-[#0000004D] rounded-[6px] p-3 h-full"
              >
                +
              </button>
              <button
                onClick={(e) => decrementDays(index, e)}
                className=" border-1 border-[#0000004D] rounded-[6px] p-3  "
              >
                -
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-col md:flex-row justify-around mt-4">
        <button
          onClick={addNewTrip}
          className="text-gray-400 px-4 py-2 rounded-lg"
        >
          + Add Country
        </button>
        <button className="text-gray-400 px-4 py-2 rounded-lg">
          + Add State/Province
        </button>
        <button className="text-gray-400 px-4 py-2 rounded-lg">
          + Add City
        </button>
      </div>
    </div>
  )
}
