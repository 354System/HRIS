import { FiSearch } from 'react-icons/fi'

const AOtableHeaderDashboard = () => {
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold mt-5 ml-2">Attendance Overview Today</h1>
            <div className="relative flex items-center gap-x-6">
                <div>
                    <input
                        type="text"
                        id="search"
                        placeholder="Quick Search..."
                        className="w-96 h-10 pl-10 bg-white border-2 border-[#D5D9DD] text-sm placeholder:text-grey rounded"
                    />
                </div>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch color='#9295AB' size={18} />
                </div>
            </div>
        </div>
    )
}
export default AOtableHeaderDashboard;