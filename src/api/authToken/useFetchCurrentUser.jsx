import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useFetchCurrentUser = ({ userId }) => {
    const { data, refetch, isLoading } = useQuery({
        queryKey: ['dataUser'],
        queryFn: async () => {
            const userDataResponse = await axiosInstance.get(`user/by/${userId}`)

            return userDataResponse.data
        },
        enabled: !!userId
    })
    return {
        data,
        isLoading,
        refetch,
    }
}