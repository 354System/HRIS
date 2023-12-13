import { Icon } from '@iconify/react';
import { useFetchAllPresence } from '../../../../../../api/fetchData/useFetchAllPresence';
const OnTimeBoxAdmin = ({ data }) => {
    const onTime = data?.filter((item) => item.type === 'Present').length;
    return (
        <div className="laptop:w-2/6 hp:w-1/2 h-full flex flex-col justify-between bg-white rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary '>
                    <span>{onTime}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <Icon icon="material-symbols:avg-time-outline-sharp" fontSize={25} className='text-purple' />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">On Time</span>
            </div>
        </div>
    )
}
export default OnTimeBoxAdmin;