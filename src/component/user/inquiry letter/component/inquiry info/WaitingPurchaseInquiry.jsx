import { MdOutlinePendingActions } from "react-icons/md";

const WaitingPurchaseInquiryBoxUser = ({ inquiryData }) => {
    const totalPendingPurchase = inquiryData?.filter((data) => data.category === 'Purchase' && data.approval === 'Wait For Response').length
    return (
        <div className="2xl:w-80 w-64 h-full flex flex-col bg-white justify-between rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>{totalPendingPurchase}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <MdOutlinePendingActions size={20} className="text-yellow" />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Waiting</span>
            </div>
        </div>
    )
}
export default WaitingPurchaseInquiryBoxUser;