import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchAllReport = ({ currentPage, searchKeyword, startDate, endDate }) => {

    const { data, isLoading, refetch, isSuccess } = useQuery({
        queryKey: currentPage ? ['allPresence', { page: currentPage }] : ['allPresence', { page: 'all' }],
        queryFn: async () => {
            const userDataResponse = await axiosInstance.get('/absensi/history', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                params: {
                    keyword: searchKeyword,
                    startDate: startDate,
                    endDate: endDate,
                    page: currentPage.all || currentPage.pageSearch || currentPage.pageFilter || currentPage.page || 'all',
                }
            });
            return userDataResponse.data
        },
    });
    return {
        data,
        isLoading,
        refetch,
    }
}