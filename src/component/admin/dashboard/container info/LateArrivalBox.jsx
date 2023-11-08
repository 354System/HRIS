import { Icon } from '@iconify/react';
export function LateArrivalBox() {
    return (
        <div className=" 2xl:w-80 w-60 h-full flex flex-col justify-between bg-white rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>456</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <Icon icon="pajamas:time-out" className='text-purple' fontSize={20} />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Late Arrival</span>
                <div className='flex items-center gap-1'>
                    <div className='w-4 h-4 bg-[#f59393] flex items-center justify-center rounded-full p-1'>
                        <img src="/src/assets/Vector2.png" alt="" />
                    </div>
                    <div>
                        <span className='text-xs text-grey'>+3% Increase than yesterday</span>
                    </div>
                </div>
            </div>
        </div>
    )
}