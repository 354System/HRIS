import { MdOutlineTimer } from "react-icons/md";

const WaitingDeviceBox = ({ dataForm }) => {


    const wait = dataForm?.filter(item => item.approval === 'Wait For Response' && item.category === 'Repair');

    return (
        <div className=" laptop:w-80 w-[250px] h-[134px] flex flex-col bg-white justify-between rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>{wait?.length}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <MdOutlineTimer className="text-[#A332C3]" size={27} />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Waiting</span>
            </div>
        </div>
    )
}

export default WaitingDeviceBox;