import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useApprovalPermission = ({ id, onSuccess, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const permissionResponse = await axiosInstance.patch(`/izin/approved/${id}`, body)

            return permissionResponse.data
        },
        onSuccess,
        onError,
    })
}