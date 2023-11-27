import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchAllPaidLeave = () => {
    const authToken = localStorage.getItem("authToken")
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allPaidLeave'],
        queryFn: async () => {
            const leaveDataResponse = await axiosInstance.get('/cuti/all', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
            return leaveDataResponse.data
        },
    });
    return {
        data,
        isLoading,
        refetch
    }
}