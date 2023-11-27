import { useFetchAllInquiryLetterCurrentUser } from "../../api/fetchDataCurrentUser/useFetchAllInquiryLetter"
import { Navbar } from "../../component/bar/Navbar"
import { Sidebarmenu } from "../../component/bar/Sidebarmenu"
import InquiryLetterInfo from "../../component/user/inquiry letter/container/InquiryLetterInfo"
import InquiryLetterTableUser from "../../component/user/inquiry letter/container/InquiryLetterTable"

const InquiryLetterUser = () => {
    const { data: inquiryData, isLoading, isError, error, refetch: refetchInquiryData } = useFetchAllInquiryLetterCurrentUser()
    return (
        <div className="absolute bg-gray-300 min-h-screen w-full">
            <Sidebarmenu />
            <Navbar />
            <div className="p-7 mt-24 pl-28 w-full">
                <div className="w-full h-72 mb-10">
                    <InquiryLetterInfo refetchInquiryData={refetchInquiryData} inquiryData={inquiryData} />
                </div>
                <div className="w-full">
                    <InquiryLetterTableUser dataInquiry={inquiryData} refetchInquiryData={refetchInquiryData} />
                </div>
            </div>
        </div>
    )
}
export default InquiryLetterUser