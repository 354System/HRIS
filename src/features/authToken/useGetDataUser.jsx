import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"
import { useAuthInfo } from "../../use context/useAuthInfo"

export const useGetDataUser = ({ userId }) => {
    const id = userId
    const { data, refetch, isLoading } = useQuery({
        queryFn: async () => {
            const userDataResponse = await axiosInstance.get(`user/by/${userId}`)

            return userDataResponse.data
        },
        enabled: !!id
    })
    return {
        data,
        isLoading,
        refetch,
    }
}