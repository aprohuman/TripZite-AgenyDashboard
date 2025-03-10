import React, { useState } from 'react'
import PackageDescriptionData from '../../data/packageDescription.json'

const PackageDescription = () => {
  const [formData, setFormData] = useState({
    packageName: '',
    shortDescription: '',
    longDescription: '',
  })

  const [errors, setErrors] = useState({})

  const validateWordCount = (text, maxWords) => {
    const words = text.trim().split(/\s+/)
    return words.length <= maxWords
  }

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
    <div className="mx-auto bg-white p-4 sm:p-8 w-full">
      {PackageDescriptionData.sections.map((field) => (
        <h2
          key={field.formTitle}
          className="text-2xl font-bold mb-6 text-gray-800"
        >
          {field.formTitle}
        </h2>
      ))}
      <div>
        {PackageDescriptionData.sections.map((section) => (
          <div key={section.id}>
            {section.fields.map((field) => (
              <div
                key={field.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center my-4"
              >
                <label
                  htmlFor={field.id}
                  className="w-full sm:w-1/4 mb-2 sm:mb-0"
                >
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`w-full sm:w-1/2 p-3 border rounded-md focus:ring-2 ${
                      errors[field.id]
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:ring-blue-200'
                    }`}
                    rows={4}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`w-full sm:w-1/2 p-3 border rounded-md focus:ring-2 ${
                      errors[field.id]
                        ? 'border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                )}
                <p className="w-full sm:w-1/4 text-red-500 text-sm mt-1 sm:mt-0">
                  {errors[field.id]}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PackageDescription
