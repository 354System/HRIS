import { useState } from "react";
import TablePaidLeaveAdmin from "./table/paidLeave";
import TablePermissionAdmin from "./table/permission";

const LeavePermissionBody = ({ permissionData, paidLeaveData, refetchDataPermission, refetchDataPaidLeave }) => {
    const [permission, setPermission] = useState(true);
    const [paidLeave, setPaidLeave] = useState(false);
    const [approve, setApprove] = useState(false);
    const [disApprove, setDisApprove] = useState(false);
    const [pending, setPending] = useState(true);

    return (
        <div className="bg-white w-full rounded-lg p-7">
            <div className="flex items-center justify-between w-full h-20">
                <div className="flex gap-3">
                    <button className={`h-12 w-28 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide ${permission ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500'}`}
                        onClick={() => {
                            setPermission(true);
                            setPaidLeave(false);
                        }}>
                        Permission
                    </button>
                    <button className={`h-12 w-28 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide ${paidLeave ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500'}`}
                        onClick={() => {
                            setPermission(false);
                            setPaidLeave(true);
                        }}>
                        Paid Leave
                    </button>
                </div>
                {paidLeave ? <div className="flex gap-3">
                <button className={`h-12 w-28 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide ${pending ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500'}`} onClick={() =>{ setApprove(false); setDisApprove(false); setPending(true)}}>Pending</button>
                <button className={`h-12 w-28 focus :outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide ${approve ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500'}`} onClick={() =>{ setApprove(true); setDisApprove(false); setPending(false)}}>Approve</button>
                <button className={`h-12 w-28 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide ${disApprove ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500'}`} onClick={() =>{ setApprove(false); setDisApprove(true); setPending(false)}}>DisApprove</button>
                </div> : null}
            </div>
            {permission ? <TablePermissionAdmin permissionData={permissionData} refetchDataPermission={refetchDataPermission} /> : null}
            {paidLeave ? <TablePaidLeaveAdmin paidLeaveData={paidLeaveData} refetchDataPaidLeave={refetchDataPaidLeave} approve={approve} disApprove={disApprove} pending={pending} /> : null}
        </div>
    )
}
export default LeavePermissionBody;