import { Navbar } from "../../component/navbar";
import { Sidebarmenu } from "../../component/Sidebarmenu";
import RealtimeInsightBox from "../../component/user/Component dashboard/RealtimeBox";
import OnTimeBox from "../../component/user/Component dashboard/OneTimeBox";
import LeaveBox from "../../component/user/Component dashboard/LeaveBox";
import LateBox from "../../component/user/Component dashboard/LateBox";
import WorkingDayThismonthBox from "../../component/user/Component dashboard/WorkingDayThismonthBox";
import PremisionBox from "../../component/user/Component dashboard/PremisionBox";
import Histori from "../../component/user/Component dashboard/history";
import AbsenBox from "../../component/user/Component dashboard/AbsenBox";

const DashboardUser = () => {
  return (
    <div className="w-full min-h-full flex bg-gray-200">
      <div className="p-8">
        <Sidebarmenu />
      </div>
      <div className="w-full p-8">
        <Navbar title="Dashboard"/>
        <div className="w-full mb-10 mt-24 ml-8">
          <div className="w-full flex h-72 gap-6">
            <RealtimeInsightBox />
            <div className="flex flex-col gap-6">
              <div className="flex h-1/2 gap-6">
                <OnTimeBox />
                <AbsenBox />
                <LeaveBox />
              </div>
              <div className="flex h-1/2 items-end gap-6">
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
