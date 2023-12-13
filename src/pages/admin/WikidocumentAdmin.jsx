import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";
import WikiDocumentBodyAdmin from "../../component/admin/wiki document/WikiDocumentBodyAdmin";
import WikiDocumentHeaderAdmin from "../../component/admin/wiki document/WikiDocumentHeaderAdmin";
import { useState } from "react";
const WikiDocumentAdmin = () => {
    const [sideBarMenu, setSideBarMenu] = useState(false)
    return (
        <div className="absolute bg-gray-300 laptop:min-h-screen w-full">
            <Sidebarmenu sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <Navbar sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <div className="laptop:p-7 hp:p-3 mt-28 laptop:pl-28 w-full flex flex-col">
                <WikiDocumentHeaderAdmin />
                <WikiDocumentBodyAdmin />
            </div>            
        </div>
    )
}
export default WikiDocumentAdmin;