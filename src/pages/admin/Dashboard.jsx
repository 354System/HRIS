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
      <div className="p-7 mt-28 pl-28 w-full ">
        <div className="w-full h-72 mb-10">
          <DashboardInfoAdmin />
        </div>
        <div className="flex w-full h-80 mb-10">
          <DashboardChartAdmin data={allPresence}/>
        </div>
        <div className="w-full mb-10">
          <HistoryDashboardAdmin data={allPresence} />
        </div>
        <div className="w-full mb-10">
          <TotalAttendanceDashboard presenceData={allPresence} permissionData={allPermission} paidLeaveData={allPaidLeave} refetchPermission={refetchPermission} refetchPaidLeave={refetchPaidLeave}/>
        </div>
      </div>
    </div>
  )
}
export default DashboardAdmin;