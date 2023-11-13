import { Sidebarmenu } from "../../component/bar/Sidebarmenu";
import { Navbar } from "../../component/bar/Navbar";
import TableDataUser from "../../component/admin/data user/table/TableDataUser";

const DataUser = () => {
    return (
        <div className="absolute bg-gray-300 min-h-screen w-full">
            <Sidebarmenu />
            <Navbar />
            <div className="p-7 mt-28 pl-28 w-full mb-10">
                <TableDataUser />
            </div>
        </div>
    )
}

export default DataUser;