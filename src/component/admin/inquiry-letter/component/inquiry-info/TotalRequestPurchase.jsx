import { FaRegListAlt } from "react-icons/fa"

const TotalReqInquiryPurchaseBoxAdmin = ({ requestData }) => {
    const totalReqPurchase = requestData?.filter((data) => data.category === "Purchase").length
    return (
        <div className="2xl:w-80 laptop:w-[271px] hp:w-full h-full flex bg-purple hover:bg-purple-dark transition-colors duration-200 justify-between rounded p-5 cursor-pointer">
            <div className='mt-2 flex flex-col gap-y-2'>
                <span className="text-2xl text-white font-semibold">{totalReqPurchase}</span>
                <span className=" text-white font-semibold text-xs">Purchase Request</span>
            </div>
            <div className="flex justify-between items-center">
                <div className='rounded-full bg-[#E6EAF5]/40 w-10 h-10 flex items-center justify-center'>
                    <FaRegListAlt color="white" size={23} />
                </div>
            </div>
        </div>
    )
}
export default TotalReqInquiryPurchaseBoxAdmin;