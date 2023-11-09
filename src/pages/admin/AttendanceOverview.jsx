import AOtable from "../../component/admin/attandance overview/table/AOtable"
import { Sidebarmenu } from "../../component/bar/Sidebarmenu"
import { Navbar } from "../../component/bar/Navbar"
const AttendanceOverview = () => {
    return (
        <div className="w-full min-h-full absolute bg-darkwhite">
            <Sidebarmenu />
            <Navbar />
            <div className="flex-col p-3 bg-white ml-28 mt-36">
                <AOtable />
            </div>
        </div>
    )
}
export default AttendanceOverview;