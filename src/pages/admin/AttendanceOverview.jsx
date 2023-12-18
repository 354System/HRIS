import AOtable from "../../component/admin/attandance overview/table/AOtable"
import { Sidebarmenu } from "../../component/bar/Sidebarmenu"
import { Navbar } from "../../component/bar/Navbar"
import { useEffect, useRef, useState } from "react"
import AOTableHeader from "../../component/admin/attandance overview/component/AOTableHeader"
import { useFetchAllPresence } from "../../api/fetchData/useFetchAllPresence"
const AttendanceOverview = () => {
    const [sideBarMenu, setSideBarMenu] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [currentPage, setCurrentPage] = useState({
        page: 1,
        all: null,
        pageSearch: null,
        pageFilter: null
    })
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [filteredPresence, setFilteredPresence] = useState(null)

    const { data: presenceData, isLoading, refetch: refetchPresence } = useFetchAllPresence({
        currentPage,
        searchKeyword,
        startDate,
        endDate
    })

    presenceData?.absensis?.forEach(presence => {
        const checkIn = new Date(presence.checkin);
        const checkOut = new Date(presence.checkout);

        const workHoursResult = checkOut - checkIn;
        const hours = Math.floor(workHoursResult / 3600000);
        const minutes = Math.floor((workHoursResult % 3600000) / 60000);
        const workHours = `${hours}h ${minutes}m`;

        presence.workHours = workHours;
    });

    useEffect(() => {
        setFilteredPresence(presenceData?.absensi);
    }, [presenceData]);

    return (
        <div className="absolute bg-gray-300 min-h-screen w-full">
            <Sidebarmenu sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <Navbar sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
            <div className="w-full mt-28 mb-10 laptop:p-7 laptop:pl-28 hp:p-3">
                <AOTableHeader refetchPresence={refetchPresence} presenceData={presenceData} setFilteredPresence={setFilteredPresence} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} currentPage={currentPage} setCurrentPage={setCurrentPage} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
                <AOtable isLoading={isLoading} refetchPresence={refetchPresence} filteredPresence={filteredPresence} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={presenceData?.totalPages} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
            </div>
        </div>
    )
}
export default AttendanceOverview;