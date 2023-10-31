import DashboardAdmin from "./admin/Dashboard";
import DashboardUser from "./user/dashboard";
import { useUserInfo } from "../use context/user-info";

const Dashboard = () => {
    const { userInfo } = useUserInfo();
    const role = userInfo.role;
    return(
        <>
            {role === "Admin" ? <DashboardAdmin /> : <DashboardUser />}
        </>
    )
}
export default Dashboard;