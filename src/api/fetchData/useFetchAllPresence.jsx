import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchAllPresence = () => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allPresence'],
        queryFn: async () => {
            const userDataResponse = await axiosInstance.get('/absensi/all', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            })

            return userDataResponse.data
        },
    });
    return {
        data,
        isLoading,
        refetch,
    }
}