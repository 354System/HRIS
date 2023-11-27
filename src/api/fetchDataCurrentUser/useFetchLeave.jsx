import { useQuery } from "@tanstack/react-query";
import { useAuthInfo } from "../../use context/useAuthInfo";
import { axiosInstance } from "../../lib/axios";

export const useLeaveCurrentUser = () => {
    const { userData } = useAuthInfo();
    const userId = userData?._id
    const { data, isLoading, refetch, isError, error } = useQuery({
        queryKey: ['leave current user'],
        enabled: !!userId,
        queryFn: async () => {
            const userDataResponse = await axiosInstance.get(`cuti/by/${userId}`)

            return userDataResponse.data
        },
    });
    return {
        data,
        isLoading,
        isError,
        error,
        refetch
    }
}