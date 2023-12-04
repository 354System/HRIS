import { Icon } from '@iconify/react'
import { format } from 'date-fns';
const WorkingDayThismonthBoxUser = ({ data }) => {
    data?.filter((item) => {
        const now = format(new Date(), 'yyyy-MM') === format(new Date(item.date), 'yyyy-MM');
        return item.type === 'Present' && now
    })
    return (
        <div className="laptop:w-64 hp:w-full h-full flex flex-col bg-white justify-between rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>{data?.length}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <Icon icon="material-symbols:bedtime-outline" fontSize={25} className='text-purple' />
                </div>
            </div>
            <div className='mt-2'>
                <span className="laptop:text-base hp:text-sm text-primary font-bold">Working Day This month</span>
                <div className='flex items-center gap-1 hp:hidden'>
                    <div className='w-4 h-4 bg-[#97CE71] flex items-center justify-center rounded-full'>
                        <img src="/src/assets/Vector1.svg" alt="" className='text-[#43900C]' />
                    </div>
                    <div>
                        <span className='text-xs text-grey'>-10% Increase than yesterday</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkingDayThismonthBoxUser;