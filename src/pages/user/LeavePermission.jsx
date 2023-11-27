import { Navbar } from "../../component/bar/Navbar"
import { Sidebarmenu } from "../../component/bar/Sidebarmenu"
import LeavePermissionOverviewUserBody from "../../component/user/permission and paid leave/leavePermissionOverviewBody"

const LeavePermissionOverviewUser = () => {
    return (
        <div className="absolute bg-gray-300 min-h-screen w-full">
            <Sidebarmenu />
            <Navbar />
            <div className="p-7 mt-28 pl-28 w-full">
                <LeavePermissionOverviewUserBody />
            </div>
        </div>
    )
}
export default LeavePermissionOverviewUser;