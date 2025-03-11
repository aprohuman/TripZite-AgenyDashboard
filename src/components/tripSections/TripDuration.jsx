import React, { useState } from 'react'
import tripDurationData from '../../data/duration.json'

export default function TripDuration() {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    overallTripDuration: '',
    specificDates: '',
    bookingDeadline: '',
  })

  const today = new Date().toISOString().split('T')[0]

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => {
      if (name === 'startDate' && prev.endDate && value > prev.endDate) {
        return { ...prev, startDate: value, endDate: '' }
      }
      if (name === 'endDate' && prev.startDate && value < prev.startDate) {
        return { ...prev, endDate: value, startDate: '' }
      }
      return { ...prev, [name]: value }
    })
  }

  return (
    <div className="mx-auto bg-white p-4 sm:p-8 w-full max-w-screen gap-2">
      {tripDurationData.tripDuration.map((field, index) => (
        <h2 key={index} className="text-[2rem] font-[400] text-black mb-6">
          {field.title}
        </h2>
      ))}
      <div>
        {tripDurationData.tripDuration.map((duration, index) => (
          <div key={index}>
            {duration.fields.map((field, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4 w-full lg:w-[80%]"
              >
                <label className="w-full sm:w-1/4 mb-2 sm:mb-0 font-[400] text-[20px] whitespace-nowrap">
                  {field.label}
                </label>
                {field.type === 'date' ? (
                  <div className="flex flex-col sm:flex-row w-full sm:w-[100%] justify-end space-y-2 sm:space-y-0 sm:space-x-2 mx-0 sm:mx-10">
                    {field.dates.map((date, dateIdx) => (
                      <div key={dateIdx} className="flex flex-col w-full">
                        <div className="flex flex-col sm:flex-row w-full">
                          <div className="flex flex-col sm:items-center sm:flex-row space-y-1 sm:space-y-0 sm:space-x-0 w-full">
                            <span className="font-[400] text-[1rem] whitespace-nowrap">
                              {date.label}
                            </span>
                            <input
                              type="date"
                              name={date.id}
                              value={formData[date.id]}
                              onChange={handleChange}
                              placeholder={field.placeholder}
                              className="w-full box-border border-1 p-3 border-[#0000004D] rounded-[6px] outline-0"
                              min={today} // Prevents past dates
                            />
                          </div>
                        </div>
                        <p className="w-full sm:text-center py-1 text-red-500"></p>
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
                      className="w-full box-border border-1 p-3 border-[#0000004D] rounded-[6px] outline-0"
                    />
                    <div className="flex ">
                      <button className="w-full box-border border-1 p-3 border-[#0000004D] rounded-[6px]">
                        +
                      </button>
                      <button className="w-full box-border border-1 p-3 border-[#0000004D] rounded-[6px]">
                        -
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
