import { useState } from "react"
import { useFetchAllInquiryLetterCurrentUser } from "../../api/fetchDataCurrentUser/useFetchAllInquiryLetter"
import { Navbar } from "../../component/bar/Navbar"
import { Sidebarmenu } from "../../component/bar/Sidebarmenu"
import InquiryLetterInfo from "../../component/user/inquiry letter/container/InquiryLetterInfo"
import InquiryLetterTableUser from "../../component/user/inquiry letter/container/InquiryLetterTable"

const InquiryLetterUser = () => {
    const { data: inquiryData, isLoading, isError, error, refetch: refetchInquiryData } = useFetchAllInquiryLetterCurrentUser()
    const [sideBarMenu, setSideBarMenu] = useState(false)
    return (
        <div className="absolute bg-gray-300 w-full">
            <Sidebarmenu sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <Navbar sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <div className="laptop:p-7 hp:p-3 laptop:mt-28 hp:mt-24 laptop:pl-28 w-full">
                <div className="laptop:h-72 hp:h-1/2">
                    <InquiryLetterInfo refetchInquiryData={refetchInquiryData} inquiryData={inquiryData} />
                </div>
                <div className="w-full mt-5">
                    <InquiryLetterTableUser dataInquiry={inquiryData} refetchInquiryData={refetchInquiryData} />
                </div>
            </div>
        </div>
    )
}
export default InquiryLetterUser