import { Icon } from '@iconify/react';
export function OnTimeBox() {
    return (
        <div className="w-60 h-full flex flex-col justify-between bg-white rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary '>
                    <span>456</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <Icon icon="material-symbols:avg-time-outline-sharp" fontSize={25} className='text-purple' />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">On Time</span>
                <div className='flex items-center gap-1'>
                    <div className='w-4 h-4 bg-[#97CE71] flex items-center justify-center rounded-full'>
                        <img src="src/assets/trendingup.svg" alt="" className='text-[#43900C]' />
                    </div>
                    <div>
                        <span className='text-xs text-grey'>+3% Increase than yesterday</span>
                    </div>
                </div>
            </div>
        </div>
    )
}