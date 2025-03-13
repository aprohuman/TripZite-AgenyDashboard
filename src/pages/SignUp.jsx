import React, { useState, useCallback, useRef } from 'react'
import backgroundImg from '../../public/images/Background.png'
import logo from '../assets/images/Icon.png'
import {
  validateEmail,
  validateName,
  validateMobile,
} from '../utils/validators'
import PhoneOTPInput from '../components/PhoneOTPInput'
import OTPVerification from '../components/OTPVerification'
import axios from 'axios'
import {
  sentOtp,
  verifyOneTimePassword,
  submitAddress,
} from '../services/apiService'

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const debounceTimeout = useRef(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const [nameFormData, setNameFormData] = useState({
    agencyName: '',
    ownerName: '',
    email: '',
    phone: '',
  })

  const [addressFormData, setAddressFormData] = useState({
    country: '',
    state: '',
    city: '',
    postalCode: '',
  })
  const [otpData, setOtpData] = useState({
    otp: '',
  })
  const validateNameForm = {
    agencyName: (value) =>
      !value
        ? 'Agency name is required'
        : !validateName(value)
        ? 'Invalid name format'
        : '',
    ownerName: (value) =>
      !value
        ? 'Owner name is required'
        : !validateName(value)
        ? 'Invalid name format'
        : '',
    email: (value) =>
      !value
        ? 'Email is required'
        : !validateEmail(value)
        ? 'Invalid email format'
        : '',
    phone: (value) =>
      !value
        ? 'Phone is required'
        : value.length < 10
        ? 'Phone must be at least 10 characters'
        : !validateMobile(value)
        ? 'Invalid format'
        : '',
  }

  const validateAddressForm = {
    country: (value) => (!value.trim() ? 'Country is required' : ''),
    state: (value) => (!value.trim() ? 'State is required' : ''),
    city: (value) => (!value.trim() ? 'City is required' : ''),
    postalCode: (value) => (!value.trim() ? 'Postal code is required' : ''),
  }

  const validateField = (name, value, formType) => {
    const validator =
      formType === 'address' ? validateAddressForm : validateNameForm
    if (validator[name]) {
      setErrors((prev) => ({ ...prev, [name]: validator[name](value) }))
    }
  }

  const handleNameChange = (e) => {
    const { name, value } = e.target
    setNameFormData((prev) => ({ ...prev, [name]: value }))

    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      validateField(name, value, 'name')
    }, 300)
  }

  const handleAddressChange = (e) => {
    const { name, value } = e.target
    setAddressFormData((prev) => ({ ...prev, [name]: value }))

    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      validateField(name, value, 'address')
    }, 300)
  }

  const handleFileUpload = (file) => {
    // setAddressFormData((prev) => ({ ...prev, file }));
  }

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) {
        setSelectedFile(file)
        handleFileUpload(file)
      }
    },
    [handleFileUpload],
  )

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      handleFileUpload(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  // API call for sending OTP
  const sendOtpHandler = async () => {
    try {
      setLoading(true)

      // api call to send otp
      const response = await sentOtp({
        email: nameFormData.email,
        phone: nameFormData.phone,
      })

      if (response.data.success) {
        const { otp } = await response.data

        setLoading(false)
        setOtpData(otp)
        setCurrentStep(2) // Move to verification screen step
      } else {
        setVerificationStatus(false)
      }
    } catch (error) {
      setLoading(false)
      console.error('Error sending OTP:', error)
    }
  }

  const handleNameSubmit = (e) => {
    e.preventDefault()
    let formIsValid = true
    const newErrors = {}

    Object.keys(nameFormData).forEach((field) => {
      const error = validateNameForm[field](nameFormData[field])
      newErrors[field] = error
      if (error) formIsValid = false
    })

    setErrors(newErrors)
    if (formIsValid) setCurrentStep(2)
  }

  const handleAddressSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    // Validate the address form fields
    let formIsValid = Object.keys(addressFormData).every((field) => {
      const error = validateAddressForm[field](addressFormData[field])
      newErrors[field] = error
      return !error // Continue only if no errors are found
    })

    setErrors(newErrors)

    if (!formIsValid) return

    try {
      setLoading(true)
      // API call to submit the address
      // const response = await submitAddress(addressFormData)

      alert('Address submitted:')
      setCurrentStep(4)
      console.error('Error submitting address:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-end px-4 md:px-12 bg-black"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="shadow-lg w-full sm:max-w-[40rem] md:max-w-[65rem] h-auto md:h-[40rem] flex flex-col md:flex-row">
        <div className="bg-black p-6 md:p-12 w-full md:w-[50%] rounded-tl-[1.875rem] md:rounded-l-[1.875rem]">
          <h2 className="text-xl md:text-2xl lg:text-[2.5rem] font-medium text-white">
            Sign Up
          </h2>
          <p className="text-xs md:text-sm text-white font-light mt-2">
            Upload your details to join Tripzite as a<br />
            travel agent and explore endless <br />
            opportunities.
          </p>
        </div>

        <div className="bg-white p-12 w-full md:w-[60%] rounded-br-[1.875rem] md:rounded-r-[1.875rem]">
          <img src={logo} alt="TripZite" className="w-[6rem] h-[3rem]" />

          {currentStep === 1 ? (
            <form onSubmit={handleNameSubmit}>
              {Object.keys(nameFormData).map((field) => (
                <div key={field} className="mb-3">
                  <label className="block text-gray-700 font-semibold mb-2">
                    {field
                      .replace(/([a-z])([A-Z])/g, '$1 $2')
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={nameFormData[field]}
                    onChange={handleNameChange}
                    className={`w-full p-2 border rounded-[1.2rem]  text-[0.75rem] font-[400] focus:border-green-500 outline-none  mb-2`}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-xs">{errors[field]}</p>
                  )}
                </div>
              ))}
              <div className="flex justify-center items-center">
                <button type="submit" className="bg-black text-white py-1 px-5">
                  Proceed
                </button>
              </div>
            </form>
          ) : currentStep === 3 ? (
            <form onSubmit={handleAddressSubmit}>
              <legend className="block text-gray-700 font-semibold mb-2">
                Based In
              </legend>
              {Object.keys(addressFormData).map((field, i) => (
                <div
                  key={field}
                  className={`mb-4 flex flex-col justify-between items-start ${
                    i === 1 ? `w-[48%] inline-block` : ``
                  } ${i === 2 ? `w-[48%] inline-block ml-4` : ``} `}
                >
                  <label className={`block text-gray-700 font-semibold mb-2`}>
                    {field
                      .replace(/([a-z])([A-Z])/g, '$1 $2')
                      .replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={addressFormData[field]}
                    onChange={handleAddressChange}
                    className={`w-full p-2 border rounded-[1.2rem]  text-[0.75rem] font-[400] focus:border-green-500 outline-none  mb-2`}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="" className="text-gray-700 font-semibold ">
                  Upload Document
                </label>
                <div className="flex justify-center my-2  w-full">
                  <div
                    className={`drop-zone ${
                      isDragging ? 'dragging' : ''
                    } bg-[#DAE9CC] w-full`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleClick}
                    style={{
                      border: `6px dashed ${
                        isDragging ? '#2196F3' : '#FFF3E7'
                      }`,
                      padding: '2rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: isDragging ? '#f0f8ff' : '#DAE9CC',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      accept="image/*,.pdf,.doc,.docx" // Specify accepted file types
                    />

                    {selectedFile ? (
                      <div>
                        <p className="text-[#102728]">
                          Selected file: {selectedFile.name}
                        </p>
                        <p className="text-[#102728]">
                          Size: {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-[#102728]">
                          Drag and Drop
                          <br /> or <br />
                          Click to upload
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <button type="submit" className="bg-black text-white py-1 px-5">
                  Proceed
                </button>
              </div>
            </form>
          ) : currentStep === 2 ? (
            <>
              <OTPVerification
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                otpData={otpData}
              />
            </>
          ) : (
            <div className=" h-full flex flex-col  items-center justify-between px-5 py-10">
              <div className="flex flex-col  gap-4 py-5">
                <p className="text-gray-700 text-base font-light">
                  Your request has been sent to the <strong>Tripzite’s</strong>{' '}
                  team for verification.
                </p>
                <p className="text-gray-700 text-base font-light">
                  You will be contacted within 24hrs regarding the updates of
                  your requests.
                </p>
              </div>

              <div className="flex justify-center items-center gap-8   w-full">
                <button className="md:w-[50%] w-full bg-black text-white py-1 px-5">
                  Return To Home Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
