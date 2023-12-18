import { useState } from "react";
import { useFetchAllPaidLeave } from "../../api/fetchData/useFetchAllPaidLeave";
import { useFetchAllPermission } from "../../api/fetchData/useFetchAllPermission";
import LeavePermissionBody from "../../component/admin/leave permission overview/LeavePermissionBody";
import LeavePermissionInfo from "../../component/admin/leave permission overview/LeavePermissionInfo";
import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";

const LeavePermissionOverviewAdmin = () => {
    const [currentPage, setCurrentPage] = useState({
        paidLeave: {
            page: 1,
            all: null,
            pageSearch: null,
            pageFilter: null
        },
        permission: {
            page: 1,
            all: null,
            pageSearch: null,
            pageFilter: null
        }
    })
    const [searchKeyword, setSearchKeyword] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [sideBarMenu, setSideBarMenu] = useState(false);

    const { data: paidLeaveData, refetch: refetchDataPaidLeave, isLoading: isLoadingPaidLeave } = useFetchAllPaidLeave({ currentPage: currentPage.paidLeave, searchKeyword, startDate, endDate });
    const { data: permissionData, refetch: refetchDataPermission } = useFetchAllPermission({ currentPage: currentPage.permission, searchKeyword, startDate, endDate });

    const totalPages = {
        paidLeave: paidLeaveData?.totalPages,
        permission: permissionData?.totalPages
    }
    console.log(permissionData);

    return (
        <div className="absolute bg-gray-300 min-h-screen w-full">
            <Sidebarmenu sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <Navbar sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <div className="laptop:p-7 hp:p-3 mt-28 laptop:pl-28 w-full ">
                <div className="mb-10">
                    <LeavePermissionInfo paidLeaveData={paidLeaveData?.cuti} permissionData={permissionData?.izin} />
                </div>
                <div className="w-full">
                    <LeavePermissionBody currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} paidLeaveData={paidLeaveData?.cuti} permissionData={permissionData?.izin} refetchDataPaidLeave={refetchDataPaidLeave} refetchDataPermission={refetchDataPermission} isLoadingPaidLeave={isLoadingPaidLeave} />
                </div>
            </div>
        </div>
    );
};

export default LeavePermissionOverviewAdmin;