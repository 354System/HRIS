import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const usePurchaseInquiryEdit = ({ data, onSuccess, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const PurchaseInquiryEditResponse = await axiosInstance.patch(`/form/edit/${data._id}`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            return PurchaseInquiryEditResponse
        },
        onSuccess,
        onError
    })
}