import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useCreateWikiDocument = ({ onSuccess, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const addProductResponse = await axiosInstance.post('/dokumen/create', body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            })

            return addProductResponse
        },
        onSuccess,
        onError,
    })
}