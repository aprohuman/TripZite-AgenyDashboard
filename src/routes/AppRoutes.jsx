import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import LogIn from '../pages/Login'
import SignUp from '../pages/SignUp'
import ForgotPassword from '../pages/ForgotPassword'
import Dashboard from '../pages/Dashboard'
import AddPackage from '../pages/AddPackage'
import YourPackages from '../pages/YourPackages'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-package" element={<AddPackage />} />
          <Route path="/your-packages" element={<YourPackages />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
