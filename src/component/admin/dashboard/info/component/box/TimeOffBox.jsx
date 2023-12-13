import { Icon } from '@iconify/react';
import { useFetchAllPaidLeave } from '../../../../../../api/fetchData/useFetchAllPaidLeave';
import { useFetchAllPermission } from '../../../../../../api/fetchData/useFetchAllPermission';
const TimeOffBox = () => {
    const { data: paidLeaveData, refetch: refetchDataPaidLeave } = useFetchAllPaidLeave();
    const { data: permissionData, refetch: refetchDataPermission } = useFetchAllPermission();
    const timeOffLength = (paidLeaveData?.length || 0) + (permissionData?.length || 0);
    return (
        <div className="laptop:w-2/6 hp:w-1/2 h-full flex flex-col justify-between bg-white rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>{timeOffLength}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <Icon icon="fluent-mdl2:date-time-12" fontSize={20} className='text-purple' />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Time-Off</span>
            </div>
        </div>
    )
}
export default TimeOffBox;