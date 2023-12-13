import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useApprovalInquiryLetter = ({ id, onSuccess, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const approveResponse = await axiosInstance.patch(`/form/update/${id}`, body, {
                headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })

            return approveResponse
        },
        onSuccess,
        onError,
    })
}