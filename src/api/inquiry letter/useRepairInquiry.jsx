import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useRepairInquiryEdit = ({ id, onSuccess, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const RepairInquiryEdit = await axiosInstance.patch(`/form/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })
            return RepairInquiryEdit
        },
        onSuccess,
        onError
    })
}