import { useLeaveCurrentUser } from "../../api/fetchDataCurrentUser/useFetchLeave";
import { usePresenceCurrentUser } from "../../api/fetchDataCurrentUser/useFetchPresence";
import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";
import HistoryDashboard from "../../component/user/dashboard/container/container history/history";
import DashboardInfoUser from "../../component/user/dashboard/container/container info/dashboardInfo";

const DashboardUser = () => {
  const { data: presence, refetch: refetchPresence } = usePresenceCurrentUser();
  const { data: paidLeave } = useLeaveCurrentUser();
  return (
    <div className="absolute bg-gray-300 min-h-screen w-full">
      <Sidebarmenu />
      <Navbar />
      <div className="p-7 mt-28 pl-28 w-full">
        <div className="h-72">
          <DashboardInfoUser presence={presence} paidLeave={paidLeave} refetchPresence={refetchPresence} />
        </div>
        <div>
          <HistoryDashboard presence={presence} />
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
