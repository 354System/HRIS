import { Icon } from '@iconify/react';
const AbsenBox = () =>  {
    return (
        <div className="w-60 2xl:w-80 h-full flex flex-col justify-between bg-white rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary '>
                    <span>2</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <Icon icon="material-symbols:avg-time-outline-sharp" fontSize={25} className='text-purple' />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Absent</span>
                <div className='flex items-center gap-1'>
                    <div className='w-4 h-4 bg-[#e4ffd0a7] flex items-center justify-center rounded-full'>
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

export default AbsenBox;