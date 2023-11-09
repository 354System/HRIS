import { BsBoxArrowRight } from 'react-icons/bs'
import { PiSquaresFourFill } from 'react-icons/pi'
import { BiUser, BiShieldQuarter } from 'react-icons/bi'
import { MdShowChart, MdAddchart } from 'react-icons/md'
import { AiOutlineCalendar, AiOutlineSetting } from 'react-icons/ai'
import { LuNetwork } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthInfo } from '../../use context/useAuthInfo'
export function Sidebarmenu() {
    const deleteToken = () => {
        localStorage.removeItem('authToken')
        window.location.href = '/login'
    }

    const { userData } = useAuthInfo()

    return (
        <div className="flex flex-col fixed h-[95%] top-6 left-6 justify-between items-center w-16 bg-white py-4 shadow-lg rounded-lg">
            <div className='p-2'>
                <img src="/src/assets/Thinkspedia Main Logo 1.png" alt="" className="w-8 h-8" />
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <Link className='w-full' to={'/dashboard'}>
                    <PiSquaresFourFill size={23} className={`cursor-pointer mb-6 w-full  ${location.pathname === '/dashboard' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-primary'}`} />
                </Link>
                <Link className='w-full' to={userData?.role === 'Admin' ? '/employee-data' : '/attendance-history'} >
                    <BiUser size={23} className={`cursor-pointer mb-6 w-full ${location.pathname === '/employee-data' || location.pathname === '/attendance-history' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-primary'}`} />
                </Link>
                <Link className='w-full' to={'/attendance-overview'}>
                    <MdShowChart size={25} className={`cursor-pointer mb-6 w-full ${location.pathname === '/attendance-history' || location.pathname === '/attendance-overview' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-primary'}`} />
                </Link>
                <Link className='w-full' to={userData?.role === 'Admin' ? '/permission-and-leave' : ''}>
                    <AiOutlineCalendar size={23} className={`cursor-pointer mb-7 w-full ${location.pathname === '/permission-and-leave' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-primary'}`} />
                </Link>
                <Link to={'/admin/user'}>
                    <LuNetwork size={23} className={`cursor-pointer mb-7 w-full ${location.pathname === '/admin/user' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-primary'}`} />
                </Link>
                <Link>
                    <MdAddchart size={23} className={`cursor-pointer mb-12 ${location.pathname === '/add' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-primary'}`} />
                </Link>
                <Link>
                    <AiOutlineSetting size={23} className={`cursor-pointer mb-6 w-full ${location.pathname === '/setting' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-primary'}`} />
                </Link>
                <Link>
                    <BiShieldQuarter size={23} className={`cursor-pointer w-full ${location.pathname === '/security' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-primary'}`} />
                </Link>
            </div>
            <div className='p-2' onClick={deleteToken}>
                <BsBoxArrowRight size={23} className='cursor-pointer text-grey hover:text-primary' />
            </div>
        </div>
    )
}