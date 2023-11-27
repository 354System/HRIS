import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios";
import { useAuthInfo } from "../../use context/useAuthInfo";

export const usePermissionCurrentUser = () => {
    const { userData } = useAuthInfo();
    const userId = userData?._id
    const { data, isLoading, refetch, isError, error } = useQuery({
        queryKey: ['permission current user'],
        enabled: !!userId,
        queryFn: async () => {
            const userDataResponse = await axiosInstance.get(`izin/by/${userId}`)
            
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
};
