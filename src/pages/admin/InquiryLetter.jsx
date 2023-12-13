import { useState } from "react";
import InquiryLetterInfoAdmin from "../../component/admin/inquiry-letter/container/InquiryInfo"
import InquiryLetterBodyAdmin from "../../component/admin/inquiry-letter/container/InquiryLetterBody";
import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";

const InquiryLetterAdmin = () => {
    const [sideBarMenu, setSideBarMenu] = useState(false)
    return (
        <div className="absolute bg-gray-300 min-h-screen w-full">
            <Sidebarmenu sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <Navbar sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <div className="laptop:p-7 hp:p-3 mt-24 laptop:pl-28 w-full">
                <div className="w-full laptop:h-72 mb-10">
                    <InquiryLetterInfoAdmin />
                </div>
                <div>
                    <InquiryLetterBodyAdmin />
                </div>
            </div>
        </div>
    )
}
export default InquiryLetterAdmin;