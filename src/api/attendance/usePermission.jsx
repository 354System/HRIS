import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const usePermission = ({ onSuccess, onError }) => {
    const token = localStorage.getItem('authToken')
    return useMutation({
        mutationFn: async (body) => {
            const permissionResponse = await axiosInstance.post('/izin/create', body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return permissionResponse.data
        },
        onSuccess,
        onError,
    })
}