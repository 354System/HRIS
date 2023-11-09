import { Navbar } from "../../component/bar/Navbar"
import { Sidebarmenu } from "../../component/bar/Sidebarmenu"
import DashboardInfoAdmin from "../../component/admin/dashboard/info/DashboardInfoAdmin"
import DashboardChartAdmin from "../../component/admin/dashboard/chart/DashboardChart"
import HistoryDashboardAdmin from "../../component/admin/dashboard/attendance history/HistoryDashboardUser"

function DashboardAdmin() {
  return (
    <div className="min-h-screen flex bg-gray-200">
      <Sidebarmenu />
      <Navbar />
      <div className="relative w-full flex flex-col mt-28 p-6 ml-24"> {/* Tambahkan class 'pl-24' untuk memberikan margin kiri sesuai lebar sidebar */}
        <div className="w-full mb-10">
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