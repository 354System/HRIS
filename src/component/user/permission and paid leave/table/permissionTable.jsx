import { format } from "date-fns"
import { usePermissionCurrentUser } from "../../../../api/fetchDataCurrentUser/useFetchPermission"
import { Spinner } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { Dropdown } from "flowbite-react";

const PermissionTableUser = ({ searchKeyword }) => {
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectDate, setSelectDate] = useState(false);

    const { data: permissionData } = usePermissionCurrentUser()

    function approvalStatus(approval) {
        if (approval === 'Approved') {
            return <td className=" text-center"><span className="text-green bg-green/10 p-2 font-semibold rounded text-sm">Approved</span></td>
        } else if (approval === 'Reject' || approval === 'Canceled') {
            return <td className=" text-center"><span className="text-red bg-red/10 p-2 font-semibold rounded text-sm">{approval === 'Reject' ? 'Reject' : 'Canceled'}</span></td>
        } else {
            return <td className=" text-center"><span className="text-yellow bg-yellow/10 p-2 font-semibold rounded text-sm">Wait For Response</span></td>
        }
    }

    const sortedData = useMemo(() => {
        let orderedData = permissionData;

        if (searchKeyword.trim() !== '') {
            orderedData = orderedData?.filter((item) => {
                return Object.values(item).some(value => {
                    if (typeof value === 'string') {
                        // If it's a string, check if it includes the searchKeyword
                        return value.toLowerCase().includes(searchKeyword.toLowerCase());
                    } else if (item.date) {
                        // If it's a date, format it to 'dd-MMMM-yyyy' and check for inclusion
                        const formattedDate = format(new Date(item.date), 'dd-MM-yyyy');
                        return formattedDate.toLowerCase().includes(searchKeyword.toLowerCase());
                    }
                    return false;
                });
            });
        }

        if (selectedStatus !== 'All') {
            const matchingStatusData = orderedData?.filter((item) => item.approval === selectedStatus);

            if (matchingStatusData.length > 0) {
                if (selectDate) {
                    // Jika selectDate true, urutkan dari terlama hingga terbaru
                    matchingStatusData?.sort((a, b) => new Date(a.date) - new Date(b.date));
                } else {
                    // Jika selectDate false, urutkan dari terbaru hingga terlama
                    matchingStatusData?.sort((a, b) => new Date(b.date) - new Date(a.date));
                }

                orderedData = [...matchingStatusData];
            } else {
                orderedData = [];
            }

        } else {
            if (selectDate) {
                // Jika selectDate true, urutkan dari terlama hingga terbaru
                orderedData?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            } else {
                // Jika selectDate false, urutkan dari terbaru hingga terlama
                orderedData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
        }

        return orderedData;
    }, [permissionData, searchKeyword, selectedStatus, selectDate]);

    return (
        <div className="laptop:mt-5 hp:mt-10 w-full h-96 text-center hp:overflow-x-auto">
            <table className="laptop:w-full hp:w-[600px]">
                <thead>
                    <tr className="border-b-4 border-t-2 text-grey text-center">
                        <th className="p-4">No</th>
                        <th className="flex items-center justify-center p-4 gap-1"><p onClick={() => setSelectDate(!selectDate)} className="cursor-pointer">Date</p>{selectDate ? <BsSortDown onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" /> : <BsSortUp onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" />}</th>
                        <th className="text-center">Reason</th>
                        <th className="">Start Date</th>
                        <th className="">End Date</th>
                        <th className="flex justify-center p-4">
                            <Dropdown label="Status" inline>
                                <Dropdown.Item className={`${selectedStatus === 'All' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => setSelectedStatus('All')}>All</Dropdown.Item>
                                <Dropdown.Item className={`${selectedStatus === 'Wait For Response' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Wait For Response')}>Wait For Response</Dropdown.Item>
                                <Dropdown.Item className={`${selectedStatus === 'Approved' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Approved')}>Approved</Dropdown.Item>
                                <Dropdown.Item className={`${selectedStatus === 'Reject' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Reject')}>Rejected</Dropdown.Item>
                                <Dropdown.Item className={`${selectedStatus === 'Canceled' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => setSelectedStatus('Canceled')}>Canceled</Dropdown.Item>
                            </Dropdown>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData?.map((data, index) => (
                        <tr key={index} className="border-b">
                            <td className="text-purple">{index + 1}</td>
                            <td className="text-primary p-4 laptop:max-w-[90px]">{format(new Date(data.createdAt), 'dd-MM-yyyy')}</td>
                            <td className="text-primary hp:max-w-[90px]">{data.izin}</td>
                            <td className="text-purple ">{data.fromdate ? format(new Date(data.fromdate), 'dd-MM-yyyy') : '-'}</td>
                            <td className="text-purple">{data.untildate ? format(new Date(data.untildate), 'dd-MM-yyyy') : '-'}</td>
                            {approvalStatus(data.approval)}
                        </tr>
                    ))}
                    {sortedData?.length === 0 && <tr><td className="p-4 laptop:text-center hp:text-left text-lg font-semibold" colSpan={6}>Data Not Available</td></tr>}
                    {permissionData === undefined && <tr><td className="laptop:text-center hp:text-start" colSpan={6}><Spinner size={'lg'} color="purpler" /></td></tr>}
                </tbody>
            </table>
        </div>
    )
}
export default PermissionTableUser