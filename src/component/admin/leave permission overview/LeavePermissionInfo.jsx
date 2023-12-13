import ApprovePaidLeaveAdmin from "./component/info/Approve"
import ApprovePermission from "./component/info/Approve-permission"
import PaidLeave from "./component/info/Paid Leave"
import PendingPaidLeaveAdmin from "./component/info/Pending"
import PendingPermission from "./component/info/Pending-permission"
import Permission from "./component/info/Permission"
import RejectPaidLeaveAdmin from "./component/info/Reject"
import RejectPermission from "./component/info/Reject permission"

const LeavePermissionInfo = ({ permissionData, paidLeaveData }) => {
    return (
        <div className="w-full h-full">
            {/* laptop */}
            <div className="w-full h-full flex flex-col gap-8 hp:hidden">
                <div className="flex h-1/2 gap-8">
                    <PaidLeave paidLeaveData={paidLeaveData} />
                    <ApprovePaidLeaveAdmin paidLeaveData={paidLeaveData} />
                    <PendingPaidLeaveAdmin paidLeaveData={paidLeaveData} />
                    <RejectPaidLeaveAdmin paidLeaveData={paidLeaveData} />
                </div>
                <div className="flex h-1/2 gap-8">
                    <Permission permissionData={permissionData} />
                    <ApprovePermission />
                    <PendingPermission />
                    <RejectPermission />
                </div>
            </div>
            {/* hp */}
            <div className="w-full h-full flex flex-col gap-4 laptop:hidden">
                <div className="flex h-1/4 ">
                    <PaidLeave paidLeaveData={paidLeaveData} />
                </div>
                <div className="flex h-1/4">
                    <Permission permissionData={permissionData} />
                </div>
                <div className="flex h-1/6 gap-3">
                    <ApprovePaidLeaveAdmin paidLeaveData={paidLeaveData} />
                    <ApprovePermission permissionData={permissionData} />
                </div>
                <div className="flex h-1/6 gap-3">
                    <PendingPaidLeaveAdmin paidLeaveData={paidLeaveData} />
                    <PendingPermission permissionData={permissionData} />
                </div>
                <div className="flex h-1/6 gap-3">
                    <RejectPaidLeaveAdmin paidLeaveData={paidLeaveData} />
                    <RejectPermission permissionData={permissionData} />
                </div>
            </div>
        </div>
    )
}
export default LeavePermissionInfo;