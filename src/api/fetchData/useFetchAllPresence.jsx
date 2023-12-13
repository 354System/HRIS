import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchAllPresence = ({ currentPage, searchKeyword, startDate, endDate }) => {


    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allPresence', { page: currentPage }],
        queryFn: async () => {
            const userDataResponse = await axiosInstance.get('/absensi/all', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                params: {
                    keyword: searchKeyword,
                    startDate: startDate,
                    endDate: endDate,
                    page: currentPage.all || currentPage.pageSearch || currentPage.pageFilter || currentPage.page
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