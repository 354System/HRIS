import React from "react";
import { Sidebarmenu } from "../../component/Sidebarmenu";
import { Navbar } from "../../component/Navbar";
import TableDataUser from "../../component/admin/data user/TableDataUser";

const DataUser = () => {
    return(
        <div className="bg-gray-200 min-h-screen w-full">
            <div>
                <Sidebarmenu/>
            </div>
            <div>
                <Navbar/>
            </div>
            <div className="p-10 mt-20 ml-20">
                <TableDataUser/>
            </div>
        </div>
    )
}

export default DataUser;