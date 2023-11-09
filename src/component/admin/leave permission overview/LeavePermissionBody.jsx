import { useState } from "react";
import TablePaidLeaveAdmin from "./table/paidLeave";
import TablePermissionAdmin from "./table/permission";

const LeavePermissionBody = () => {
    const [permission, setPermission] = useState(true);
    const [paidLeave, setPaidLeave] = useState(false);
    return (
        <div className="bg-white w-full rounded-lg p-5">
            <div className="flex items-center w-full h-20 gap-3">
                <button
                    className={`h-12 w-28 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide ${permission ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500'
                        }`}
                    onClick={() => {
                        setPermission(true);
                        setPaidLeave(false);
                    }}
                >
                    Permission
                </button>
                <button
                    className={`h-12 w-28 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide ${paidLeave ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500'
                        }`}
                    onClick={() => {
                        setPermission(false);
                        setPaidLeave(true);
                    }}
                >
                    PaidLeave
                </button>
            </div>
            {permission ? <TablePermissionAdmin /> : null}
            {paidLeave ? <TablePaidLeaveAdmin /> : null}
        </div>
    )
}
export default LeavePermissionBody;