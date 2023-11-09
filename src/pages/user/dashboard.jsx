import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";
import HistoryDashboard from "../../component/user/dashboard/container/container history/history";
import DashboardInfoUser from "../../component/user/dashboard/container/container info/dashboardInfo";

const DashboardUser = () => {
  return (
    <div className="w-full min-h-full flex bg-gray-200">
      <Sidebarmenu />
      <Navbar />
      <div className="w-full mb-10 mt-28 p-4 pl-28">
        <div className="h-72">
          <DashboardInfoUser />
        </div>
        <div className="">
          <HistoryDashboard />
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
