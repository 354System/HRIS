import { FiUsers } from 'react-icons/fi'
const OnTimeBox = () => {
    return (
        <div className="w-60 2xl:w-80 h-full flex flex-col justify-between bg-white rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>18</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <FiUsers size={20} color='purple' />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">On Time</span>
                <div className='flex items-center gap-1'>
                    <div className='w-4 h-4 bg-[#e4ffd0a7] flex items-center justify-center rounded-full'>
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

export default OnTimeBox;