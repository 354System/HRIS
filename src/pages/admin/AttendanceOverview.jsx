import AOtable from "../../component/admin/attandance overview/table/AOtable"
import { Sidebarmenu } from "../../component/bar/Sidebarmenu"
import { Navbar } from "../../component/bar/Navbar"
const AttendanceOverview = () => {
    return (
        <div className="absolute bg-gray-300 min-h-screen w-full">
            <Sidebarmenu />
            <Navbar />
            <div className="p-7 mt-28 pl-28 w-full mb-10 ">
                <AOtable />
            </div>
        </div> 
    )
}
export default AttendanceOverview;