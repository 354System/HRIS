import { useState, useMemo } from "react";
import Pagination from "../filtering/pagination";
import { format } from "date-fns";
import { Spinner } from "@chakra-ui/react";
const AOtable = ({ isLoading, searchKeyword, setSearchKeyword, filteredPresence: presenceData, currentPage, setCurrentPage, totalPages }) => {
    const [selectedArrival, setSelectedArrival] = useState('All');
    const [selectDate, setSelectDate] = useState(false);

    const sortedData = useMemo(() => {
        let orderedData = [];
        if (presenceData) {
            orderedData = presenceData
        }

        if (selectedArrival !== 'All') {
            const matchingStatusData = orderedData?.filter((item) => item.type === selectedArrival);

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
                orderedData?.sort((a, b) => new Date(a.date) - new Date(b.date));
            } else {
                // Jika selectDate false, urutkan dari terbaru hingga terlama
                orderedData?.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
        }

        return orderedData;
    }, [presenceData, searchKeyword, selectedArrival, selectDate]);

    function checkInStyle(item) {
        if (item.absen === 'Absent') {
            return 'text-[#AA0000]';
        } else if (item.absen === 'Work from Office' || item.type === 'Late') {
            return 'text-yellow';
        } else {
            return 'text-purple';
        }
    }

    function arrivalStyle(item) {
        if (item.absen === 'Absent') {
            return 'bg-red-100 text-[#AA0000]';
        } else if (item.type === 'Present') {
            return 'text-purple bg-[#E6EFFC]';
        } else if (item.type === 'Late') {
            return 'text-[#D5B500] bg-[#FFF8E7]';
        } else {
            return 'bg-[#E6EFFC] text-purple';
        }
    }

    function statusStyle(item) {
        if (item.absen === 'Work From Office') {
            return 'bg-purple/80 text-white p-2'
        } else if (item.absen === 'Work From Home') {
            return 'bg-yellow/80 text-white p-2'
        }
    }

    return (
        <div className="mt-10 bg-white w-full h-full p-5 rounded-lg overflow-x-auto">
            <table className="laptop:w-full hp:w-[1000px] bg-white ">
                <thead>
                    <tr className="bg-gray-200 text-primary text-center">
                        <th className="p-4">No</th>
                        <th className="text-start">Employee</th>
                        <th>Role</th>
                        <th>Departement</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Work Hours</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData &&
                        sortedData.map((item, index) => (
                            <tr key={index} className={index % 2 === 1 ? "text-center bg-gray-100  border-b" : "text-center border-b"}>
                                <td className="text-center p-4">{index + 1}</td>
                                <td className="text-primary text-start">{item.user?.name}</td>
                                <td className="text-primary">{item.user?.divisi}</td>
                                <td className=" text-primary text-center">{item.user?.position}</td>
                                <td className=" text-primary">{format(new Date(item.date), 'dd-MM-yyyy')}</td>
                                <td className="">
                                    <span className={`p-2 text-sm ${statusStyle(item)}`}>{item.absen}</span>
                                </td>
                                <td className={`text-center ${checkInStyle(item)}`}>{item.checkin ? format(new Date(item.checkin), 'HH:mm') : '-:-:-'}</td>
                                <td className="text-purple text-center">{item.checkout ? format(new Date(item.checkout), 'HH:mm') : '-:-:-'}</td>
                                <td className="text-primary text-center">{item.workHours === 'NaNh NaNm' ? '-' : item.workHours}</td>
                            </tr>
                        ))}
                    { isLoading ?
                        <tr><td className="absolute left-1/2"><Spinner color="purple" size="sm" /></td></tr>
                        :
                        sortedData.length === 0 && <tr><td className="text-center" colSpan={7}>Data Not Available</td></tr>
                    }
                </tbody>
            </table>
            <Pagination setSearchKeyword={setSearchKeyword} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}
export default AOtable