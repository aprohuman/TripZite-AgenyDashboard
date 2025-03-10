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
    <div className="mx-auto bg-white p-4 sm:p-8 w-full max-w-screen  gap-2">
      {tripDurationData.tripDuration.map((field) => (
        <h2 className="text-[2rem] font-[400]  text-black mb-6">
          {field.title}
        </h2>
      ))}
      <div>
        {tripDurationData.tripDuration.map((duration) => (
          <>
            {duration.fields.map((field) => (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4 w-full lg:w-[80%]   ">
                <label
                  htmlFor=""
                  className="w-full sm:w-1/4 mb-2 sm:mb-0  font-[400] text-[20px]   "
                >
                  {field.label}
                </label>
                {field.type === 'date' ? (
                  <div className="flex flex-col sm:flex-row w-full sm:w-[100%] justify-end space-y-2 sm:space-y-0 sm:space-x-2 mx-0 sm:mx-10 ">
                    {field.dates.map((date) => (
                      <div className="flex flex-col w-full ">
                        <div className="flex flex-col sm:flex-row    w-full ">
                          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-0 w-full">
                            <span className="font-[400] text-[20px]">
                              {date.label}
                            </span>
                            <input
                              type={field.type}
                              name={field.id}
                              value={formData[field.id]}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              className=" w-full box-border border-1 p-3  border-[#0000004D] rounded-[6px] outline-0 "
                            />
                          </div>
                        </div>
                        <p className="w-full   sm:text-center  py-1">error</p>
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
                      className="w-full box-border border-1 p-3  border-[#0000004D] rounded-[6px] outline-0"
                    />
                    <div className="flex space-x-2">
                      <button className="w-full box-border border-1 p-3  border-[#0000004D] rounded-[6px]">
                        +
                      </button>
                      <button className="w-full box-border border-1 p-3  border-[#0000004D] rounded-[6px]">
                        -
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  )
}
