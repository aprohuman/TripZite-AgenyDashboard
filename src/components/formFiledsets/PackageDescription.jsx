import React, { useState } from 'react'
import PackageDescriptionData from '../../data/packageDescription.json'
import { useDispatch, useSelector } from 'react-redux'
import {
  setPackageLongDescription,
  setPackageShortDescription,
  setPackageName,
} from '../../redux/slices/packageDescriptionSlice'
const PackageDescription = ({ setStepsCompleted }) => {
  const dispatch = useDispatch()
  const packageDescription = useSelector(
    (state) => state.packageDescription.tripPackageDescription,
  )

  // console.log('pppp', packageDescription)

  const [errors, setErrors] = useState({
    packageName: null,
    shortDescription: null,
    longDescription: null,
  })

  const [wordCounts, setWordCounts] = useState({
    shortDescription: 0,
    longDescription: 0,
  })

  const sections = PackageDescriptionData?.sections || []

  const calculateWordCount = (text) => {
    const words = text.trim().split(/\s+/)
    return words.length
  }

  const validatePackageDescription = {
    packageName: (value) => {
      if (!value) return 'package name is required.'
      if (value.length <= 2)
        return 'package name should be at least 3 character.'
      return ''
    },
    shortDescription: (value) => {
      if (value.length < 10)
        return 'Description must be at least 10 characters long.'
      return ''
    },
    longDescription: (value) => {
      if (!value) return 'description is required'
      if (value.length < 10)
        return 'Description must be at least 10 characters long.'
      return ''
    },
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'shortDescription' || name === 'longDescription') {
      const newWordCount = calculateWordCount(value)
      setWordCounts((prev) => ({
        ...prev,
        [name]: newWordCount,
      }))
    }

    if (name === 'shortDescription' && wordCounts.shortDescription > 20) return
    if (name === 'longDescription' && wordCounts.longDescription > 250) return

    // dispatch action to the redux to update the value
    if (name === 'packageName') dispatch(setPackageName(value))
    if (name === 'shortDescription') dispatch(setPackageShortDescription(value))
    if (name === 'longDescription') dispatch(setPackageLongDescription(value))

    const errorMessage = validatePackageDescription[name](value)
    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }))

    let isFormCompleted = !Object.values(errors).some((i) => i !== '')
    setStepsCompleted((prev) => ({
      ...prev,
      'Package Description': isFormCompleted,
    }))
  }

  return (
    <div className="bg-white p-4 w-full max-w-screen mx-auto sm:p-8">
      {sections.map((section) => (
        <div key={section.id}>
          <h2 className="text-[2rem] text-black font-[400] mb-6">
            {section.formTitle}
          </h2>
          {section.fields.map((field) => (
            <div
              key={field.id}
              className="flex flex-col justify-between items-start my-4 outline-0 sm:flex-row sm:items-center"
            >
              <label
                htmlFor={field.id}
                className="text-[20px] w-full font-[400] mb-2 sm:mb-0 sm:w-1/4"
              >
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <div className="flex flex-col w-full">
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
                  <span className="text-sm bottom-0 right-0">
                    <span
                      className={`${
                        wordCounts[field.id] > field.validation.maxWords
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`}
                    >
                      {`${wordCounts[field.id]} / ${
                        field.validation.maxWords
                      } words.`}
                    </span>
                  </span>
                  <span className="text-red-500 text-xs mt-1">
                    {errors[field.id]}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col w-full">
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
                    <span
                      className={`${
                        wordCounts[field.id] > field.validation.maxWords
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`}
                    >
                      {`${wordCounts.shortDescription} / ${field.validation.maxWords} words.`}
                    </span>
                  )}
                  {errors[field.id] && (
                    <spam className="text-red-500 text-xs mt-1">
                      {errors[field.id]}
                    </spam>
                  )}
                </div>
              )}
              <p
                className="text-gray-600 text-sm w-full mt-1 pl-1 sm:mt-0 sm:w-1/4"
                dangerouslySetInnerHTML={{ __html: field.note }}
              ></p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default PackageDescription
