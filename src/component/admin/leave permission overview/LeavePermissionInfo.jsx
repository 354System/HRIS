import { useState } from "react"
import { useFetchAllPaidLeave } from "../../../api/fetchData/useFetchAllPaidLeave"
import { useFetchAllPermission } from "../../../api/fetchData/useFetchAllPermission"
import ApprovePaidLeaveAdmin from "./component/info/Approve"
import ApprovePermission from "./component/info/Approve-permission"
import PaidLeave from "./component/info/Paid Leave"
import PendingPaidLeaveAdmin from "./component/info/Pending"
import PendingPermission from "./component/info/Pending-permission"
import Permission from "./component/info/Permission"
import RejectPaidLeaveAdmin from "./component/info/Reject"
import RejectPermission from "./component/info/Reject permission"

const LeavePermissionInfo = () => {
    const [currentPage, setCurrentPage] = useState({
        paidLeave: {
            page: null,
            all: 'all',
            pageSearch: null,
            pageFilter: null
        },
        permission: {
            page: null,
            all: 'all',
            pageSearch: null,
            pageFilter: null
        }
    })
    const [searchKeyword, setSearchKeyword] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { data: paidLeaveData, refetch: refetchDataPaidLeave } = useFetchAllPaidLeave({ currentPage: currentPage.paidLeave, searchKeyword, startDate, endDate });
    const { data: permissionData, refetch: refetchDataPermission } = useFetchAllPermission({ currentPage: currentPage.permission, searchKeyword, startDate, endDate });

    return (
        <div className="w-full h-full">
            {/* laptop */}
            <div className="w-full h-full flex flex-col gap-8 hp:hidden">
                <div className="flex h-1/2 gap-8">
                    <PaidLeave paidLeaveData={paidLeaveData} />
                    <ApprovePaidLeaveAdmin paidLeaveData={paidLeaveData?.cuti} />
                    <PendingPaidLeaveAdmin paidLeaveData={paidLeaveData?.cuti} />
                    <RejectPaidLeaveAdmin paidLeaveData={paidLeaveData?.cuti} />
                </div>
                <div className="flex h-1/2 gap-8">
                    <Permission permissionData={permissionData?.izin} />
                    <ApprovePermission />
                    <PendingPermission />
                    <RejectPermission />
                </div>
            </div>
            {/* hp */}
            <div className="w-full h-full flex flex-col gap-4 laptop:hidden">
                <div className="flex h-1/4 ">
                    <PaidLeave paidLeaveData={paidLeaveData?.cuti} />
                </div>
                <div className="flex h-1/4">
                    <Permission permissionData={permissionData?.izin} />
                </div>
                <div className="flex h-1/6 gap-3">
                    <ApprovePaidLeaveAdmin paidLeaveData={paidLeaveData?.cuti} />
                    <ApprovePermission permissionData={permissionData?.izin} />
                </div>
                <div className="flex h-1/6 gap-3">
                    <PendingPaidLeaveAdmin paidLeaveData={paidLeaveData?.cuti} />
                    <PendingPermission permissionData={permissionData?.izin} />
                </div>
                <div className="flex h-1/6 gap-3">
                    <RejectPaidLeaveAdmin paidLeaveData={paidLeaveData?.cuti} />
                    <RejectPermission permissionData={permissionData?.izin} />
                </div>
            </div>
        </div>
    )
}
export default LeavePermissionInfo;