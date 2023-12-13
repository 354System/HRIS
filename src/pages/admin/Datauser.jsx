import { Sidebarmenu } from "../../component/bar/Sidebarmenu";
import { Navbar } from "../../component/bar/Navbar";
import TableDataUser from "../../component/admin/data user/table/TableDataUser";
import { useState } from "react";

const DataUser = () => {
    const [sideBarMenu, setSideBarMenu] = useState(false)
    return (
        <div className="absolute bg-gray-300 min-h-screen w-full">
            <Sidebarmenu sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <Navbar sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <div className="laptop:p-7 hp:p-3 mt-28 laptop:pl-28 w-full mb-10">
                <TableDataUser />
            </div>
        </div>
    )
}

export default DataUser;