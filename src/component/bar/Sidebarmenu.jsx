import { BsBoxArrowRight } from 'react-icons/bs'
import { BiUser, BiShieldQuarter, BiSolidDashboard } from 'react-icons/bi'
import { MdShowChart, MdAddchart, MdOutlineWorkHistory, MdCancel } from 'react-icons/md'
import { AiOutlineCalendar, AiOutlineSetting } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthInfo } from '../../use context/useAuthInfo'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { IoCloseOutline, IoDocumentTextOutline } from 'react-icons/io5'
import { confirmAlert } from '../../lib/sweetAlert'
import { FiMenu } from 'react-icons/fi'
export function Sidebarmenu({ sideBarMenu, setSideBarMenu }) {
    const deleteToken = () => {
        confirmAlert({
            title: 'Are you sure you want to logout?',
            text: 'You will be logged out!',
            confirmText: 'Yes, Logout',
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('authToken')
                window.location.href = '/login'
            }
        })
    }
    const { userData } = useAuthInfo()

    return (
        <div className={`${sideBarMenu ? 'hp:flex hp:z-20 hp:w-32 ' : 'hp:hidden hp:opacity-0'} laptop:flex flex-col fixed laptop:h-[95%] hp:min-h-3/4 laptop:top-6 hp:top-[15%] laptop:left-6 hp:left-0 justify-between items-center laptop:w-16 hp:w-64 laptop:bg-white hp:bg-darkwhite py-4 hp:p-3 shadow-lg laptop:rounded-lg hp:rounded transition-width duration-300 ease-in-out`}>
            <div className='laptop:p-2 hp:p-2 hp:mb-4 laptop:mb-6 flex items-center laptop:justify-center hp:justify-between w-full'>
                <img src="/src/assets/Thinkspedia Main Logo 1.png" alt="" className="w-8 h-8 hp:hidden" />
                <img src="src/assets/logo terbaru.png" alt="" className="h-8 w-44 laptop:hidden" />
                <MdCancel className='laptop:hidden absolute right-2 w-8 h-8 text-purple active:scale-50 transition duration-200' onClick={() => setSideBarMenu(false)} />
            </div>
            <div className='w-full flex flex-col justify-center laptop:items-center'>
                <Link className={`w-full flex laptop:justify-center laptop:mb-6 hp:mb-3 hp:p-1 hp:gap-2 ${location.pathname === '/dashboard' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} to={'/dashboard'} >
                    <BiSolidDashboard data-tooltip-id='dashboard-tooltip' size={23} className='cursor-pointer' />
                    {sideBarMenu && <span className='laptop:hidden'>Dashboard</span>}
                    <Tooltip id='dashboard-tooltip' content='Dashboard' place='right' effect='solid' offset={-12} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                </Link>
                <Link className={`w-full flex laptop:justify-center laptop:mb-6 hp:mb-3 hp:p-1 gap-2 ${location.pathname === '/employee-data' || location.pathname === '' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} to={userData?.role === 'Admin' ? '/employee-data' : ''} >
                    <BiUser size={23} data-tooltip-id='BiUser' className='cursor-pointer' />
                    {sideBarMenu && <span>Profil</span>}
                    <Tooltip id='BiUser' content={userData?.role === 'Admin' ? 'Employee Data' : 'Profil'} place='right' effect='solid' offset={-12} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em', zIndex: '50' }} noArrow />
                </Link>
                <Link className={`w-full flex laptop:justify-center laptop:mb-6 hp:mb-3 hp:p-1 gap-2 ${location.pathname === '/attendance-overview' || location.pathname === '/attendance-overview' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} to={'/attendance-overview'}>
                    <MdOutlineWorkHistory data-tooltip-id='history' size={23} className={`cursor-pointer ${sideBarMenu && ''}`} />
                    {sideBarMenu && <span>Attendance History</span>}
                    <Tooltip id='history' content='Attendance Overview' place='right' offset={-12} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                </Link>
                <Link className={`w-full flex laptop:justify-center laptop:mb-7 hp:mb-3 hp:p-1 gap-2 ${location.pathname === '/permission-and-leave' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} to={'/permission-and-leave'}>
                    <AiOutlineCalendar data-tooltip-id='permissionandleave' size={23} className={`cursor-pointer ${sideBarMenu && ''}`} />
                    {sideBarMenu && <span>Permission and Leave</span>}
                    <Tooltip id='permissionandleave' content='Permission and Leave' place='right' offset={-12} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                </Link>
                <Link className={`w-full flex laptop:justify-center laptop:mb-7 hp:mb-3 hp:p-1 gap-2 ${location.pathname === '/wiki-document' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} to={'/wiki-document'}>
                    <IoDocumentTextOutline data-tooltip-id='wiki-document' size={23} className='cursor-pointer' />
                    {sideBarMenu && <span>Wiki Document</span>}
                    <Tooltip id='wiki-document' content='Wiki Document' place='right' offset={-12} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                </Link>
                <Link className={`w-full flex laptop:justify-center laptop:mb-12 hp:mb-8 hp:p-1 gap-2 ${location.pathname === '/request' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`} to={'/request'}>
                    <MdAddchart data-tooltip-id='request' size={23} className='cursor-pointer' />
                    {sideBarMenu && <span>Request Form</span>}
                    <Tooltip id='request' content='Inquiry Letter' place='right' offset={-12} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                </Link>
                <Link className={`w-full flex laptop:justify-center mb-4 hp:p-1 gap-2 ${location.pathname === '/setting' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`}>
                    <AiOutlineSetting size={23} className='cursor-pointer' />
                    {sideBarMenu && <span>Setting</span>}
                </Link>
                <Link className={`w-full flex laptop:justify-center mb-8 hp:p-1 gap-2 ${location.pathname === '/security' ? 'text-purple border-r-2 border-purple' : 'text-grey border-r-2 border-white hover:text-purple/50 transition-colors duration-200'}`}>
                    <BiShieldQuarter size={23} className='cursor-pointer' />
                    {sideBarMenu && <span>Security</span>}
                </Link>
            </div>
            <div className='w-full flex laptop:justify-center mb-6 hp:p-1 gap-2' onClick={deleteToken}>
                <BsBoxArrowRight data-tooltip-id='logout' size={23} className='cursor-pointer text-grey hover:text-purple/50 transition-colors duration-200' />
                {sideBarMenu && <span>Log Out</span>}
                <Tooltip id='logout' content='Logout' place='right' offset={10} style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
            </div>
        </div>
    )
}