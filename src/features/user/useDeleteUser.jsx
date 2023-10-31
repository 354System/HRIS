import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useDeleteUser = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (id) => {
            const deleteResponse = await axiosInstance.delete(`/user/delete/${id}`)

            return deleteResponse 
        },
        onSuccess,
        onError: (error) => {
            console.log(error)
        },
    })
}