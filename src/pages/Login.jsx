import React, { useState, useCallback, useRef } from 'react'
import { validateEmail } from '../utils/email'
import API from '../config/api.config.js'

function Login(params) {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const debounceTimeout = useRef(null)

  const validateForm = {
    email: (value) => {
      if (!value) return 'Email is required'
      if (!validateEmail(value)) return 'Invalid email format'
      return ''
    },
    password: (value) => {
      if (!value) return 'Password is required'
      if (value.length < 6) return 'Password must be at least 6 characters'
      return ''
    },
  }

  const validateField = useCallback(
    (name, value) => {
      if (
        validateForm.hasOwnProperty(name) &&
        typeof validateForm[name] === 'function'
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validateForm[name](value),
        }))
      } else {
        console.error(`Validation function not found for field: ${name}`)
      }
    },
    [validateForm],
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))

    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      validateField(name, value)
    }, 300) // 300ms debounce
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let formIsValid = true
    const newErrors = {}

    Object.keys(formData).forEach((fieldName) => {
      const error = validateForm[fieldName](formData[fieldName])
      newErrors[fieldName] = error
      if (error) formIsValid = false
    })

    setErrors(newErrors)

    if (!formIsValid) return

    setLoading(true)

    setTimeout(() => {
      alert('Login successful')
      setLoading(false)
    }, 1000)
  }
  //Function to check if the form is valid.
  const isFormValid = () => {
    let isValid = true
    Object.keys(formData).forEach((fieldName) => {
      if (validateForm[fieldName](formData[fieldName])) {
        isValid = false
      }
    })
    return isValid
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F2D2D] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl w-full flex flex-col md:flex-row items-center">
        {/* Left Side - Logo and Image */}
        <div className="flex flex-col items-center p-6 md:w-1/2">
          <h1 className="text-4xl font-bold text-green-900">TRIPZITE</h1>
          <p className="text-sm text-gray-600 mt-2">Agent Log In</p>
          <img
            src="/path-to-image.jpg"
            alt="Tripzite Logo"
            className="w-40 h-52 mt-4 rounded-lg shadow-md"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="md:w-1/1.5 w-full p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-4">
              <input
                type="text"
                name="email"
                placeholder="*Enter your Email ID or Username"
                autoComplete="email"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none ${
                  errors.email ? 'border-red-500' : ''
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="*Password"
                autoComplete="new-password"
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none ${
                  errors.password ? 'border-red-500' : ''
                }`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full p-3 rounded-lg transition ${
                loading || !isFormValid()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              disabled={loading || !isFormValid()}
            >
              {loading ? 'Logging in...' : 'LOG IN'}
            </button>
            <div className="flex justify-between items-center mt-4 text-sm">
              <label className="flex items-center text-gray-600">
                <input type="checkbox" className="mr-2" /> Keep me logged in
              </label>
              <a href="#" className="text-red-500 hover:underline">
                Forgot your Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
