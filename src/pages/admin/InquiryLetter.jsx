import InquiryLetterInfoAdmin from "../../component/admin/inquiry-letter/container/InquiryInfo"
import InquiryLetterBodyAdmin from "../../component/admin/inquiry-letter/container/InquiryLetterBody";
import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";

const InquiryLetterAdmin = () => {
    return (
        <div className="absolute bg-gray-300 min-h-screen w-full">
            <Sidebarmenu />
            <Navbar />
            <div className="p-7 mt-24 pl-28 w-full">
                <div className="w-full h-72 mb-10">
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