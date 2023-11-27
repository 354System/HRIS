import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const usePurchaseInquiryLetter = ({ onSuccess, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const PurchaseInquiryLetterResponse = await axiosInstance.post('/form/create/purchase', body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            return PurchaseInquiryLetterResponse
        },
        onSuccess,
        onError
    })
}