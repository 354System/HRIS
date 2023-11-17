import { Icon } from '@iconify/react';
import { useState } from 'react';
import DeviceRepair from '../popup/device repair';
const RepairDeviceBox = () => {

    const [repair, SetRepair] = useState(false);

    const handleAdd = () => {
        SetRepair(true);
    }


    return (
        <div className=" 2xl:w-80 w-[250px] h-[134px] flex flex-col bg-[#A332C3] justify-justify-start rounded p-5 cursor-pointer" onClick={handleAdd}>
            <div className="flex justify-justify-start items-center">
                <div className='rounded-full bg-[#E6EAF5]/40 w-10 h-10 flex items-center justify-center'>
                    <Icon icon="solar:document-medicine-linear" color="white" width="27" />
                </div>
            </div>
            <div className='mt-2 flex flex-col gap-y-2 '>
                <span className="text-base text-white font-semibold">Create a Form</span>
                <span className=" text-white font-semibold text-xs">Bantuan Perbaikan Device Kerja </span>
            </div>
            {repair ? <DeviceRepair SetRepair={SetRepair} /> : null}
        </div>

    )
}

export default RepairDeviceBox;