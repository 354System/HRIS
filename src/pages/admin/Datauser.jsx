import React from "react";
import { Sidebarmenu } from "../../component/Sidebarmenu";
import { Navbar } from "../../component/Navbar";
import User from "../../component/admin/User/user";

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
                <User/>
            </div>
        </div>
    )
}

export default DataUser;