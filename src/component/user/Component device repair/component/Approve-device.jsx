import { LuUsers } from "react-icons/lu";

const ApproveDeviceBox = () => {
    return (
        <div className=" 2xl:w-80 w-60 h-full flex flex-col bg-white justify-between rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary flex flex-col'>
                    <span>62</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <LuUsers className="text-[#A332C3]" size={24} />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-semibold">Approve</span>
            </div>
        </div>
    )
}

export default ApproveDeviceBox;