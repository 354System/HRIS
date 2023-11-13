import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useEditUser = ({ onSuccess, onError, userId }) => {
    return useMutation({
        mutationFn: async (body) => {
            const addProductResponse = await axiosInstance.patch(`/user/update/${userId}`, body)

            return addProductResponse
        },
        onSuccess,
        onError
    })
}