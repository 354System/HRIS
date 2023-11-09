import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useInfoToken = () => {
    const token = localStorage.getItem('authToken')
    const { data, refetch, isSuccess, error, isError } = useQuery({
        queryKey: ['infoToken'],
        enabled: !!token,
        queryFn: async () => {
            const tokenResponse = await axiosInstance.get('/user/user-info', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return tokenResponse.data.user_info.id
        },
    })
    return {
        data,
        refetch,
        isError,
        error,
        isSuccess
    }
}