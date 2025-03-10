import React, { useState } from 'react'
import PackageDescriptionData from '../../data/packageDescription.json'

const PackageDescription = () => {
  const [errors, setErrors] = useState({})
  const [packageDescription, setPackageDescription] = useState({
    packageName: '',
    shortDescription: '',
    longDescription: '',
  })
  const [wordCounts, setWordCounts] = useState({
    shortDescription: 0,
    longDescription: 0,
  })

  const fields = PackageDescriptionData?.fields || []
  const sections = PackageDescriptionData?.sections || []

  // Helper function to calculate the word count
  const calculateWordCount = (text) => {
    const words = text.trim().split(/\s+/)
    return words.filter((word) => word.length > 0).length
  }

  // Validate word count for each field
  const validateWordCount = (text, maxWords) => {
    const wordCount = calculateWordCount(text)
    return wordCount <= maxWords
  }

  const validateField = (fieldId, value) => {
    const fieldConfig = fields.find((f) => f.id === fieldId)
    const maxWords = fieldConfig?.validation?.maxWords
    const errorMessage =
      maxWords && !validateWordCount(value, maxWords)
        ? `Maximum ${maxWords} words exceeded`
        : null
    return errorMessage
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    // Update the field value
    setPackageDescription((prev) => ({ ...prev, [name]: value }))

    // Real-time validation
    const errorMessage = validateField(name, value)
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
                    className={`  w-full box-border p-3 border-1 border-[#0000004D] rounded-[6px] focus:ring-2 outline-0 ${
                      errors[field.id]
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    rows={8}
                  />
                  <span className=" bottom-0 right-0 text-sm text-gray-500">
                    {`${wordCounts[field.id]} / ${field.validation.maxWords}`}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col  w-full">
                  <input
                    type={field.type}
                    name={field.id}
                    value={packageDescription[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`w-full p-3 border-1 border-[#0000004D] rounded-[6px] focus:ring-2 outline-0 ${
                      errors[field.id]
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {field.id === 'shortDescription' && (
                    <span className="  text-sm text-gray-500">
                      {`${wordCounts.shortDescription} / ${field.validation.maxWords}`}
                    </span>
                  )}
                </div>
              )}
              <p className="w-full sm:w-1/4 text-sm mt-1 sm:mt-0 text-gray-600">
                {field.note || ''}
              </p>
              {errors[field.id] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default PackageDescription
