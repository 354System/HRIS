import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useRepairInquiryLetter = ({ onSuccess, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const RepairInquiryLetterResponse = await axiosInstance.post('/form/create/repair', body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            return RepairInquiryLetterResponse
        },
        onSuccess,
        onError
    })
}