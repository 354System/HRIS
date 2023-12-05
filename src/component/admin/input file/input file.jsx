import React from "react"
import { Sidebarmenu } from "../../Sidebarmenu";
import TableInput from "./component/table input";
import NavbarUser from "../../user/Component dashboard/Navbar";



const InputFile = () => {
    return (
        <div className="w-full min-h-screen flex absolute bg-gray-200">
            <div className="p-8 laptop:block hp:hidden">
                <Sidebarmenu />
            </div>
            <div className="w-full hp:p-3 hp:mt-10 laptop:ml-3 laptop:mt-6 laptop:p-8">
                <NavbarUser title="Wiki Document" />
                <div className="w-full mt-20">
                    <TableInput/>
                </div>
            </div>
        </div>
    )
}

export default InputFile;