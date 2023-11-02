import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useInfoToken = () => {
    const token = localStorage.getItem('authToken')
    const { data, refetch } = useQuery({
        queryFn: async () => {
            const tokenResponse = await axiosInstance.get('/user/user-info', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return tokenResponse.data.user_info.id
        },
        enabled: !!token
    })
    return {
        data,
        refetch,
    }
}