import { MdOutlinePendingActions } from "react-icons/md";

const WaitingRepairInquiryBoxUser = ({ inquiryData }) => {
    const totalPendingRepair = inquiryData?.filter((data) => data.category === 'Repair' && data.approval === 'Wait For Response').length

    return (
        <div className="2xl:w-80 w-64 h-full flex flex-col bg-white justify-between rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>{totalPendingRepair}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <MdOutlinePendingActions className="text-yellow" size={20} />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Waiting</span>
            </div>
        </div>
    )
}
export default WaitingRepairInquiryBoxUser;