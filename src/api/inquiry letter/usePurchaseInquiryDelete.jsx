import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useInquiryDelete = ({onSuccess, onError}) => {
    return useMutation({
        mutationFn: async (id) => {
            const InquiryDeleteResponse = await axiosInstance.delete(`/form/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            return InquiryDeleteResponse
        },
        onSuccess,
        onError
    })
}