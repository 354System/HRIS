import { Icon } from '@iconify/react';
import { useState } from 'react';
import React from 'react';
import RepairInquryLetterForm from './form/repairInquiryLetterForm';

const RepairInquryLetterBox = ({ refetchInquiryData }) => {
    const [repairFormPopUp, setRepairFormPopUp] = useState(false)
    return (
        <>
            <div className=" 2xl:w-80 laptop:w-[271px] hp:w-full h-full flex flex-col bg-yellow hover:bg-yellow-dark transition-colors duration-200 justify-justify-start rounded p-5 cursor-pointer" onClick={() => setRepairFormPopUp(true)}>
                <div className="flex justify-justify-start items-center">
                    <div className='rounded-full bg-[#E6EAF5]/40 w-10 h-10 flex items-center justify-center'>
                        <Icon icon="solar:document-medicine-linear" color="white" width="27" />
                    </div>
                </div>
                <div className='mt-2 flex flex-col gap-y-2 '>
                    <span className="text-base text-white font-semibold">Create a Form</span>
                    <span className=" text-white font-semibold text-xs">Repair Request</span>
                </div>
            </div>
            {repairFormPopUp ? <RepairInquryLetterForm refetchInquiryData={refetchInquiryData} setRepairFormPopUp={setRepairFormPopUp} /> : null}
        </>

    )
}

export default RepairInquryLetterBox;