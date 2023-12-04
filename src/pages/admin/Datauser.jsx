import React from "react";
import { Sidebarmenu } from "../../component/Sidebarmenu";
import User from "../../component/admin/User/user";
import NavbarUser from "../../component/user/Component dashboard/Navbar";

const DataUser = () => {
    return(
        <div className="bg-gray-200 min-h-screen w-full">
            <div className="laptop:flex hp:hidden">
                <Sidebarmenu/>
            </div>
            <div>
                <NavbarUser title="Data User"/>
            </div>
            <div className="laptop:p-10 laptop:mt-20 laptop:ml-24">
                <User/>
            </div>
        </div>
    )
}

export default DataUser;