import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useFetchAllPermission = ({ currentPage, searchKeyword, startDate, endDate }) => {
    const authToken = localStorage.getItem("authToken")
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allPermission'],
        queryFn: async () => {
            const permissionDataResponse = await axiosInstance.get('/izin/all', {
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
            return permissionDataResponse.data
        },
    });
    return {
        data,
        isLoading,
        refetch
    }
}