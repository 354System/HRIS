import RealtimeInsightBox from "./Component dashboard/RealtimeBox";
import OnTimeBox from "./Component dashboard/OneTimeBox";
import AbsenBox from "./Component dashboard/AbsenBox";
import LeaveBox from "./Component dashboard/LeaveBox";
import LateBox from "./Component dashboard/LateBox";
import WorkingDayThismonthBox from "./Component dashboard/WorkingDayThismonthBox";
import PremisionBox from "./Component dashboard/PremisionBox";
import Histori from "./Component dashboard/history";
import { Navbar } from "../Navbar";
import { Sidebarmenu } from "../Sidebarmenu";


const DashboardUser = () => {
  return (
    <div className="w-full min-h-screen flex absolute bg-gray-200">
      <div className="p-8">
        <Sidebarmenu />
      </div>
      <div className="w-full p-8">
        <Navbar title="Dashboard"/>
        <div className="w-full mb-10">
          <div className="w-full  flex h-72 gap-6">
            <RealtimeInsightBox />
            <div className="w-full flex flex-col gap-8">
              <div className="flex h-1/2 gap-8">
                <OnTimeBox />
                <AbsenBox />
                <LeaveBox />
              </div>
              <div className="flex h-1/2 items-end gap-8">
                <LateBox />
                <WorkingDayThismonthBox />
                <PremisionBox />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="font-bold text-[#252C58] px-2">Attendance History</h1>
          <Histori />
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;