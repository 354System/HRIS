import { FaRegListAlt } from "react-icons/fa"

const TotalReqInquiryRepairBoxAdmin = () => {
    return (
        <div className=" 2xl:w-80 w-[271px] h-full flex flex-col bg-yellow hover:bg-yellow-dark transition-colors duration-200 justify-justify-start rounded p-5 cursor-pointer">
            <div className="flex justify-justify-start items-center">
                <div className='rounded-full bg-[#E6EAF5]/40 w-10 h-10 flex items-center justify-center'>
                    <FaRegListAlt color="white" size={23} />
                </div>
            </div>
            <div className='mt-2 flex flex-col gap-y-2 '>
                <span className="text-base text-white font-semibold">Create a Form</span>
                <span className=" text-white font-semibold text-xs">Repair Request</span>
            </div>
        </div>
    )
}
export default TotalReqInquiryRepairBoxAdmin;