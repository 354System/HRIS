import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"
import { useAuthInfo } from "../../use context/useAuthInfo";

export const useFetchAllInquiryLetterCurrentUser = () => {
    const { userData } = useAuthInfo();
    const userId = userData?._id

    const { data, isLoading, refetch, isError, error } = useQuery({
        queryKey: ['allInquiryLetterCurrentUser'],
        queryFn: async () => {
            const userDataResponse = await axiosInstance.get(`/form/by/${userId}`)

            return userDataResponse.data
        },
        enabled: !!userId
    });
    return {
        data,
        isLoading,
        isError,
        error,
        refetch
    }
}