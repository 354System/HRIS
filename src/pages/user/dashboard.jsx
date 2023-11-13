import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";
import HistoryDashboard from "../../component/user/dashboard/container/container history/history";
import DashboardInfoUser from "../../component/user/dashboard/container/container info/dashboardInfo";

const DashboardUser = () => {
  return (
    <div className="absolute bg-gray-300 min-h-screen w-full">
      <Sidebarmenu />
      <Navbar />
      <div className="p-7 mt-28 pl-28 w-full ">
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
