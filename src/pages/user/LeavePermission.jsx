import { useState } from "react";
import { Navbar } from "../../component/bar/Navbar"
import { Sidebarmenu } from "../../component/bar/Sidebarmenu"
import LeavePermissionOverviewUserBody from "../../component/user/permission and paid leave/leavePermissionOverviewBody"

const LeavePermissionOverviewUser = () => {
    const [sideBarMenu, setSideBarMenu] = useState(false);
    return (
        <div className="absolute bg-gray-300 min-h-screen w-full">
            <Sidebarmenu sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <Navbar sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <div className="laptop:p-7 mt-28 laptop:pl-28 hp:p-3 w-full ">
                <LeavePermissionOverviewUserBody />
            </div>
        </div>
    )
}
export default LeavePermissionOverviewUser;