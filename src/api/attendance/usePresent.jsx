import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"
export const usePresent = ({ onSuccess, onError }) => {
    const token = localStorage.getItem('authToken')
    return useMutation({
        mutationFn: async (body) => {
            const loginResponse = await axiosInstance.post('/absensi/create', body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return loginResponse.data
        },
        onSuccess,
        onError,
    })
}