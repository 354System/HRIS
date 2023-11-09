import LeavePermissionBody from "../../component/admin/leave permission overview/LeavePermissionBody";
import LeavePermissionInfo from "../../component/admin/leave permission overview/LeavePermissionInfo";
import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";

const LeavePermissionOverviewAdmin = () => {
    return (
        <div className="w-full min-h-screen flex bg-gray-300">
            <Sidebarmenu />
            <Navbar />
            <div className="relative w-full flex flex-col mt-28 p-6 ml-20 pl-8"> {/* Tambahkan class 'pl-24' untuk memberikan margin kiri sesuai lebar sidebar */}
                <div className="mb-12">
                    <LeavePermissionInfo />
                </div>
                <div className="w-full">
                    <LeavePermissionBody />
                </div>
            </div>
        </div>
    );
};

export default LeavePermissionOverviewAdmin;