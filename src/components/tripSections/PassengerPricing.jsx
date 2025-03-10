import React, { useState } from 'react'

export default function PassengerPricingForm() {
  const [passengerDetails, setPassengerDetails] = useState([
    { count: 0, pricing: '', category: '' },
  ])

  const addPassengerDetail = () => {
    setPassengerDetails([
      ...passengerDetails,
      { count: 0, pricing: '', category: '' },
    ])
  }

  const handleChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails]
    updatedDetails[index][field] = value
    setPassengerDetails(updatedDetails)
  }

  const incrementCount = (index) => {
    const updatedDetails = [...passengerDetails]
    updatedDetails[index].count += 1
    setPassengerDetails(updatedDetails)
  }

  const decrementCount = (index) => {
    const updatedDetails = [...passengerDetails]
    if (updatedDetails[index].count > 0) {
      updatedDetails[index].count -= 1
    }
    setPassengerDetails(updatedDetails)
  }

  return (
    <div className="p-4 bg-white w-fll mx-auto">
      <h2 className="text-2xl font-bold ">Passenger count and pricing :</h2>
      {passengerDetails.map((detail, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 rounded-lg"
        >
          <div>
            <label className="block font-semibold">Passenger count</label>
            <div className="flex items-center">
              <input
                type="number"
                value={detail.count}
                readOnly
                className="border p-2 rounded-lg w-full text-center"
              />
              <button
                onClick={() => incrementCount(index)}
                className="bg-gray-300 px-2 py-1 rounded-lg mx-2"
              >
                +
              </button>
              <button
                onClick={() => decrementCount(index)}
                className="bg-gray-300 px-2 py-1 rounded-lg"
              >
                -
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold">Pricing</label>
            <input
              type="text"
              value={detail.pricing}
              onChange={(e) => handleChange(index, 'pricing', e.target.value)}
              className="border p-2 rounded-lg w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">Travel category</label>
            <select
              value={detail.category}
              onChange={(e) => handleChange(index, 'category', e.target.value)}
              className="border p-2 rounded-lg w-full"
            >
              <option value="">Select Category</option>
              <option value="economy">Economy</option>
              <option value="business">Business</option>
              <option value="first-class">First Class</option>
            </select>
          </div>
        </div>
      ))}

      <button
        onClick={addPassengerDetail}
        className="mt-4 text-gray-400 px-4 py-2 rounded-lg w-full md:w-auto"
      >
        + Add more passenger count & pricing
      </button>
    </div>
  )
}
