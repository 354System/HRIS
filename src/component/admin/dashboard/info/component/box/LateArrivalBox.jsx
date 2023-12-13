import { Icon } from '@iconify/react';
const LateArrivalBox = ({ data }) => {
    const lateArrival = data?.filter((item) => item.type === 'Late').length;
    return (
        <div className="laptop:w-2/6 hp:w-1/2 h-full flex flex-col justify-between bg-white rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>{lateArrival}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <Icon icon="pajamas:time-out" className='text-purple' fontSize={20} />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Late Arrival</span>
            </div>
        </div>
    )
}
export default LateArrivalBox