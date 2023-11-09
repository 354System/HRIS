import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useLeaveApplication = ({ onSuccess, onError }) => {
    const token = localStorage.getItem('authToken')
    return useMutation({
        mutationFn: async (body) => {
            const leaveApplicationResponse = await axiosInstance.post('/cuti/create', body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return leaveApplicationResponse.data
        },
        onSuccess,
        onError,
    })
}