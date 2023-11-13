import { Navbar } from "../../component/bar/Navbar"
import { Sidebarmenu } from "../../component/bar/Sidebarmenu"
import DashboardInfoAdmin from "../../component/admin/dashboard/info/DashboardInfoAdmin"
import DashboardChartAdmin from "../../component/admin/dashboard/chart/DashboardChart"
import HistoryDashboardAdmin from "../../component/admin/dashboard/attendance history/HistoryDashboardUser"

function DashboardAdmin() {
  return (
    <div className="absolute bg-gray-300 min-h-screen w-full">
      <Sidebarmenu />
      <Navbar />
      <div className="p-7 mt-28 pl-28 w-full ">
        <div className="w-full h-72 mb-10">
          <DashboardInfoAdmin />
        </div>
        <div className="flex w-full h-80 mb-10">
          <DashboardChartAdmin />
        </div>
        <div className="w-full ">
          <HistoryDashboardAdmin />
        </div>
      </div>
    </div>
  )
}
export default DashboardAdmin;