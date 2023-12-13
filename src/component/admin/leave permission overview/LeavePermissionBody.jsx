import { useState } from "react";
import TablePaidLeaveAdmin from "./table/paidLeave";
import TablePermissionAdmin from "./table/permission";
import { TextInput } from "flowbite-react";
import { flowbiteTheme } from "../../../lib/flowbiteTheme";
import { FiSearch } from "react-icons/fi";

const LeavePermissionBody = ({ permissionData, paidLeaveData, refetchDataPermission, refetchDataPaidLeave }) => {
    const [permission, setPermission] = useState(true);
    const [paidLeave, setPaidLeave] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    
    return (
        <div className="bg-white w-full rounded-lg p-7">
            <div className="flex items-center justify-between w-full laptop:h-20 hp:flex-col">
                <div className="flex gap-3 hp:mb-4">
                    <button className={`h-12 w-36 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide text-sm ${permission ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500 border border-gray-500 hover:bg-purple/50 hover:text-white transition-colors duration-200'}`}
                        onClick={() => {
                            setPermission(true);
                            setPaidLeave(false);
                        }}>
                        Permission
                    </button>
                    <button className={`h-12 w-36 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide text-sm ${paidLeave ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500 border border-gray-500 hover:bg-purple/50 hover:text-white transition-colors duration-200'}`}
                        onClick={() => {
                            setPermission(false);
                            setPaidLeave(true);
                        }}>
                        Paid Leave
                    </button>
                </div>
                <div className="w-full laptop:flex laptop:justify-end">
                    <TextInput
                        theme={flowbiteTheme}
                        type="text"
                        id="search"
                        placeholder="Quick Search..."
                        icon={FiSearch}
                        className="laptop:w-96 hp:w-full"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
            </div>
            {permission ? <TablePermissionAdmin permissionData={permissionData} searchKeyword={searchKeyword} refetchDataPermission={refetchDataPermission} /> : null}
            {paidLeave ? <TablePaidLeaveAdmin paidLeaveData={paidLeaveData} searchKeyword={searchKeyword} refetchDataPaidLeave={refetchDataPaidLeave} /> : null}
        </div>
    )
}
export default LeavePermissionBody;