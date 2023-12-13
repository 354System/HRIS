import { Icon } from '@iconify/react'
import { format } from 'date-fns';
const WorkingDayThismonthBoxUser = ({ data }) => {
    data?.filter((item) => {
        const now = format(new Date(), 'yyyy-MM') === format(new Date(item.date), 'yyyy-MM');
        return item.type === 'Present' && now
    })
    return (
        <div className="laptop:w-2/6 hp:w-full h-full flex flex-col bg-white justify-between rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>{data?.length ? data?.length : 0}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <Icon icon="material-symbols:bedtime-outline" fontSize={25} className='text-purple' />
                </div>
            </div>
            <div className='mt-2'>
                <span className="laptop:text-base hp:text-sm text-primary font-bold">Working Day This month</span>
            </div>
        </div>
    )
}

export default WorkingDayThismonthBoxUser;