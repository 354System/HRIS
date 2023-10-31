import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useCreateUser = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (body) => {
            const addProductResponse = await axiosInstance.post('/user/create', body)

            return addProductResponse
        },
        onSuccess,
        onError: (error) => {
            console.log(error)
        }
    })
}