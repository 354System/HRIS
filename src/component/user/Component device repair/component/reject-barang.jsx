import { CgCalendarDates } from "react-icons/cg";


const RejectItemBox =() => {
    return (
        <div className=" laptop:w-80 w-60 h-full flex flex-col bg-white justify-between rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>62</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                <CgCalendarDates size={27} className="text-[#F9BE2A]" />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Reject</span>
            </div>
        </div>
    )
}

export default RejectItemBox;