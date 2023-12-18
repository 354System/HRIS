import { format } from "date-fns";
import { usePresenceCurrentUser } from "../../../../api/fetchDataCurrentUser/useFetchPresence";
import { Spinner } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { Dropdown, Flowbite } from "flowbite-react";
import { flowbiteTheme } from "../../../../lib/flowbiteTheme";
import { BsSortDown, BsSortUp } from "react-icons/bs";

const AttendanceBody = ({ searchKeyword, filteredPresence: presenceData }) => { 
    const [selectedArrival, setSelectedArrival] = useState('All');
    const [selectDate, setSelectDate] = useState(false);

    const sortedData = useMemo(() => {
        let orderedData = [];
        if (presenceData) {
            orderedData = presenceData
        }

        if (searchKeyword.trim() !== '') {
            orderedData = orderedData?.filter((item) => {
                const propertiesToSearch = ['user', 'absen', 'date', 'checkin', 'checkout'];

                return propertiesToSearch.some(property => {
                    const value = item[property];
                    if (value instanceof Date) {
                        // If it's a date, format it to 'dd-MM-yyyy' for comparison
                        const formattedDate = format(value, 'dd-MM-yyyy');
                        return formattedDate.toLowerCase().includes(searchKeyword.toLowerCase());
                    } else if (typeof value === 'string') {
                        return value.toLowerCase().includes(searchKeyword.toLowerCase());
                    } else {
                        return false;
                    }
                });
            });
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

    function checkInStyle(data) {
        if (data.absen === 'Absent') {
            return 'text-[#AA0000]';
        } else if (data.absen === 'Work from Office' || data.type === 'Late') {
            return 'text-yellow';
        } else {
            return 'text-purple';
        }
    }

    function arrivalStyle(data) {
        if (data.absen === 'Absent') {
            return 'bg-red-100 text-[#AA0000]';
        } else if (data.type === 'Present') {
            return 'text-purple bg-[#E6EFFC]';
        } else if (data.type === 'Late') {
            return 'text-[#D5B500] bg-[#FFF8E7]';
        } else {
            return 'bg-[#E6EFFC] text-purple';
        }
    }

    function statusStyle(data) {
        if (data.absen === 'Work From Office') {
            return 'bg-purple/80 text-white p-2'
        } else if (data.absen === 'Work From Home') {
            return 'bg-yellow/80 text-white p-2'
        }
    }
    
    return (
        <div className="w-full hp:overflow-x-auto mt-5">
            <table className="laptop:w-full hp:w-[1000px] laptop:rounded-lg hp:rounded">
                <thead>
                    <tr className="border-t-2 border-b-2 text-center">
                        <th className="p-4">No</th>
                        <th className="flex justify-center items-center p-4 gap-1"><p onClick={() => setSelectDate(!selectDate)} className="cursor-pointer">Date</p>{selectDate ? <BsSortDown onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" /> : <BsSortUp onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" />}</th>
                        <th className="text-center">Status</th>
                        <th className="p-4 flex justify-center">
                            <Flowbite theme={{ theme: flowbiteTheme }}>
                                <Dropdown label="Arrival" inline>
                                    <Dropdown.Item className={`w-40 ${selectedArrival === 'All' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => setSelectedArrival('All')}>All</Dropdown.Item>
                                    <Dropdown.Item className={`${selectedArrival === 'Present' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedArrival('Present')}>On Time</Dropdown.Item>
                                    <Dropdown.Item className={`${selectedArrival === 'Late' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedArrival('Late')}>Late</Dropdown.Item>
                                    <Dropdown.Item className={`${selectedArrival === 'Absent' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedArrival('Absent')}>Absent</Dropdown.Item>
                                </Dropdown>
                            </Flowbite>
                        </th>
                        <th className="">Check-In</th>
                        <th className="">Check-Out</th>
                        <th className="">Work hours</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData && sortedData?.map((data, index) => (
                        <tr key={index} className='border-b text-center'>
                            <td>{index + 1}</td>
                            <td className=" p-4 max-w-[90px]">{format(new Date(data.createdAt), 'dd-MM-yyyy')}</td>
                            <td><span className={`${statusStyle(data)} p-2`}>{data.absen}</span></td>
                            <td><span className={`${arrivalStyle(data)} p-2`}>{data.type === 'Present' ? 'On Time' : data.type}</span></td>
                            <td className={`${checkInStyle(data)}`}>{data.checkin ? format(new Date(data.checkin), 'HH:mm') : '-:-:-'}</td>
                            <td className="text-purple text-lg">{data.checkout ? format(new Date(data.checkout), 'HH:mm') : '-:-:-'}</td>
                            <td className="text-primary">{data.workHours === 'NaNh NaNm' ? '-' : data.workHours}</td>
                        </tr>
                    ))}
                    {presenceData === undefined ?
                        <tr><td className="text-center" colSpan={7}><Spinner color="purple" size="sm" /></td></tr>
                        :
                        sortedData.length === 0 && <tr><td className="text-center" colSpan={7}>Data Not Available</td></tr>
                    }
                </tbody>
            </table>
        </div >
    )
}
export default AttendanceBody;