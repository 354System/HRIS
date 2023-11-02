import { FiSearch } from 'react-icons/fi'
import { AiOutlineCalendar } from 'react-icons/ai'
import { useEffect, useState } from 'react'
const AOTableHeader = ({ searchKeyword, setSearchKeyword }) => {

    const [date, setDate] = useState()

    useEffect(() => {
        const times = new Date();
        const getDate = times.getDate()
        const options = { month: 'long' };
        const formattedMonth = times.toLocaleString('default', options);
        const getYear = times.getFullYear()
        const formattedDate = `${getDate} ${formattedMonth} ${getYear}`
        setDate(formattedDate);
    }, [])

    return (
        <div className="w-full flex bg-white justify-between mb-7">
            <div className="relative flex items-center gap-x-6">
                <div>
                    <input
                        type="text"
                        id="search"
                        placeholder="Quick Search..."
                        className="w-96 h-10 pl-10 bg-white border-2 border-[#D5D9DD] text-sm placeholder:text-grey rounded"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch color='#9295AB' size={18} />
                </div>
            </div>
            <div className='flex gap-4'>
                <button className='h-12 flex items-center p-2 gap-2 bg-[#D5D9DD] rounded-lg border-2 border-grey'><AiOutlineCalendar size={20} color='grey' /><p className='text-grey text-base'>{date}</p></button>
                <button className='h-12 flex items-center bg-purple p-2 gap-3 text-white rounded-lg'><img src="src/assets/filterIcon.svg" alt="" /><p className='text-base'>Advanced Filters</p></button>
            </div>
        </div>
    )
}
export default AOTableHeader