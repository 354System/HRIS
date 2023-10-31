import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query"
export const useDataUser = ({ searchUser }) => {
    const { data, isLoading, refetch } = useQuery({
        queryFn: async () => {
            const userDataResponse = await axiosInstance.get('/user/all',
                {
                    params: {
                        search: searchUser
                    }
                }
            )
            return userDataResponse.data
        },
    })
    return {
        data,
        isLoading,
        refetch,
    }
}