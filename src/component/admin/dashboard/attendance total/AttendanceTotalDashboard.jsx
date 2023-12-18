import { useEffect, useState } from "react"
import TADheader from "./table/TADheader"
import TADtable from "./table/TADtable"
import { useFetchAllReport } from "../../../../api/fetchData/useFetchAllReport"
import { subMonths } from "date-fns"

const TotalAttendanceDashboard = () => {
    const [currentPage, setCurrentPage] = useState({
        page: 'all',
    })
    const [startDate, setStartDate] = useState(subMonths(new Date(), 1)); // Default sebulan yang lalu
    const [endDate, setEndDate] = useState(new Date());

    const { data, refetch } = useFetchAllReport({ currentPage, startDate, endDate });
    console.log(data);

    return (
        <div className="w-full bg-white p-5 rounded-lg laptop:mb-40 hp:mb-20">
            <TADheader
                setStartDate={setStartDate}
                setEndDate={setEndDate}
                startDate={startDate}
                endDate={endDate}
                refetch={refetch} />
            <TADtable
                data={data}
            />
        </div>
    )
}

export default TotalAttendanceDashboard;
