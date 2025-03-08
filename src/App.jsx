import { useState } from 'react'

import Login from './pages/Login'
function App() {
  const [count, setCount] = useState(0)
  console.log(import.meta.env.VITE_APP_DEBUG, true)
  return (
    <>
      <Login />
    </>
  )
}

export default App
