import React, { useState } from 'react'
import PackageDescriptionData from '../../data/packageDescription.json'

const PackageDescription = () => {
  const [errors, setErrors] = useState({})
  const [isFormCompleted, setISFormCompleted] = useState(false)
  const [packageDescription, setPackageDescription] = useState({
    packageName: '',
    shortDescription: '',
    longDescription: '',
  })
  const [wordCounts, setWordCounts] = useState({
    shortDescription: 0,
    longDescription: 0,
  })

  const sections = PackageDescriptionData?.sections || []

  // Helper function to calculate the word count
  const calculateWordCount = (text) => {
    const words = text.trim().split(/\s+/)
    return words.filter((word) => word.length > 0).length
  }

  const validatePackageDescription = {
    packageName: (value) => {
      if (!value) return 'package name is required'
      if (value.length < 2) return 'package name should be at least 2 character'
      return ''
    },
    shortDescription: (value) => {
      if (value.length < 10)
        return 'Description must be at least 10 characters long'

      return ''
    },
    longDescription: (value) => {
      if (!value) return 'description is required'
      if (value.length < 10)
        return 'Description must be at least 10 characters long'
      return ''
    },
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    // Update the field value
    setPackageDescription((prev) => ({ ...prev, [name]: value }))

    // Real-time validation
    const errorMessage = validatePackageDescription[name](value)
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }))

    // Update word count for the fields
    if (name === 'shortDescription' || name === 'longDescription') {
      const newWordCount = calculateWordCount(value)

      setWordCounts((prev) => ({
        ...prev,
        [name]: newWordCount,
      }))
    }
  }
  // Check if the entire form is error-free
  const isPackageCompleted = Object.values(packageDescription).every(
    (section) => Object.keys(section).length !== 0,
  )

  // Check if the entire form is error-free
  const isNoErrors = Object.values(errors).every(
    (section) => Object.keys(section).length === 0,
  )
  // check form completed
  if (isPackageCompleted === isNoErrors) {
    setISFormCompleted(true)
  }
  return (
    <div className="mx-auto bg-white p-4 sm:p-8 w-full max-w-screen">
      {sections.map((section) => (
        <div key={section.id}>
          <h2 className="text-[2rem] font-[400]  text-black mb-6">
            {section.formTitle}
          </h2>
          {section.fields.map((field) => (
            <div
              key={field.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4 outline-0"
            >
              <label
                htmlFor={field.id}
                className="w-full sm:w-1/4 mb-2 sm:mb-0  font-[400] text-[20px]   "
              >
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <div className=" flex flex-col w-full">
                  <textarea
                    name={field.id}
                    value={packageDescription[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    maxLength={field.validation.maxWords * 2}
                    className={`  w-full box-border p-3 border-1 border-[#0000004D] rounded-[6px] focus:ring-2 outline-0 ${
                      errors[field.id]
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    rows={8}
                  />
                  <span className="bottom-0 right-0 text-sm">
                    <span
                      className={`${
                        wordCounts[field.id] === field.validation.maxWords
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`}
                    >
                      {`${wordCounts[field.id]} / ${field.validation.maxWords}`}
                    </span>
                  </span>
                  <spam className="text-red-500 text-xs mt-1">
                    {errors[field.id]}
                  </spam>
                </div>
              ) : (
                <div className="flex flex-col  w-full">
                  <input
                    type={field.type}
                    name={field.id}
                    value={packageDescription[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    maxLength={field.validation.maxWords * 2}
                    className={`w-full p-3 border-1 border-[#0000004D] rounded-[6px] focus:ring-2 outline-0 ${
                      errors[field.id]
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {field.id === 'shortDescription' && (
                    <span
                      className={`${
                        wordCounts[field.id] >= field.validation.maxWords
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`}
                    >
                      {`${wordCounts.shortDescription} / ${field.validation.maxWords}`}
                    </span>
                  )}
                  {errors[field.id] && (
                    <spam className="text-red-500 text-xs mt-1">
                      {errors[field.id]}
                    </spam>
                  )}
                </div>
              )}
              <p className="w-full sm:w-1/4 text-sm mt-1 sm:mt-0 text-gray-600">
                {field.note || ''}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default PackageDescription
