import { Navbar } from "../../component/navbar"
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

function Dashboard() {
  return (
    <div className="min-h-screen flex bg-darkwhite">
      <div className="">
        <Sidebarmenu />
      </div>
      <div className="">
        <Navbar />
      </div>
      <div className="relative w-full flex flex-col p-6 ml-20"> {/* Tambahkan class 'pl-24' untuk memberikan margin kiri sesuai lebar sidebar */}
        <div className="w-full mb-10 mt-32 ml-5">
          {/* container info */}
          <div className="w-full flex h-72 gap-10">
            <div>
              <RealtimeInsightBox />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex h-1/2 gap-10">
                <TotalEmployedBox />
                <OnTimeBox />
                <AbsentBox />
              </div>
              <div className="flex h-1/2 items-end gap-10">
                <LateArrivalBox />
                <EarlyDepartureBox />
                <TimeOffBox />
              </div>
            </div>
          </div>
        </div>
        {/* container chart */}
        <div className="flex items-end w-full h-full">
          <div className="w-3/4 p-5">
            <ChartAbsensi />
          </div>
          <div className=" w-1/2 h-full flex p-5">
            <ChartDivisiWeekly />
          </div>
        </div>
        {/* container attendance overview */}
        <div className="w-full p-5">
          <AODashboard />
        </div>
      </div>
    </div>
  )
}
export default Dashboard