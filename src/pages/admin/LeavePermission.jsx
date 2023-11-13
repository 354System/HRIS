import { useFetchAllPaidLeave } from "../../api/fetchData/useFetchAllPaidLeave";
import { useFetchAllPermission } from "../../api/fetchData/useFetchAllPermission";
import LeavePermissionBody from "../../component/admin/leave permission overview/LeavePermissionBody";
import LeavePermissionInfo from "../../component/admin/leave permission overview/LeavePermissionInfo";
import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";

const LeavePermissionOverviewAdmin = () => {
    const { data: paidLeaveData, refetch: refetchDataPaidLeave } = useFetchAllPaidLeave();
    const { data: permissionData, refetch: refetchDataPermission } = useFetchAllPermission();
    return (
        <div className="absolute bg-gray-300 min-h-screen w-full">
            <Sidebarmenu />
            <Navbar />
            <div className="p-7 mt-28 pl-28 w-full ">
                <div className="mb-10">
                    <LeavePermissionInfo paidLeaveData={paidLeaveData} permissionData={permissionData} />
                </div>
                <div className="w-full">
                    <LeavePermissionBody paidLeaveData={paidLeaveData} permissionData={permissionData} refetchDataPaidLeave={refetchDataPaidLeave} refetchDataPermission={refetchDataPermission} />
                </div>
            </div>
        </div>
    );
};

export default LeavePermissionOverviewAdmin;