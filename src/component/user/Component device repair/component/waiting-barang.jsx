import { FaRegMoon } from "react-icons/fa";


const WaitingItemBox = ({ dataform }) => {

    const wait = dataform?.filter(item => item.approval === 'Wait For Response' && item.category === 'Purchase');

    return (
        <div className=" laptop:w-80 w-[250px] h-[134px] flex flex-col bg-white justify-between rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>{wait?.length}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <FaRegMoon size={27} className="text-[#F9BE2A]" />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Waiting</span>
            </div>
        </div>
    )
}

export default WaitingItemBox;