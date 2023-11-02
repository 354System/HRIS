import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useLogin = ({ onSuccess, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const loginResponse = await axiosInstance.post('/user/login', body)

            return loginResponse.data
        },
        onSuccess,
        onError,
    })
}