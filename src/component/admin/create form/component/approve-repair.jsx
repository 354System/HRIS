import React from 'react';
import { FaUserFriends } from "react-icons/fa";

const ApproveRepair = () => {


    return (
        <div className="laptop:w-80 hp:w-full active:bg-purple-dark laptop:h-full hp:h-[70%] flex flex-col bg-purple hover:bg-purple-dark transition-colors duration-200 justify-between rounded p-5 cursor-pointer">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-white'>
                    <span>62</span>
                </div>
                <div className='rounded-full bg-[#e6eaf55b] w-10 h-10 flex items-center justify-center'>
                    <FaUserFriends size={27} className="text-white" />
                </div>
            </div>
            <div className='mt-6'>
                <span className="text-base text-white font-bold">Form</span>
            </div>
        </div>

    )
}

export default ApproveRepair;