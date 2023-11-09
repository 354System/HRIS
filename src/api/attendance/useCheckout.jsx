import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"


export const useCheckOut = (id, { onSuccess, onError }) => {
    return useMutation({
        mutationFn: async (body) => {
            const checkoutResponse = await axiosInstance.patch(`/absensi/checkout/${id}`, body)

            return checkoutResponse
        },
        onSuccess,
        onError
    })
}