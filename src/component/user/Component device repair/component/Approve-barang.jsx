import { TbClockX } from "react-icons/tb";


const ApproveItemBox = ({ dataform }) => {

    const Approved = dataform?.filter(item => item.approval === 'Approved' && item.category === 'Purchase');


    return (
        <div className=" laptop:w-80 w-[250px] h-[134px] flex flex-col bg-white justify-between rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>{Approved?.length}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <TbClockX className="text-[#F9BE2A]" size={27} />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Approve</span>
            </div>
        </div>
    )
}

export default ApproveItemBox;