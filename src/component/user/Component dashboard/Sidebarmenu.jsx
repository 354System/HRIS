import { BsBoxArrowRight } from 'react-icons/bs'
import { PiSquaresFourFill } from 'react-icons/pi'
import { BiUser, BiShieldQuarter } from 'react-icons/bi'
import { MdShowChart, MdAddchart } from 'react-icons/md'
import { AiOutlineCalendar, AiOutlineSetting } from 'react-icons/ai'
import { LuNetwork } from 'react-icons/lu'
import { Link } from 'react-router-dom'

const SidebarmenuUser = () => {
    return (
        <div className="flex flex-col justify-between items-center w-16 h-full  bg-white py-4 shadow-lg rounded-lg">
            <div className='p-2'>
                <img src="/src/assets/Thinkspedia Main Logo 1.png" alt="" className="w-8 h-8" />
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <Link to={'/dashboard'}>
                <PiSquaresFourFill size={23} className={`cursor-pointer mb-5 w-full  ${location.pathname === '/dashboard' ? 'text-purple border-r-2 border-purple' : 'text-grey hover:text-primary'}`} />
                </Link>
                <Link to={'/userhistori'}>
                <BiUser size={23} className={`cursor-pointer mb-5 w-full ${location.pathname === '/userhistori' ? 'text-purple border-r-2 border-purple' : 'text-grey hover:text-primary'}`} />
                </Link>
                <MdShowChart size={23} className={`cursor-pointer mb-5 w-full ${location.pathname === '/report' ? 'text-purple border-r-2 border-purple' : 'text-grey hover:text-primary'}`} />
                <AiOutlineCalendar size={23} className={`cursor-pointer mb-5 w-full ${location.pathname === '/calendar' ? 'text-purple border-r-2 border-purple' : 'text-grey hover:text-primary'}`} />
                <LuNetwork size={23} className={`cursor-pointer mb-5 w-full ${location.pathname === '/admin/user' ? 'text-purple border-r-2 border-purple' : 'text-grey hover:text-primary'}`} />
                <MdAddchart size={23} className={`cursor-pointer mb-10 ${location.pathname === '/add' ? 'text-purple border-r-2 border-purple' : 'text-grey hover:text-primary'}`} />
                <AiOutlineSetting size={23} className={`cursor-pointer mb-5 w-full ${location.pathname === '/setting' ? 'text-purple border-r-2 border-purple' : 'text-grey hover:text-primary'}`} />
                <BiShieldQuarter size={23} className={`cursor-pointer w-full ${location.pathname === '/security' ? 'text-purple border-r-2 border-purple' : 'text-grey hover:text-primary'}`} />
            </div>
            <div className='p-2'>
                <BsBoxArrowRight size={23} className='cursor-pointer text-grey hover:text-primary' />
            </div>
        </div>
    )
}

export default SidebarmenuUser;