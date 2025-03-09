import { useState } from 'react'

import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import TripDetailFomPage from './pages/TripDetailFomPage'
function App() {
  const [count, setCount] = useState(0)
  console.log(import.meta.env.VITE_APP_DEBUG, true)
  return (
    <>
      {/* <Login /> */}
      {/* <SignUp /> */}
      <TripDetailFomPage />
    </>
  )
}

export default App
