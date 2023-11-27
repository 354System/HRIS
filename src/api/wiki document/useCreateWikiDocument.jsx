import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useCreateWikiDocument = ({ onSuccess, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const addProductResponse = await axiosInstance.post('/dokumen/file', body)

            return addProductResponse
        },
        onSuccess,
        onError,
    })
}