import { useState, useMemo, useEffect } from "react";
import Pagination from "../filtering/pagination";
import { format } from "date-fns";
import { Spinner } from "@chakra-ui/react";
import { Dropdown } from "flowbite-react";
const AOtable = ({ isLoading, setSearchKeyword, filteredPresence: presenceData, currentPage, setCurrentPage, totalPages, refetchPresence }) => {
    const [selectDate, setSelectDate] = useState(false);

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
        if (item.type === 'Absent') {
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

    const handleStatus = async (status) => {
        await setSearchKeyword(status);
        await setCurrentPage({
            page: null,
            all: null,
            pageSearch: totalPages === 0 ? 0 : 1,
            pageFilter: null
        })
        await refetchPresence()
    }

    const handleArrival = async (arrival) => {
        await setSearchKeyword(arrival);
        await setCurrentPage({
            page: null,
            all: null,
            pageSearch: totalPages === 0 ? 0 : 1,
            pageFilter: null
        })
        await refetchPresence()
    }

    return (
        <div className="mt-10 bg-white w-full h-full p-5 rounded-lg overflow-x-auto">
            <table className="laptop:w-[1300px] hp:w-[1300px] bg-white ">
                <thead>
                    <tr className="bg-gray-200 text-primary text-center">
                        <th className="p-4">No</th>
                        <th className="text-start">Employee</th>
                        <th>Role</th>
                        <th>Departement</th>
                        <th>Date</th>
                        <th className="flex justify-center p-4">
                            <Dropdown label="Status" inline>
                                <Dropdown.Item onClick={() => handleStatus('')}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleStatus('Work From Office')}>Work From Office</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleStatus('Work From Home')}>Work From Home</Dropdown.Item>
                            </Dropdown>
                        </th>
                        <th>
                            <Dropdown label="Arrival" inline>
                                <Dropdown.Item onClick={() => handleArrival('')}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleArrival('Present')}>On Time</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleArrival('Late')}>Late</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleArrival('Absent')}>Absent</Dropdown.Item>
                            </Dropdown>
                        </th>
                        <th>Check-In</th>
                        <th>Check-Out</th>
                        <th>Work Hours</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {presenceData &&
                        presenceData.map((item, index) => (
                            <tr key={index} className={index % 2 === 1 ? "text-center bg-gray-100  border-b" : "text-center border-b"}>
                                <td className="text-center p-4">{index + 1}</td>
                                <td className="text-primary text-start">{item.user?.name}</td>
                                <td className="text-primary">{item.user?.divisi}</td>
                                <td className=" text-primary text-center">{item.user?.position}</td>
                                <td className=" text-primary">{format(new Date(item.date), 'dd-MM-yyyy')}</td>
                                <td className="">
                                    <span className={`p-2 text-sm ${statusStyle(item)}`}>{item.absen}</span>
                                </td>
                                <td className="text-start">
                                    <span className={`p-2 text-sm ${arrivalStyle(item)}`}>{item.type === 'Present' ? 'On Time' : item.type}</span>
                                </td>
                                <td className={`text-center ${checkInStyle(item)}`}>{item.checkin ? format(new Date(item.checkin), 'HH:mm') : '-:-:-'}</td>
                                <td className="text-purple text-center">{item.checkout ? format(new Date(item.checkout), 'HH:mm') : '-:-:-'}</td>
                                <td className="text-primary text-center">{item.workHours === 'NaNh NaNm' ? '-' : item.workHours}</td>
                                {/* tampilan img jika url sudah online */}
                                {/* <td className="text-center"><img src={item.file} alt="" className="w-10 h-10"/></td> */}
                            </tr>
                        ))}
                    {isLoading ?
                        <p className="absolute left-1/2"><Spinner color="purple" size={'sm'} /></p>
                        :
                        presenceData?.length === 0 && <p className="absolute left-1/2 text-lg font-semibold">No Data Available</p>
                    }
                </tbody>
            </table>
            <Pagination setSearchKeyword={setSearchKeyword} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    )
}
export default AOtable