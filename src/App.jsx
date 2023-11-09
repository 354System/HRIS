import './App.css'
import React from 'react'
import DashboardAdmin from './pages/admin/Dashboard'
import DashboardUser from './pages/user/dashboard'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AttendanceOverview from './pages/admin/AttendanceOverview'
import Login from './auth/Login'
import DataUser from './pages/admin/Datauser'
import PrivateRoute from './privat-router/privatRoute'
import AttendanceHistoryUser from './pages/user/AttendanceHistory'
import { useAuthInfo } from './use context/useAuthInfo'
import LeavePermissionOverviewAdmin from './pages/admin/LeavePermission'
function App() {
  const { userData } = useAuthInfo()
  const role = userData?.role
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute requiredRoles={["Public", "Admin"]} element={role === "Admin" ? <DashboardAdmin /> : <DashboardUser />} />} />
          {/* path admin */}
          <Route path="/attendance-overview" element={<PrivateRoute requiredRoles={["Admin"]} element={<AttendanceOverview />} />} />
          <Route path="/employee-data" element={<PrivateRoute requiredRoles={["Admin"]} element={<DataUser />} />} />
          <Route path="/permission-and-leave" element={<PrivateRoute requiredRoles={["Admin"]} element={<LeavePermissionOverviewAdmin />} />} />
          {/* path user */}
          <Route path="/attendance-history" element={<PrivateRoute requiredRoles={"Public"} element={<AttendanceHistoryUser />} />} />
        </Routes>
      </Router>
    </>
  )
}
export default App
