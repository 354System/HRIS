import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useFetchAllInquiryLetter = () => {
    const { data, isLoading, refetch, isError } = useQuery({
        queryKey: ['allInquiryLetter'],
        queryFn: async () => {
            const inquiryLetterResponse = await axiosInstance.get('/form/all',{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            return inquiryLetterResponse.data
        },
    })
    return {
        data,
        isLoading,
        refetch,
        isError
    }
}