import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query"

//mengambil data user dari api menggunakan react query(useQuery) dan axios
export const useDataUser = () => {
    const { data, isLoading, refetch } = useQuery({
        queryFn: async () => {
            const userDataResponse = await axiosInstance.get('/user/all')

            return userDataResponse.data
        },
    })
    return {
        data,
        isLoading,
        refetch,
    }
}