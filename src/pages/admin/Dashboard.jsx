import { Navbar } from "../../component/Navbar"
import { Sidebarmenu } from "../../component/Sidebarmenu"
import { LateArrivalBox } from "../../component/admin/dashboard/container info/LateArrivalBox"
import { OnTimeBox } from "../../component/admin/dashboard/container info/OnTimeBox"
import { RealtimeInsightBox } from "../../component/admin/dashboard/container info/RealtimeBox"
import { TotalEmployedBox } from "../../component/admin/dashboard/container info/TotalEmployeBox"
import { EarlyDepartureBox } from "../../component/admin/dashboard/container info/EarlyDepartureBox"
import { AbsentBox } from "../../component/admin/dashboard/container info/AbsentBox"
import { TimeOffBox } from "../../component/admin/dashboard/container info/TimeOffBox"
import GrafikAbsensi from "../../component/admin/dashboard/container chart/ChartAbsensi"

export function Dashboard() {

    return (
        <div className="min-h-screen flex bg-darkwhite">
  <div className="p-6 fixed h-screen top-0 left-0">
    <Sidebarmenu />
  </div>
  <div className="w-full p-6 pl-24"> {/* Tambahkan class 'pl-24' untuk memberikan margin kiri sesuai lebar sidebar */}
    <div className="fixed top-6 left-28 w-[90%]">
      <Navbar />
    </div>
    <div className="w-full mb-10 mt-32 ml-5">
      {/* container info */}
      <div className="w-full flex h-72 gap-10">
        <div>
          <RealtimeInsightBox />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap h-1/2 gap-10">
            <TotalEmployedBox />
            <OnTimeBox />
            <AbsentBox />
          </div>
          <div className="flex flex-wrap h-1/2 items-end gap-10">
            <LateArrivalBox />
            <EarlyDepartureBox />
            <TimeOffBox />
          </div>
        </div>
      </div>
    </div>
    <div>
      <GrafikAbsensi />
    </div>
  </div>
</div>


    )
}