import React, { useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link  } from 'react-router-dom'
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

import backgroundImg from '../../public/images/Background.png'
import logo from '../assets/images/Icon.png'
import loginImg from '../assets/images/BWLogo.svg'

import { validateEmail } from '../utils/validators.js'
import { setToken } from '../utils/auth'
import { logInAPI, changePasswordAPI } from '../services/apiService.js'

import { login } from '../redux/index.js';

function LogIn() {

  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
  const [isFirstLogIn, setIsLogIn] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({email: '',password: ''});
  const [passwordData, setPasswordData] = useState({newPassword: '',confirmPassword: ''});

  const [errors, setErrors] = useState({ email: '', password: '' });
  const [passwordErrors, setPasswordErrors] = useState({newPassword: '', confirmPassword: ''});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const debounceTimeout = useRef(null);

  const authDetails = useSelector((state) => state.auth);



  const validateForm = {
    email: (value) => {
      if (!value) return 'Email is required'
      if (!validateEmail(value)) return 'Invalid email format'
      return ''
    },
    password: (value) => {
      if (!value) return 'Password is required'
      if (value.length < 8) return 'Password must be at least 8 characters'
      return ''
    },
  }

  const validatePasswordForm = {
    newPassword: (value) => {
      if (!value) return 'New Password is required'
      if (value.length < 8) return 'Password must be at least 8 characters'
      return ''
    },
    confirmPassword: (value) => {
      if (!value) return 'Confirm the password'
      if (value != passwordData?.newPassword)
        return 'Password must be same as new password'
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

  const validatePasswordField = useCallback(
    (name, value) => {
      console.log(validatePasswordForm)
      if (
        validatePasswordForm.hasOwnProperty(name) &&
        typeof validatePasswordForm[name] === 'function'
      ) {
        setPasswordErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validatePasswordForm[name](value),
        }))
      } else {
        console.error(`Validation function not found for field: ${name}`)
      }
    },
    [validatePasswordForm],
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))

    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      validateField(name, value)
    }, 300)
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prevData) => ({ ...prevData, [name]: value }))

    clearTimeout(debounceTimeout.current)
    debounceTimeout.current = setTimeout(() => {
      validatePasswordField(name, value)
    }, 300)
  }

  const isFormValid = () => {
    let isValid = true
    Object.keys(formData).forEach((fieldName) => {
      if (validateForm[fieldName](formData[fieldName])) {
        isValid = false
      }
    });

    return isValid;
  }

  const isPasswordFormValid = () => {
    let isValid = true
    Object.keys(passwordData).forEach((fieldName) => {
      if (validatePasswordForm[fieldName](passwordData[fieldName])) {
        isValid = false
      }
    })

    return isValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = Object.keys(formData).reduce((acc, fieldName) => {
      const error = validateForm[fieldName](formData[fieldName])
      if (error) acc[fieldName] = error
      return acc;
    }, {})

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0){
      return
    } 

    try {
      setLoading(true);
      const response = await logInAPI({
        email: formData.email,
        password: formData.password,
      })

      const data = response.data.data;

      console.log(response, 'here')

      dispatch(login({
        email: data.email,
        agencyId:data.agencyId,
        isFirstLogin: Boolean(data?.firstLogin),
        isAuthenticated: Boolean(true),
        accessToken:response.data?.accessToken,
        refreshToken:response.data?.accessToken,
      }))

      setLoading(false);

        if (data?.firstLogin) {
          setCurrentStep(2);
        } else {
          setToken(response.data.accessToken, keepMeLoggedIn, 'access-token')
          setToken(response.data.refreshToken, keepMeLoggedIn, 'refresh-token')
          navigate('/dashboard')
        }

    } catch (error) {
      setLoading(false);
      console.error('Login error:', error)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    let formIsValid = true
    const newErrors = {}

    Object.keys(passwordData).forEach((fieldName) => {
      const error = validatePasswordForm[fieldName](passwordData[fieldName])
      newErrors[fieldName] = error
      if (error) formIsValid = false
    })

    setPasswordErrors(newErrors)

    if (!formIsValid){
      return;
    } 

    try {
      setLoading(true);
      const response = await changePasswordAPI({
        email: formData.email,
        oldPassword: formData.password,
        newPassword: passwordData.confirmPassword
      })

      const data = response.data.data;

      dispatch(login({
        email: data.email,
        agencyId:data.agencyId,
        isFirstLogin: Boolean(data?.firstLogin),
        isAuthenticated: Boolean(true),
        accessToken:response.data?.accessToken,
        refreshToken:response.data?.accessToken,
      }));

      setToken(response.data.accessToken, keepMeLoggedIn, 'access-token')
      setToken(response.data.refreshToken, keepMeLoggedIn, 'refresh-token')
      navigate('/dashboard')
      
    } catch (error) {
        setLoading(false);
        console.error('Login error:', error)
    }
  }

  return (
    <>
      <div
        className="flex min-h-screen items-center justify-end relative md:p-[6rem] z-20 bg-black"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: '50% -50%',
        }}
      >
        <div className="bg-white p-8 rounded-[30px] shadow-lg max-w-[45.625rem] min-h-[27.5rem] w-full flex flex-col md:flex-row items-center absolute ">
          <div className="flex flex-col items-center  md:w-1/2 ">
            <a href="#" className="w-[182px] h-[87px]">
              <img src={logo} alt="" className="h-full w-full" />
            </a>
            <p className="text-[20px]  font-[400] mt-2">Agent Log In</p>
            <img
              src={loginImg}
              alt="Tripzite Logo"
              className="w-40 h-52 mt-4 rounded-lg shadow-md "
            />
          </div>
          {currentStep === 1 ? (
            <div className="md:w-1/1.5 w-full pl-6">
              <h2 className="text-[2rem] font-[400] text-gray-800 mb-6 ">
                Login
              </h2>
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-[2rem]">
                <label htmlFor="email" className='inline-block mb-4 text-[14px]'>
                    Enter Your Email
                </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="*Enter your Email"
                    autoComplete="email"
                    className={`w-full p-2 border rounded-[1.2rem]  text-[0.75rem] font-[400] focus:border-green-500 outline-none  mb-3`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="mb-[2rem]">
                <label htmlFor="password" className='inline-block mb-4 text-[14px]'>
                    Enter Your Password
                </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="*Password"
                    autoComplete="new-password"
                    className={`w-full p-2 border rounded-[1.2rem]  text-[0.75rem] font-[400] focus:border-green-500 outline-none  mb-3`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className={`w-full p-2 rounded-[1.2rem]  text-[0.75rem] font-[400] transition ${
                    loading || !isFormValid()
                      ? 'bg-black text-white cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                  disabled={loading || !isFormValid()}
                >
                  {loading ? 'Logging in...' : 'LOG IN'}
                </button>
                <div className="flex justify-between items-center mt-4 text-sm">
                  <label className="flex items-center text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 cursor-pointer"
                      onChange={(e) => setKeepMeLoggedIn(e.target.checked)}
                    />{' '}
                    Keep me logged in
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-red-500 hover:underline"
                  >
                    Forgot your Password?
                  </Link>
                </div>
                <div className='flex justify-end items-center mt-3'>
                  <label className='text-[14px]'>Don't have an account? </label>
                  <Link
                    to="/signup"
                    className="text-blue-500 hover:underline text-[14px] ml-1"
                  >Sign Up</Link>
                </div>
              </form>
            </div>
          ) : currentStep === 2 ? (
            <div className="md:w-1/1.5 w-full pl-6">
              <h2 className="text-[2rem] font-[400] text-gray-800 mb-6 ">
                Set new password
              </h2>
              <form onSubmit={handlePasswordSubmit} autoComplete="off">
                <div className="mb-[2rem]">
                <label htmlFor="confirmPassword" className='inline-block mb-4 text-[14px]'>
                    Enter New Password
                </label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="*Enter New Password"
                    className={`w-full p-2 border rounded-[1.2rem]  text-[0.75rem] font-[400] focus:border-green-500 outline-none  mb-3`}
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                  {passwordErrors.newPassword && (
                    <p className="text-red-500 text-sm">
                      {passwordErrors.newPassword}
                    </p>
                  )}
                </div>
                <div className="mb-[2rem]">
                  <label htmlFor="confirmPassword" className='inline-block mb-4 text-[14px]'>
                    Re-Enter New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="*Confirm New Password"
                    className={`w-full p-2 border rounded-[1.2rem]  text-[0.75rem] font-[400] focus:border-green-500 outline-none  mb-3`}
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {passwordErrors.confirmPassword}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className={`w-full p-2 rounded-[1.2rem]  text-[0.75rem] font-[400] transition ${
                    loading || !isPasswordFormValid()
                      ? 'bg-black text-white cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                  disabled={loading || !isPasswordFormValid()}
                >
                  {loading ? 'Logging in...' : 'SET PASSWORD'}
                </button>
                <div className="flex justify-between items-center mt-4 text-sm">
                  <label className="flex items-center text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2 cursor-pointer"
                      onChange={(e) => setKeepMeLoggedIn(e.target.checked)}
                    />{' '}
                    Keep me logged in
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-red-500 hover:underline"
                  >
                    Forgot your Password?
                  </Link>
                </div>
              </form>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}
export default LogIn;
