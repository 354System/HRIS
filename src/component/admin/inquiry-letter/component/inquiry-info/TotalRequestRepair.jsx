import { FaRegListAlt } from "react-icons/fa"

const TotalReqInquiryRepairBoxAdmin = ({ requestData }) => {
    const totalReqPurchase = requestData?.filter((data) => data.category === "Repair").length
    return (
        <div className=" 2xl:w-80 laptop:w-[271px] hp:w-full h-full flex justify-between bg-yellow hover:bg-yellow-dark transition-colors duration-200 justify-justify-start rounded p-5 cursor-pointer">
            
            <div className='mt-2 flex flex-col gap-y-2 '>
                <span className=" text-white font-semibold text-2xl">{totalReqPurchase}</span>
                <span className=" text-white font-semibold text-xs">Repair Request</span>
            </div>
            <div className="flex justify-justify-start items-center">
                <div className='rounded-full bg-[#E6EAF5]/40 w-10 h-10 flex items-center justify-center'>
                    <FaRegListAlt color="white" size={23} />
                </div>
            </div>
        </div>
    )
}
export default TotalReqInquiryRepairBoxAdmin;