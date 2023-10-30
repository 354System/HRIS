import './App.css'
import React from 'react'
import DashboardAdmin from './pages/admin/Dashboard'
import DashboardUser from './pages/user/dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AttendanceOverview from './pages/admin/AttendanceOverview'
import AttendanceHistory from './pages/user/attendance'
import Login from './auth/Login'
// import { useUserInfo } from './use context/user-info'
import DataUser from './pages/admin/Datauser'
// import PrivateRoute from './privat-router/privatRoute'
function App() {
  // const { userInfo } = useUserInfo()
  // const role = userInfo.role
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardAdmin /> } />
          <Route path="/attendance-overview" element={<AttendanceOverview />}  />
          <Route path="/attendance/history" element={<AttendanceHistory />}  />
          <Route path="/data-user" element={<DataUser />}  />
        </Routes>
      </Router>
    </>
  )
}
export default App
