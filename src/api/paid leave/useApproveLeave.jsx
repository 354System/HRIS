import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios";

export const useApprovalPaidLeave = ({ onSuccess, onError, id }) => {
    return useMutation({
        mutationFn: async (body) => {
            const approveResponse = await axiosInstance.patch(`/cuti/approved/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })

            return approveResponse
        },
        onSuccess,
        onError : (error) => {
            console.log(error)
        },
    });
}