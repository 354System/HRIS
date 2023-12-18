import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchAllPaidLeave = ({ currentPage, searchKeyword, startDate, endDate }) => {
    const authToken = localStorage.getItem("authToken")
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allPaidLeave', { page: currentPage }],
        queryFn: async () => {
            const leaveDataResponse = await axiosInstance.get('/cuti/all', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                params: {
                    keyword: searchKeyword,
                    startDate: startDate,
                    endDate: endDate,
                    page: currentPage.all || currentPage.pageSearch || currentPage.pageFilter || currentPage.page || 'all',
                }

            })
            return leaveDataResponse.data
        },
    });
    return {
        data,
        isLoading,
        refetch
    }
}