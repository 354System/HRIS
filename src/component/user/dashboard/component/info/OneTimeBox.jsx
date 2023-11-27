import { FiUsers } from 'react-icons/fi'
import { format } from 'date-fns';
const OnTimeBoxUser = ({ data }) => {

    const onTimeDataInMonth = data && data?.filter((item) => {
        const now = format(new Date(), 'yyyy-MM') === format(new Date(item?.date), 'yyyy-MM');
        return item?.type === 'Present' && now;
    });

    return (
        <div className="w-64 h-full flex flex-col justify-between bg-white rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>{onTimeDataInMonth?.length > 0 ? onTimeDataInMonth.length : 0}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <FiUsers size={20} color='purple' />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">On Time</span>
                <div className='flex items-center gap-1'>
                    <div className='w-4 h-4 bg-[#97CE71] flex items-center justify-center rounded-full'>
                        <p className='text-xs text-[#43900C]'>+</p>
                    </div>
                    <div>
                        <span className='text-xs text-grey'>2 new employees added!</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnTimeBoxUser;