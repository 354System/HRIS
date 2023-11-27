import { useState } from "react"
import PermissionTableUser from "./table/permissionTable"
import PaidLeaveTableUser from "./table/paidLeaveTableUser"
import { FiSearch } from "react-icons/fi"
import { TextInput } from "flowbite-react"
import { flowbiteTheme } from "../../../lib/flowbiteTheme"
const LeavePermissionOverviewUserBody = () => {
    const [permission, setPermission] = useState(true)
    const [paidLeave, setPaidLeave] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('');

    return (
        <div className="bg-white w-full rounded-lg p-7 mb-10">
            <div className="flex items-center justify-between w-full h-20">
                <div className="flex gap-3">
                    <button className={`h-12 w-36 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide text-sm ${permission ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500 border border-gray-500 hover:bg-purple/50 hover:text-white transition-colors duration-200'}`}
                        onClick={() => {
                            setPermission(true);
                            setPaidLeave(false);
                        }}
                    >
                        Permission
                    </button>
                    <button className={`h-12 w-36 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide text-sm ${paidLeave ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500 border border-gray-500 hover:bg-purple/50 hover:text-white transition-colors duration-200'}`}
                        onClick={() => {
                            setPermission(false);
                            setPaidLeave(true);
                        }}
                    >
                        Paid Leave
                    </button>
                </div>
                <div>
                    <TextInput
                        theme={flowbiteTheme}
                        type="text"
                        id="search"
                        placeholder="Quick Search..."
                        icon={FiSearch}
                        className="w-96"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
            </div>
            {permission ? <PermissionTableUser searchKeyword={searchKeyword} /> : null}
            {paidLeave ? <PaidLeaveTableUser searchKeyword={searchKeyword} /> : null}
        </div>
    )
}
export default LeavePermissionOverviewUserBody