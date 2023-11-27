import { BsBoxArrowRight } from 'react-icons/bs'
import { PiSquaresFourFill } from 'react-icons/pi'
import { BiUser, BiShieldQuarter, BiSolidDashboard } from 'react-icons/bi'
import { MdShowChart, MdAddchart } from 'react-icons/md'
import { AiOutlineCalendar, AiOutlineSetting } from 'react-icons/ai'
import { LuNetwork } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthInfo } from '../../use context/useAuthInfo'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { IoDocumentTextOutline } from 'react-icons/io5'
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
                <Link className='w-full' to={'/dashboard'} >
                    <BiSolidDashboard data-tooltip-id='dashboard-tooltip' size={23} className={`cursor-pointer mb-6 w-full  ${location.pathname === '/dashboard' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} />
                    <Tooltip id='dashboard-tooltip' content='Dashboard' place='right' effect='solid' offset={-12} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                </Link>
                <Link className='w-full relative' to={userData?.role === 'Admin' ? '/employee-data' : ''} >
                    <BiUser size={23} data-tooltip-id='BiUser' className={`cursor-pointer mb-6 w-full ${location.pathname === '/employee-data' || location.pathname === '' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} />
                    <Tooltip id='BiUser' content={userData?.role === 'Admin' ? 'Employee Data' : 'Profil'} place='right' effect='solid' offset={-12} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em', zIndex: '50' }} noArrow />
                </Link>
                <Link className='w-full' to={'/attendance-overview'}>
                    <MdShowChart data-tooltip-id='history' size={25} className={`cursor-pointer mb-6 w-full ${location.pathname === '/attendance-overview' || location.pathname === '/attendance-overview' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} />
                    <Tooltip id='history' content='Attendance Overview' place='right' offset={-12} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                </Link>
                <Link className='w-full' to={'/permission-and-leave'}>
                    <AiOutlineCalendar data-tooltip-id='permissionandleave' size={23} className={`cursor-pointer mb-7 w-full ${location.pathname === '/permission-and-leave' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} />
                    <Tooltip id='permissionandleave' content='Permission and Leave' place='right' offset={-12} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                </Link>
                <Link className='w-full' to={'/wiki-document'}>
                    <IoDocumentTextOutline data-tooltip-id='wiki-document' size={23} className={`cursor-pointer mb-7 w-full ${location.pathname === '/wiki-document' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} />
                    <Tooltip id='wiki-document' content='Wiki Document' place='right' offset={-12} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                </Link>
                <Link className='w-full justify-center' to={'/request'}>
                    <MdAddchart data-tooltip-id='request' size={23} className={`cursor-pointer mb-12 w-full ${location.pathname === '/request' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} />
                    <Tooltip id='request' content='Inquiry Letter' place='right' offset={-12} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                </Link>
                <Link>
                    <AiOutlineSetting size={23} className={`cursor-pointer mb-6 w-full ${location.pathname === '/setting' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} />
                </Link>
                <Link>
                    <BiShieldQuarter size={23} className={`cursor-pointer w-full ${location.pathname === '/security' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} />
                </Link>
            </div>
            <div className='p-2' onClick={deleteToken}>
                <BsBoxArrowRight size={23} className='cursor-pointer text-grey hover:text-purple/50 transition-colors duration-200' />
            </div>
        </div>
    )
}