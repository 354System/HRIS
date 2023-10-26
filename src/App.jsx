import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AttendanceOverview from './pages/admin/AttendanceOverview'
import DashboardAdmin from './pages/admin/Dashboard'
import DashboardUser from './component/user/dashboard'
import Attendance from './component/user/User-histori'
import SignIn from './auth/Login'
import User from './component/user/component User/user'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/userhistori" element={<Attendance/>} />
        <Route path="/user/dashboard" element={<DashboardUser />} />
        <Route path="/attendance-overview" element={<AttendanceOverview />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/admin/user" element={<User />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
