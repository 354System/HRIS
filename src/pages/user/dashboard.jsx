import { useState } from "react";
import { useLeaveCurrentUser } from "../../api/fetchDataCurrentUser/useFetchLeave";
import { usePresenceCurrentUser } from "../../api/fetchDataCurrentUser/useFetchPresence";
import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";
import HistoryDashboard from "../../component/user/dashboard/container/container history/history";
import DashboardInfoUser from "../../component/user/dashboard/container/container info/dashboardInfo";

const DashboardUser = () => {
  const { data: presence, refetch: refetchPresence } = usePresenceCurrentUser();
  const { data: paidLeave } = useLeaveCurrentUser();
  const [sideBarMenu, setSideBarMenu] = useState(false);
  return (
    <div className="absolute bg-gray-300 min-h-screen w-full">
      <Sidebarmenu sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu}/>
      <Navbar sideBarMenu={sideBarMenu}a setSideBarMenu={setSideBarMenu} />
      <div className="laptop:p-7 hp:p-3 laptop:mt-28 hp:mt-24 laptop:pl-28 w-full">
        <div className="laptop:h-72 hp:h-1/2">
          <DashboardInfoUser presence={presence} paidLeave={paidLeave} refetchPresence={refetchPresence} />
        </div>
        <div className="hp:overflow-x-auto">
          <HistoryDashboard presence={presence} />
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
