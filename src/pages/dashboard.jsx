import DashboardAdmin from "./admin/Dashboard";
import DashboardUser from "./user/dashboard";
import { useAuthInfo } from "../use context/useAuthInfo";

const Dashboard = () => {
    const { userInfo } = useAuthInfo();
    const role = userInfo.role;
    return(
        <>
            {role === "Admin" ? <DashboardAdmin /> : <DashboardUser />}
        </>
    )
}
export default Dashboard;