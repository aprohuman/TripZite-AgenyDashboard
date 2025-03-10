import React, { useState } from 'react'
import tripDurationData from '../../data/duration.json'

export default function TripDuration() {
  const [formData, setFormData] = useState({
    overallTripDuration: '',
    specificDates: '',
    bookingDeadline: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Real-time validation
    const fieldConfig = PackageDescriptionData.fields.find((f) => f.id === name)
    if (fieldConfig?.validation?.maxWords) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateWordCount(value, fieldConfig.validation.maxWords)
          ? null
          : `Maximum ${fieldConfig.validation.maxWords} words exceeded`,
      }))
    }
  }

  return (
    <div className="bg-white p-6 sm:p-10 gap-2">
      {tripDurationData.tripDuration.map((field) => (
        <h1 className="text-2xl font-bold mb-6 text-gray-800">{field.title}</h1>
      ))}
      <div>
        {tripDurationData.tripDuration.map((duration) => (
          <>
            {duration.fields.map((field) => (
              <div className="flex flex-col sm:flex-row items-center my-4">
                <label
                  htmlFor=""
                  className="w-full sm:w-auto text-center sm:text-left"
                >
                  {field.label}
                </label>
                {field.type === 'date' ? (
                  <div className="flex flex-col sm:flex-row w-full sm:w-[100%] justify-end space-y-2 sm:space-y-0 sm:space-x-2 mx-0 sm:mx-10">
                    {field.dates.map((date) => (
                      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 w-full">
                        <span>{date.label}</span>
                        <input
                          type={field.type}
                          name={field.id}
                          value={formData[field.id]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="p-3 border rounded-md w-full"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row w-full sm:w-[100%] justify-start mx-0 sm:mx-10 space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                      name={field.id}
                      value={formData[field.id]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="p-3 border rounded-md w-full"
                    />
                    <div className="flex space-x-2">
                      <button className="p-3 border rounded-md">+</button>
                      <button className="p-3 border rounded-md">-</button>
                    </div>
                  </div>
                )}
                <p className="w-full sm:w-[25%] text-center sm:text-left">
                  error
                </p>
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  )
}
