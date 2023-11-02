import './App.css'
import React from 'react'
import DashboardAdmin from './pages/admin/Dashboard'
import DashboardUser from './pages/user/dashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AttendanceOverview from './pages/admin/AttendanceOverview'
import AttendanceHistory from './pages/user/attendance'
import Login from './auth/Login'
import { useAuthInfo } from './use context/useAuthInfo'
import DataUser from './pages/admin/Datauser'
import PrivateRoute from './privat-router/privatRoute'
function App() {
  const { userData } = useAuthInfo()
  const role = userData?.role
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute requiredRoles={["Public", "Admin"]} element={role === "Admin" ? <DashboardAdmin /> : <DashboardUser />} />} />
          {/* path admin */}
          <Route path="/attendance-overview" element={<PrivateRoute requiredRoles={["Admin"]} element={<AttendanceOverview />} />} />
          <Route path="/employee-data" element={<PrivateRoute requiredRoles={["Admin", "Public"]} element={<DataUser />} />} />
          {/* path user */}
          <Route path="/attendance-history" element={<PrivateRoute requiredRoles={"Public"} element={<AttendanceHistory />} />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
