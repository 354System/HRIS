import { Icon } from '@iconify/react';
const ApprovePermission =() => {
    return (
        <div className="w-64 h-full flex flex-col bg-white justify-between rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>62</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                <Icon icon="pajamas:time-out" color="#f9be2a" width="20" />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Approved</span>
                <div className='flex items-center gap-1 hp:hidden'>
                    <div className='w-4 h-4 bg-[#CE7171] flex items-center justify-center rounded-full'>
                    <img src="src/assets/Vector1.svg"  alt="" className='text-[#43900C]' />
                    </div>
                    <div>
                        <span className='text-xs text-grey'>+3% Increase than yesterday</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApprovePermission;