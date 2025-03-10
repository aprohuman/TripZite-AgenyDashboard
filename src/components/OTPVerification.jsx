import React, { useState, useRef, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const OTPVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const [resendTimer, setResendTimer] = useState(30)
  const inputRefs = useRef([])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleChange = (e, index) => {
    const value = e.target.value
    if (isNaN(value)) return

    let newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleResendOTP = () => {
    if (resendTimer === 0) {
      setResendTimer(30)
      toast.success('OTP resent successfully!')
    }
  }

  const handleSubmit = () => {
    const otpString = otp.join('')
    if (otpString.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP')
      return
    }
    toast.success('OTP Verified Successfully!')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mt-4">Verify OTP</h2>
      <div className="flex gap-3 mt-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
        ))}
      </div>
      <div className="text-center mt-3">
        {resendTimer > 0 ? (
          <p className="text-gray-500 text-sm">Resend OTP in {resendTimer} secs</p>
        ) : (
          <div className="flex  justify-between  my-5 ">
            <p className='text-xs font-light'>Resend OTP in 30 secs</p>
            <div className="flex  flex-col items-end">
              <p className="text-blue-500  text-xs font-light" onClick={handleResendOTP}>
                <a href="#">Get OTP via email ?</a>
              </p>
              <p className='text-xs font-light'>Send otp on {'xyz@gmail.com'}</p>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 mt-4 rounded-lg hover:bg-gray-800"
      >
        Send Request
      </button>
    </div>
  )
}

export default OTPVerification;
