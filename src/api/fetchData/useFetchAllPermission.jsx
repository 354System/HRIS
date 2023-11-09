import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useFetchAllPermission = () => {
    const authToken = localStorage.getItem("authToken")
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allPermission'],
        queryFn: async () => {
            const permissionDataResponse = await axiosInstance.get('/izin/all', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
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