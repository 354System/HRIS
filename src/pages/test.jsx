import { useState } from "react";
import { useFetchAllPaidLeave } from "../api/fetchData/useFetchAllPaidLeave";
import { useFetchAllPermission } from "../api/fetchData/useFetchAllPermission";
import { useFetchAllPresence } from "../api/fetchData/useFetchAllPresence"
import { useFetchAllReport } from "../api/fetchData/useFetchAllReport";
import { useFetchAllInquiryLetter } from "../api/fetchData/useFetchAllInquiryLetter";

const Tes = () => {
    const [currentPage, setCurrentPage] = useState({
        paidLeave: {
            page: 1,
            all: null,
            pageSearch: null,
            pageFilter: null
        },
        permission: {
            page: 0,
            all: null,
            pageSearch: null,
            pageFilter: null
        }
    })
    const [searchKeyword, setSearchKeyword] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const { data: paidLeaveData, refetch: refetchDataPaidLeave } = useFetchAllPaidLeave({ currentPage: currentPage.paidLeave, searchKeyword, startDate, endDate });
    const { data: reportData, refetch: refetchDataPermission } = useFetchAllReport({ currentPage: currentPage.permission, searchKeyword, startDate, endDate });    
    console.log('p', reportData);

    return(
        <div>kocak</div>
    )
}
export default Tes