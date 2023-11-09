import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchAllPaidLeave = () => {
    const auth = localStorage.getItem("authToken")
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['allPaidLeave'],
        queryFn: async () => {
            const leaveDataResponse = await axiosInstance.get('/cuti/all', {
                headers: {
                    'Authorization': `Bearer ${auth}`
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