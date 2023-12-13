import { useEffect, useState } from "react"
import TADheader from "./table/TADheader"
import TADtable from "./table/TADtable"

const TotalAttendanceDashboard = ({ presenceData, permissionData, paidLeaveData }) => {
    const [filteredPresence, setFilteredPresence] = useState(null);
    const [filteredPermission, setFilteredPermission] = useState(null);
    const [filteredPaidLeave, setFilteredPaidLeave] = useState(null);

    useEffect(() => {
        // Hitung tanggal sebulan yang lalu
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);

        // Set tanggal awal (sebulan lalu) dan tanggal akhir (hari ini)
        const startDate = lastMonth;
        const endDate = new Date();

        // Filter data berdasarkan tanggal default
        const defaultPresence = presenceData?.filter((item) => {
            const itemDate = new Date(item.createdAt);
            return itemDate >= startDate && itemDate <= endDate;
        });

        const defaultPermission = permissionData?.filter((item) => {
            const itemDate = new Date(item.createdAt);
            return itemDate >= startDate && itemDate <= endDate;
        });

        const defaultPaidLeave = paidLeaveData?.filter((item) => {
            const itemDate = new Date(item.createdAt);
            return itemDate >= startDate && itemDate <= endDate;
        });

        // Setel hasil filter ke dalam state
        setFilteredPresence(defaultPresence);
        setFilteredPermission(defaultPermission);
        setFilteredPaidLeave(defaultPaidLeave);
    }, [presenceData, permissionData, paidLeaveData]);

    return (
        <div className="w-full bg-white p-5 rounded-lg laptop:mb-40 hp:mb-20">
            <TADheader 
            presenceData={presenceData}
            permissionData={permissionData} 
            paidLeaveData={paidLeaveData} 
            setFilteredPresence={setFilteredPresence} 
            setFilteredPermission={setFilteredPermission} 
            setFilteredPaidLeave={setFilteredPaidLeave}/>
            <TADtable 
            presence={filteredPresence} 
            permission={filteredPermission} 
            paidLeave={filteredPaidLeave} />
        </div>
    )
}

export default TotalAttendanceDashboard;
