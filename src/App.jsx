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
import WikiDokumen from './component/user/Component wikidokumen/wikidokumen'
import Viewdokumen from './component/user/Component wikidokumen/viewdokumen '
import Repair from './component/user/Component device repair/Repair'
import SubmissionOfImprovements from './component/admin/create form/pengajuan perbaikan'
import TableItem from './component/user/Component device repair/component/table/tableRepair'
import InputFile from './component/admin/input file/input file'

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
        <Route path="/Document" element={<WikiDokumen />} />
        <Route path="/Repair/Device" element={<Repair />} />
        <Route path="/dc" element={<Viewdokumen />} />
        <Route path="/approve-repair" element={<SubmissionOfImprovements/>} />
        <Route path="/tableitem" element={<TableItem/>} />
        <Route path="/addfile" element={<InputFile/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
