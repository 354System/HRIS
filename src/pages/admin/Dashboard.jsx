import { Navbar } from "../../component/bar/Navbar"
import { Sidebarmenu } from "../../component/bar/Sidebarmenu"
import DashboardInfoAdmin from "../../component/admin/dashboard/info/DashboardInfoAdmin"
import DashboardChartAdmin from "../../component/admin/dashboard/chart/DashboardChart"
import HistoryDashboardAdmin from "../../component/admin/dashboard/attendance history/HistoryDashboardUser"
import { useFetchAllPermission } from "../../api/fetchData/useFetchAllPermission"
import { useFetchAllPaidLeave } from "../../api/fetchData/useFetchAllPaidLeave"
import { useState } from "react"
import TotalAttendanceDashboard from "../../component/admin/dashboard/attendance total/AttendanceTotalDashboard"
import { useFetchAllPresence } from "../../api/fetchData/useFetchAllPresence"
function DashboardAdmin() {
  const [currentPage, setCurrentPage] = useState({
    page: null,
    all: 'all',
  })

  const { data: allPresence, refetch: refetchPresence } = useFetchAllPresence({ 
    currentPage, 
    searchKeyword: '', 
    startDate: '', 
    endDate: '' 
  });

  const { data: allPermission, refetch: refetchPermission } = useFetchAllPermission({ currentPage, searchKeyword: '', startDate: '', endDate: '' });
  const { data: allPaidLeave, refetch: refetchPaidLeave } = useFetchAllPaidLeave({currentPage, searchKeyword: '', startDate: '', endDate: '' });
  const [sideBarMenu, setSideBarMenu] = useState(false);

  return (
    <div className="absolute bg-gray-300 min-h-screen w-full">
      <Sidebarmenu sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
      <Navbar sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
      <div className="laptop:p-7 hp:p-3 laptop:mt-28 hp:mt-24 laptop:pl-28 w-full">
        <div className="laptop:h-72 hp:h-1/2">
          <DashboardInfoAdmin refetchPresence={refetchPresence} allPresence={allPresence?.absensi} />
        </div>
        <div className="flex w-full h-96 mt-10">
          <DashboardChartAdmin data={allPresence?.absensi} />
        </div>
        <div className="w-full laptop:mt-10 hp:mt-5">
          <HistoryDashboardAdmin data={allPresence?.absensi} />
        </div>
        <div className="w-full laptop:mt-10 hp:mt-5">
          <TotalAttendanceDashboard presenceData={allPresence?.absensi} permissionData={allPermission} paidLeaveData={allPaidLeave} refetchPermission={refetchPermission} refetchPaidLeave={refetchPaidLeave} />
        </div>
      </div>
    </div>
  )
}
export default DashboardAdmin;