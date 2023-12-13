import { FiUsers } from 'react-icons/fi'
import { useFetchAllUsers } from '../../../../../../api/fetchData/useFetchAllUsers';
const TotalEmployedBox = () => {
    const { data: users, isLoading, refetch: refetchDataUser } = useFetchAllUsers();
    return (
        <div className="laptop:w-2/6 hp:w-1/2 h-full flex flex-col justify-between bg-white rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>{users?.length}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <FiUsers size={20} color='purple' />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Total Employees</span>
            </div>
        </div>
    )
}
export default TotalEmployedBox