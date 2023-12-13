import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthInfo } from './use context/useAuthInfo'
import PrivateRoute from './privat-router/privatRoute'
import Login from './auth/Login'
import DashboardAdmin from './pages/admin/Dashboard'
import DashboardUser from './pages/user/dashboard'
import AttendanceOverview from './pages/admin/AttendanceOverview'
import AttendanceHistoryUser from './pages/user/AttendanceHistory'
import DataUser from './pages/admin/Datauser'
import LeavePermissionOverviewAdmin from './pages/admin/LeavePermission'
import LeavePermissionOverviewUser from './pages/user/LeavePermission'
import WikiDocumentAdmin from './pages/admin/WikidocumentAdmin'
import PathNotFound from './pages/path not found/PathNotFound'
import InquiryLetterUser from './pages/user/InquiryLetter'
import InquiryLetterAdmin from './pages/admin/InquiryLetter'
import Tes from './pages/test'
function App() {
  const { userData } = useAuthInfo()
  const role = userData?.role
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<PathNotFound />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          {/* path online */}
          <Route path="/dashboard" element={<PrivateRoute requiredRoles={["Public", "Admin"]} element={role === "Admin" ? <DashboardAdmin /> : <DashboardUser />} />} />
          <Route path="/attendance-overview" element={<PrivateRoute requiredRoles={["Public", "Admin"]} element={role === "Admin" ? <AttendanceOverview /> : <AttendanceHistoryUser />} />} />
          <Route path="/permission-and-leave" element={<PrivateRoute requiredRoles={["Public", "Admin"]} element={role === "Admin" ? <LeavePermissionOverviewAdmin /> : <LeavePermissionOverviewUser />} />} />
          <Route path="/employee-data" element={<PrivateRoute requiredRoles={["Admin"]} element={<DataUser />} />} />
          <Route path="/request" element={<PrivateRoute requiredRoles={["Public", "Admin"]} element={role === "Admin" ? <InquiryLetterAdmin /> : <InquiryLetterUser />} />} />
          <Route path="/wiki-document" element={<PrivateRoute requiredRoles={["Public", "Admin"]} element={role === "Admin" ? <WikiDocumentAdmin /> : <LeavePermissionOverviewUser />} />} />
          <Route path="/tes" element={<PrivateRoute requiredRoles={["Public", "Admin"]} element={role === "Admin" ? <Tes /> : <LeavePermissionOverviewUser />} />} />
          {/* path offline */}
          {/* <Route path="/dashboard" element={<DashboardUser />} />
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/attendance-overview" element={<AttendanceHistoryUser />} />
          <Route path="/permission-and-leave" element={<LeavePermissionOverviewUser />} />
          <Route path="/request" element={<InquiryLetterUser />} /> */}
          {/* <Route path="/wiki-document" element={<WikiDocumentAdmin />} /> */}
          {/* <Route path='/request' element={<InquiryLetterUser />} /> */}
        </Routes>
      </Router>
    </>
  )
}
export default App
