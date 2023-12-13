import { Icon } from '@iconify/react';
import { format } from 'date-fns';
const LateBoxUser = ({ data }) => {

    const lateDataInMonth = data ?
        data.filter((item) => {
            const now = format(new Date(), 'yyyy-MM') === format(new Date(item.date), 'yyyy-MM');
            return item.type === 'Late' && now;
        })
        : [];

    return (
        <div className="laptop:w-2/6 hp:w-1/2 h-full flex flex-col bg-white justify-between rounded p-5">
            <div className="flex justify-between items-center">
                <div className='text-3xl font-bold text-primary'>
                    <span>{lateDataInMonth.length > 0 ? lateDataInMonth.length : 0}</span>
                </div>
                <div className='rounded-full bg-[#E6EAF5] w-10 h-10 flex items-center justify-center'>
                    <Icon icon="pajamas:time-out" className='text-purple' fontSize={20} />
                </div>
            </div>
            <div>
                <span className="text-base text-primary font-bold">Late </span>
            </div>
        </div>
    )
}

export default LateBoxUser;