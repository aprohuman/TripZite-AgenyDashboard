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
    <div className="p-4 md:p-8 bg-white my-20">
      <h2 className="text-[2rem] font-[400]  text-black mb-6">
        Passenger count and pricing :
      </h2>
      {passengerDetails.map((detail, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 rounded-lg"
        >
          <div>
            <label className="text-[20px] font-[400]">Passenger count</label>
            <div className="flex items-center ">
              <input
                type="number"
                value={detail.count}
                readOnly
                className="p-2  border-1 border-[#0000004D] rounded-[6px]  w-full  outline-0 text-center mr-2"
              />
              <button
                onClick={() => incrementCount(index)}
                className=" border-1 border-[#0000004D] rounded-[6px] p-2   "
              >
                +
              </button>
              <button
                onClick={() => decrementCount(index)}
                className=" border-1 border-[#0000004D] rounded-[6px] p-2  "
              >
                -
              </button>
            </div>
          </div>

          <div>
            <label className="text-[20px] font-[400]">Pricing</label>
            <input
              type="text"
              value={detail.pricing}
              onChange={(e) => handleChange(index, 'pricing', e.target.value)}
              className="p-2  border-1 border-[#0000004D] rounded-[6px]  w-full  outline-0"
            />
          </div>

          <div>
            <label className="text-[20px] font-[400]">Travel category</label>
            <select
              value={detail.category}
              onChange={(e) => handleChange(index, 'category', e.target.value)}
              className="p-2  border-1 border-[#0000004D] rounded-[6px]  w-full  outline-0"
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
