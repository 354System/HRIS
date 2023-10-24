import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import AttendanceOverview from './pages/admin/AttendanceOverview'
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance-overview" element={<AttendanceOverview />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
