import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useCreateUser = ({ onSuccess, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const addProductResponse = await axiosInstance.post('/user/create', body)

            return addProductResponse
        },
        onSuccess,
        onError,
    })
}