import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import { getCountryCallingCode, getCountries } from 'libphonenumber-js'
import OTPVerification from './OTPVerification'

function PhoneOTPInput() {
  const [phone, setPhone] = useState('')
  const [isEmailOTP, setIsEmailOTP] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({ phone: '', email: '' })
  const [verifyOtp, setVerifyOtp] = useState(false)

  // Custom country select without flags
  const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    //   console.log('labels',labels)
    <select
      {...rest}
      value={value}
      onChange={(e) => onChange(e.target.value || undefined)}
      className="pr-2 bg-white border-r border-gray-300 outline-none"
    >
      <option value="">{labels}</option>
      {getCountries().map((country) => (
        <option key={country} value={country}>
          +{getCountryCallingCode(country)}
        </option>
      ))}
    </select>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({ phone: '', email: '' })

    if (isEmailOTP) {
      if (!validateEmail(email)) {
        setErrors({ email: 'Invalid email address' })
        return
      }
      // Handle email OTP logic
    } else {
      if (!phone || !isValidPhoneNumber(phone)) {
        setErrors({ phone: 'Invalid phone number' })
        return
      }
      // Handle phone OTP logic
    }

    setLoading(true)
    // Add your OTP sending logic here
    setTimeout(() => {
      setLoading(false)
      alert('OTP sent successfully!')
      setVerifyOtp(true)
    }, 1000)
  }

  return (
    <div className="md:w-1/1.5 w-full  border-0 ">
      {verifyOtp ? (
        <OTPVerification />
      ) : (
        <>
          <h2 className="text-[2rem] font-[400] text-gray-800 mb-6 text-center md:text-start  ">
            Two-step Verification
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-[2rem]">
              <label className="block text-sm font-medium mb-4 ">
                Enter your Phone no.
              </label>
              <div className=" ">
                <PhoneInput
                  countryCallingCodeEditable={false} // Add this prop
                  international={false}
                  defaultCountry="IN"
                  value={phone}
                  onChange={setPhone}
                  countrySelectComponent={CountrySelect}
                  className="flex items-center border p-3 outline-none rounded-[1rem] "
                  inputclassname="w-full border-none "
                  numberInputProps={{
                    className: '!border-0 !ring-0',
                  }}
                  countrySelectProps={{
                    className: ' pr-1', // Country code selector styling
                  }}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
              <div className="flex  justify-between  my-5 ">
                <p>sent otp in 27 sec.</p>
                <div className="flex  flex-col items-end">
                  <p className="text-blue-500">
                    <a href="#">get otp via email</a>
                  </p>
                  <p>send otp on @gmail.com</p>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={`w-full p-3 rounded-[1rem] text-[0.75rem] font-[400] bg-black text-amber-50 `}
            >
              {loading ? 'Logging in...' : 'GET OTP'}
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
        </>
      )}
    </div>
  )
}

// Helper functions
const isValidPhoneNumber = (phone) => {
  // Add proper phone validation logic
  return phone?.length > 10
}

export default PhoneOTPInput
