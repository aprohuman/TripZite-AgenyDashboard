import React, { useState } from 'react'
import tripDurationData from '../../data/duration.json'

export default function TripDuration({ setStepsCompleted }) {
  const [durationData, setDurationData] = useState({
    overallTripDuration: undefined,
    startDate: null,
    endDate: null,
    bookingDeadline: undefined,
  })

  const [errors, setErrors] = useState({
    overallTripDuration: null,
    startDate: null,
    endDate: null,
    bookingDeadline: null,
  })

  const today = new Date().toISOString().split('T')[0]

  const validateTripDuration = {
    overallTripDuration: (value) => {
      if (!value) return 'Trip duration is required.'
      if (parseInt(value) < 1) return 'Trip duration can not be 0 or negative.'
      return ''
    },
    startDate: (value) => {
      if (!value) return 'Start date is required.'
      return ''
    },
    endDate: (value) => {
      if (!value) return 'End date is required.'
      return ''
    },
    bookingDeadline: (value) => {
      if (!value) return 'Booking deadline is required.'
      if (parseInt(value) < 1)
        return 'Booking deadline can not be 0 or negative.'
      return ''
    },
  }

  console.log(durationData, errors, 'okok')

  const handleChange = (e) => {
    const { name, value } = e.target
    let startDateErrorMessage = ''
    let endDateErrorMessage = ''
    setDurationData((prev) => {
      if (name === 'startDate' && prev.endDate && value > prev.endDate) {
        return { ...prev, startDate: value, endDate: '' }
      } else if (
        name === 'endDate' &&
        prev.startDate &&
        value < prev.startDate
      ) {
        return { ...prev, endDate: value, startDate: '' }
      } else if (name === 'startDate' || name === 'endDate') {
        return { ...prev, [name]: value }
      } else {
        return { ...prev, [name]: parseInt(value) }
      }
    })
    const errorMessage = validateTripDuration[name](value)

    if (
      name === 'startDate' &&
      durationData.endDate &&
      value > durationData.endDate
    ) {
      endDateErrorMessage = validateTripDuration.endDate('')
      setErrors((prev) => ({
        ...prev,
        endDate: endDateErrorMessage,
        [name]: errorMessage,
      }))
    } else if (
      name === 'endDate' &&
      durationData.startDate &&
      value < durationData.startDate
    ) {
      startDateErrorMessage = validateTripDuration.startDate('')
      setErrors((prev) => ({
        ...prev,
        startDate: startDateErrorMessage,
        [name]: errorMessage,
      }))
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: errorMessage,
      }));
    };
  
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }))
    let isFormCompleted = !Object.values(errors).some((i) => i !== '')
    setStepsCompleted((prev) => ({
      ...prev,
      Duration: isFormCompleted,
    }))
  }

  const handleButtons = (e, key) => {
    console.log('bbb', key)
    e.preventDefault()
    let name = key.split('-')[0]
    let type = key.split('-')[1]
    let errorMessage = ''

    if (type === 'increment') {
      errorMessage = validateTripDuration[name]((durationData[name] || 0) + 1)
      setDurationData((prev) => {
        return { ...prev, [name]: prev[name] + 1 }
      })
    } else if (type === 'decrement') {
      errorMessage = validateTripDuration[name]((durationData[name] || 0) - 1)
      setDurationData((prev) => {
        return { ...prev, [name]: prev[name] - 1 }
      })
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }))

    let isFormCompleted = !Object.values(errors).some((i) => i !== '')
    setStepsCompleted((prev) => ({
      ...prev,
      Duration: isFormCompleted,
    }))
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
                  <div className="flex flex-col sm:flex-row w-full justify-end space-y-2 sm:space-y-0 sm:space-x-2 mx-0 sm:mx-10">
                    {field.dates.map((date, dateIdx) => (
                      <div key={dateIdx} className="flex flex-col w-full">
                        <div className="flex flex-col justify-end ml-4">
                          <div className="flex flex-col sm:flex-row w-full">
                            <div className="flex flex-col sm:items-center sm:flex-row space-y-1 sm:space-y-0 sm:space-x-0 w-full">
                              <span className="font-[400] text-[1rem] whitespace-nowrap">
                                {date.label}
                              </span>
                              <input
                                type="date"
                                name={date.id}
                                value={durationData[date.id]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                className="w-full box-border border-1 p-3 border-[#0000004D] rounded-[6px] outline-0 ml-2"
                                min={today} // Prevents past dates
                              />
                            </div>
                          </div>
                          <span className="text-red-500 text-xs mt-1 space-y-2 sm:space-y-0 sm:space-x-2  sm:mx-10 inline-block md:ml-0">
                            {errors[date.id]}
                          </span>
                        </div>
                        <p className="w-full sm:text-center py-1 text-red-500"></p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full sm:w-[100%]">
                    <div className="flex flex-col sm:flex-row w-full justify-start mx-0 sm:mx-10 space-y-2 sm:space-y-0 sm:space-x-2">
                      <input
                        name={field.id}
                        type={field.type}
                        value={durationData[field.id]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full box-border border-1 p-3 border-[#0000004D] rounded-[6px] outline-0"
                      />
                      <div className="flex ">
                        <button
                          onClick={(e) => {
                            handleButtons(e, `${field.id}-increment`)
                          }}
                          className="w-full box-border border-1 p-3 border-[#0000004D] rounded-[6px]"
                        >
                          +
                        </button>
                        <button
                          onClick={(e) => {
                            handleButtons(e, `${field.id}-decrement`)
                          }}
                          className="w-full box-border border-1 p-3 border-[#0000004D] rounded-[6px]"
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <span className="text-red-500 text-xs mt-1 sm:mx-10 space-y-2 sm:space-y-0 sm:space-x-2">
                      {errors[field.id]}
                    </span>
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
