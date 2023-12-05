import { FiMenu, FiSearch } from 'react-icons/fi'
import { IoMdNotificationsOutline } from 'react-icons/io'
export function Navbar() {
    const pageTitles = {
        '/admin/dashboard': 'Dashboard',
        '/attendance-overview': 'Attendance Overview',
        '/permission-and-leave': 'Attendance Permission & Leave',
        '/employee-data': 'Employee',
        '/attendance-history': 'History',
        '/wiki-document': 'Wiki Document',
        '/request': 'Request',
    };
    // Mengambil judul berdasarkan lokasi saat ini
    const currentPageTitle = pageTitles[location.pathname] || '';
    return (
        <div className='w-full flex justify-center items-center'>
            <nav className="laptop:fixed hp:absolute z-10 top-6 laptop:right-6 laptop:w-[89.4%] laptop:h-[75px] hp:h-16 hp:w-[94%] flex items-center justify-between bg-white p-6 shadow-lg rounded-lg backdrop-blur-md">
                <div className='flex items-center gap-3'>
                    <FiMenu className='laptop:hidden hp:hidden text-primary w-6 h-6 transform active:scale-75 transition duration-200'  />
                    <span className="navtitle laptop:text-xl hp:text-base font-semibold text-primary">{currentPageTitle}</span>
                </div>
                <div className="relative flex items-center gap-x-6">
                    <div className={`hp:hidden laptop:block`}>
                        <input
                            type="text"
                            id="search"
                            placeholder="Quick Search..."
                            className="w-64 h-10 pl-10 bg-gray-100 text-sm placeholder:text-grey rounded"
                        />
                    </div>
                    <div className="hp:hidden laptop:flex absolute inset-y-0 left-0 pl-3 items-center pointer-events-none">
                        <FiSearch color='#9295AB' size={18} />
                    </div>
                    <div className='hp:hidden laptop:block'>
                        <IoMdNotificationsOutline color='primary' className='hp:w-6 hp:h-6 laptop:w-6 laptop:h-6' />
                    </div>
                    <div className='border-l-2 flex items-center laptop:px-5 hp:px-3 laptop:gap-4 hp:gap-2'>
                        <div className='laptop:hidden hp:block'>
                            <IoMdNotificationsOutline color='primary' className='hp:w-6 hp:h-6 ' />
                        </div>
                        <div>
                            <img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="" className='hp:w-7 hp:h-7 laptop:w-10 laptop:h-10 rounded-full' />
                        </div>
                        <div className='flex flex-col text-sm hp:text-xs'>
                            <p className='laptop:hidden hp:block'>Valeryan Rizky</p>
                            <p>Public</p>
                            <p className='hp:hidden laptop:block'>admin@gmail.com</p>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
} 