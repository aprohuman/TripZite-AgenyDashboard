import React, { useState, useCallback, useMemo, useRef } from 'react'
import backgroundImg from '../../public/images/Background.png'
import logo from '../assets/images/Icon.png'
import { validateEmail, validateName, validateMobile } from '../utils/email'

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const debounceTimeout = useRef(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  // State for form fields
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
    file: '',
  })

  const validateNameForm = {
    agencyName: (value) => {
      if (!value) return 'Agency name is required'
      if (!validateName(value)) return 'Invalid  name formate'
      return ''
    },
    ownerName: (value) => {
      if (!value) return 'ownerName name is required'
      if (!validateName(value)) return 'Invalid  name formate'
      return ''
    },
    email: (value) => {
      if (!value) return 'Email is required'
      if (!validateEmail(value)) return 'Invalid email format'
      return ''
    },
    phone: (value) => {
      if (!value) return 'phone is required'
      if (value.length < 10) return 'phone must be at least 10 characters'
      if (!validateMobile(value)) return 'Invalid formate'
      return ''
    },
  }
  const validateAddressForm = {
    country: () => {
      if (!country.trim()) return 'Country is required'
      return ''
    },
    state: () => {
      if (!state.trim()) return 'State is required'
      return ''
    },
    city: () => {
      if (!city.trim()) return 'City is required'
      return ''
    },
    postalCode: () => {
      if (!postalCode.trim()) return 'Postal code is required'
      return ''
    },
    file: () => {
      if (!file) return 'Please upload a document'
      return ''
    },
  }

  // Modified validation function
  const validateField = (name, value, formType) => {
    const validator =
      formType === 'address' ? validateAddressForm : validateNameForm
    if (validator[name]) {
      setErrors((prev) => ({ ...prev, [name]: validator[name](value) }))
    }
  }
  // Handle input change
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

  // Handle drag over event
  const handleFileUpload = (file) => {
    console.log('Uploaded file:', file)
    setAddressFormData((prev) => ({ ...prev, file }))
  }
  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  // Handle drag leave event
  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  // Handle drop event
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files && files.length > 0) {
        const file = files[0]
        setSelectedFile(file)
        handleFileUpload(file)
      }
    },
    [handleFileUpload],
  )

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      handleFileUpload(file)
    }
  }

  // Trigger file input click
  const handleClick = () => {
    fileInputRef.current.click()
  }

  // Handle form submission
  const handleNameSubmit = (e) => {
    e.preventDefault()
    let formIsValid = true
    const newErrors = {}

    Object.keys(nameFormData).forEach((fieldName) => {
      const error = validateNameForm[fieldName](nameFormData[fieldName])
      newErrors[fieldName] = error
      if (error) formIsValid = false
    })

    setErrors(newErrors)

    if (!formIsValid) setCurrentStep(2)

    setLoading(true)
  }
  const handleAddressSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    let formIsValid = true

    Object.keys(addressFormData).forEach((field) => {
      const error = validateAddressForm[field](addressFormData[field])
      newErrors[field] = error
      if (error) formIsValid = false
    })

    setErrors(newErrors)

    if (formIsValid) {
      setLoading(true)
      const combinedData = { ...nameFormData, ...addressFormData }

      // Submit to backend
      console.log('Submitting:', combinedData)

      try {
        // Replace with actual API call
        const response = fetch('/api/register', {
          method: 'POST',
          body: formData,
        })
        if (response.ok) {
          alert('Registration successful!')
          // Reset forms
          setNameFormData({
            agencyName: '',
            ownerName: '',
            email: '',
            phone: '',
          })
          setAddressFormData({
            country: '',
            state: '',
            city: '',
            postalCode: '',
            file: null,
          })
          setCurrentStep(3)
        } else {
          throw new Error('Registration failed')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('Registration failed. Please try again.')
      } finally {
        setLoading(false)
      }
      setTimeout(() => {
        setLoading(false)
        alert('Registration successful!')
        // Reset forms
        setNameFormData({
          agencyName: '',
          ownerName: '',
          email: '',
          phone: '',
        })
        setAddressFormData({
          country: '',
          state: '',
          city: '',
          postalCode: '',
          file: null,
        })
        setCurrentStep(1)
      }, 1000)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-end px-4 md:px-12 bg-black"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: 'space',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundClip: 'border-box',
        backgroundOrigin: 'padding-box',
      }}
    >
      <div className="shadow-lg w-full sm:max-w-[40rem] md:max-w-[65rem] h-auto md:h-[40rem] flex flex-col md:flex-row relative">
        {/* Black left box */}
        <div className="bg-black flex flex-col   p-6 md:p-12 w-full md:w-[50%] rounded-tl-[1.875rem] md:rounded-l-[1.875rem] md:rounded-tr-none rounded-tr-[1.875rem]  ">
          <div className="w-2/3">
            <h2 className="text-xl md:text-2xl lg:text-[2.5rem] font-medium text-white">
              Sign Up
            </h2>
            <p className="text-sm md:text-base text-white mt-2">
              Upload your details to join Tripzite as a travel agent and explore
              endless opportunities.
            </p>
          </div>
        </div>

        {/* White right box */}
        <div className="bg-white flex flex-col   md:p-12 w-full md:w-[60%] rounded-bl-none md:rounded-tl-[1.875rem] rounded-br-[1.875rem] md:rounded-r-[1.875rem]  absolute right-0 bottom-0 top-0">
          <img
            src={logo}
            alt="tripZite"
            className="w-[6rem] h-[3rem] md:w-[9.375rem] md:h-[4.5rem]"
          />

          {currentStep === 1 ? (
            <div className="flex justify-center ">
              <form onSubmit={handleNameSubmit} className="w-full max-w-sm ">
                {[
                  { label: 'Agency Name', name: 'agencyName', type: 'text' },
                  { label: 'Owner Name', name: 'ownerName', type: 'text' },
                  { label: 'Email ID', name: 'email', type: 'email' },
                  {
                    label: 'Phone No.',
                    name: 'phone',
                    type: 'tel',
                    placeholder: '+919876543210',
                  },
                ].map((field) => (
                  <div key={field.name} className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={nameFormData[field.name]}
                      onChange={handleNameChange}
                      className="w-full border-1 rounded-[1rem]  my-4"
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-black text-white w-[8.5625rem]  my-4"
                  >
                    Proceed
                  </button>
                </div>
              </form>
            </div>
          ) : currentStep === 2 ? (
            <>
              <div className="flex  justify-center ">
                <form action={handleAddressSubmit} className="w-full max-w-sm">
                  <h2 className="font-[400] my-4">Based In</h2>
                  <div>
                    <label htmlFor="">country</label>
                    <input
                      type="text"
                      className="w-full border-1 rounded-[1rem]  my-4"
                    />
                  </div>
                  <div className="flex justify-between">
                    <div className="w-1/2   ">
                      <label htmlFor="">state</label>
                      <input
                        type="text"
                        className="w-full border-1 rounded-[1rem]  my-4"
                      />
                    </div>
                    <div className="w-1/3   ">
                      <label htmlFor="">city</label>
                      <input
                        type="text"
                        className="w-full border-1 rounded-[1rem]  my-4"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Postal code</label>
                    <input
                      type="text"
                      className="w-full border-1 rounded-[1rem]  my-4"
                    />
                  </div>
                  <div>
                    <label htmlFor="">update document</label>
                    <div className="flex justify-center">
                      <div
                        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleClick}
                        style={{
                          border: `2px dashed ${
                            isDragging ? '#2196F3' : '#cccccc'
                          }`,
                          borderRadius: '4px',
                          padding: '2rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: isDragging
                            ? '#f0f8ff'
                            : 'transparent',
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
                            <p>Selected file: {selectedFile.name}</p>
                            <p>
                              Size: {(selectedFile.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p>
                              Drag and drop files here <br /> or <br /> click to
                              upload
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center  p-4  text-white ">
                    <button
                      type="submit"
                      className="rounded-2xl px-5 py-1 bg-black"
                    >
                      send request
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="max-h-full h-[90%]  ">
              <div className=" h-[90%]    ">
                <div className="w-[60%] ">
                  <p className="">
                    Your request has been sent to the{' '}
                    <strong>Tripzite’s</strong> team for verification.
                  </p>
                  <br />
                  <p>
                    You will be contacted within 24hrs regarding the updates of
                    your requests.
                  </p>
                </div>
                <div className="flex items-end    h-[50%]  ">
                  <p className="text-red-900 text-[0.8rem] font-[400] align-bottom  ">
                    *Please confirm your email for Tripzite to have <br />{' '}
                    seamless communication with you.
                  </p>
                </div>
              </div>

              <div className=" flex justify-center">
                <button className="bg-black text-white  p-2">
                  Return to home page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
