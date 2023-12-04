import { Sidebarmenu } from "../../component/Sidebarmenu"
import { LateArrivalBox } from "../../component/admin/dashboard/container info/LateArrivalBox"
import { OnTimeBox } from "../../component/admin/dashboard/container info/OnTimeBox"
import { RealtimeInsightBox } from "../../component/admin/dashboard/container info/RealtimeBox"
import { TotalEmployedBox } from "../../component/admin/dashboard/container info/TotalEmployeBox"
import { EarlyDepartureBox } from "../../component/admin/dashboard/container info/EarlyDepartureBox"
import { AbsentBox } from "../../component/admin/dashboard/container info/AbsentBox"
import { TimeOffBox } from "../../component/admin/dashboard/container info/TimeOffBox"
import ChartAbsensi from "../../component/admin/dashboard/container chart/ChartAbsensi"
import ChartDivisiWeekly from "../../component/admin/dashboard/container chart/ChartDivisiWeekly"
import AODashboard from "../../component/admin/dashboard/container attendance overview/AODashboard"
import NavbarUser from "../../component/user/Component dashboard/Navbar"

function DashboardAdmin() {
  return (
    <div className="min-h-screen flex bg-gray-200">
      <div className="laptop:flex hp:hidden">
        <Sidebarmenu />
      </div>
      <NavbarUser title="Dashboard" />
      <div className="relative w-full flex flex-col p-4 laptop:ml-20 laptop:mr-16">
        <div className="w-full mb-10 mt-32 ml-4 laptop:flex hp:hidden">
          <div className="w-full flex h-72 gap-10">
            <div>
              <RealtimeInsightBox />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex h-1/2 gap-8 w-full">
                <TotalEmployedBox />
                <OnTimeBox />
                <AbsentBox />
              </div>
              <div className="flex h-1/2 items-end gap-8">
                <LateArrivalBox />
                <EarlyDepartureBox />
                <TimeOffBox />
              </div>
            </div>
          </div>
        </div>
        {/* hp */}
        <div className="laptop:hidden flex flex-col mt-24 gap-2 hp: hp:flex">
          <div className="flex h-72 gap-2">
            <RealtimeInsightBox />
          </div>
        </div>
        {/* container chart */}
        <div className="flex items-end laptop:w-full  laptop:flex hp:hidden">
          <div className="w-3/4 ml-4">
            <ChartAbsensi />
          </div>
          <div className=" w-1/2 h- flex p-5">
            <ChartDivisiWeekly />
          </div>
        </div>
        {/* container attendance overview */}
        <div className=" mt-4">
          <AODashboard />
        </div>
      </div>

    </div>
  )
}
export default DashboardAdmin