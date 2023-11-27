import { FaRegListAlt } from "react-icons/fa";
import { useState } from "react";
import PurchaseInquiryLetterForm from "./form/purchaseInquiryLetterForm";

const PurchaseInquiryLetterBox = ({ refetchInquiryData }) => {
    const [purchaseFormPopUp, setPurchaseFormPopUp] = useState(false);
    const [category, setCategory] = useState('Purchase');
    return (
        <>
            <div className="2xl:w-80 w-[271px] h-full flex flex-col bg-purple hover:bg-purple-dark transition-colors duration-200 justify-between rounded p-5 cursor-pointer" onClick={() => setPurchaseFormPopUp(true)}>
                <div className="flex justify-between items-center">
                    <div className='rounded-full bg-[#E6EAF5]/40 w-10 h-10 flex items-center justify-center'>
                        <FaRegListAlt color="white" size={23} />
                    </div>
                </div>
                <div className='mt-2 flex flex-col gap-y-2'>
                    <span className="text-base text-white font-semibold">Create a Form</span>
                    <span className=" text-white font-semibold text-xs">Purchase Request</span>
                </div>
            </div>
            {purchaseFormPopUp ? <PurchaseInquiryLetterForm refetchInquiryData={refetchInquiryData} setPurchaseFormPopUp={setPurchaseFormPopUp} category={category} /> : null}
        </>
    )
}
export default PurchaseInquiryLetterBox;