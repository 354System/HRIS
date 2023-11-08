import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AttendanceOverview from './pages/admin/AttendanceOverview'
import DashboardAdmin from './pages/admin/Dashboard'
import DashboardUser from './component/user/dashboard'
import Attendance from './component/user/User-histori'
import DataUser from './pages/admin/Datauser'
import LoginUser from './auth/Login-user'
import OverviewAdmin from './component/user/Overview'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/userhistori" element={<Attendance/>} />
        <Route path="/dashboard" element={<DashboardUser />} />
        <Route path="/attendance-overview" element={<AttendanceOverview />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/admin/user" element={<DataUser />} />
        <Route path="/overview" element={<OverviewAdmin />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
