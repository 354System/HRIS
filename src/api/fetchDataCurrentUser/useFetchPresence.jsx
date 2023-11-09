import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios";
import { useAuthInfo } from "../../use context/useAuthInfo";

export const usePresenceCurrentUser = () => {
    const { userData } = useAuthInfo();
    const userId = userData?._id
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['presence current user'],
        enabled: !!userId,
        queryFn: async () => {
            const userDataResponse = await axiosInstance.get(`absensi/by/${userId}`)

            return userDataResponse.data
        },
    });
    return {
        data,
        isLoading,
        refetch,
    }
};
