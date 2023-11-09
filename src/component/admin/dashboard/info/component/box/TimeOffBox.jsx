import { Icon } from '@iconify/react';
const TimeOffBox = () => {
    return (
        <div className="w-64 h-full flex flex-col justify-between bg-white rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>456</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <Icon icon="fluent-mdl2:date-time-12" fontSize={20} className='text-purple' />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Time-Off</span>
                <div className='flex items-center gap-1'>
                    <div className='w-4 h-4 bg-[#CE7171] flex items-center justify-center rounded-full p-1'>
                        <img src="src/assets/Vector.svg" alt="" />
                    </div>
                    <div>
                        <span className='text-xs text-grey'>2% Increase than yesterday</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TimeOffBox;