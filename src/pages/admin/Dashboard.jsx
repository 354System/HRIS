import { Navbar } from "../../component/bar/Navbar"
import { Sidebarmenu } from "../../component/bar/Sidebarmenu"
import DashboardInfoAdmin from "../../component/admin/dashboard/info/DashboardInfoAdmin"
import DashboardChartAdmin from "../../component/admin/dashboard/chart/DashboardChart"
import HistoryDashboardAdmin from "../../component/admin/dashboard/attendance history/HistoryDashboardUser"
import { useFetchAllPresence } from "../../api/fetchData/useFetchAllPresence"
import TotalAttendanceDashboard from "../../component/admin/dashboard/attendance total/attendanceTotalDashboard"
import { useFetchAllPermission } from "../../api/fetchData/useFetchAllPermission"
import { useFetchAllPaidLeave } from "../../api/fetchData/useFetchAllPaidLeave"
function DashboardAdmin() {
  const { data: allPresence } = useFetchAllPresence();
  const { data: allPermission, refetch: refetchPermission } = useFetchAllPermission();
  const { data: allPaidLeave, refetch: refetchPaidLeave } = useFetchAllPaidLeave();
  return (
    <div className="absolute bg-gray-300 min-h-screen w-full">
      <Sidebarmenu />
      <Navbar />
      <div className="laptop:p-7 hp:p-3 laptop:mt-28 hp:mt-24 laptop:pl-28 w-full">
        <div className="laptop:h-72 hp:h-1/2">
          <DashboardInfoAdmin />
        </div>
        <div className="hp:hidden flex w-full h-80 mt-10">
          <DashboardChartAdmin data={allPresence} />
        </div>
        <div className="w-full laptop:mt-10 hp:mt-5">
          <HistoryDashboardAdmin data={allPresence} />
        </div>
        <div className="w-full laptop:mt-10 hp:mt-5">
          <TotalAttendanceDashboard presenceData={allPresence} permissionData={allPermission} paidLeaveData={allPaidLeave} refetchPermission={refetchPermission} refetchPaidLeave={refetchPaidLeave} />
        </div>
      </div>
    </div>
  )
}
export default DashboardAdmin;