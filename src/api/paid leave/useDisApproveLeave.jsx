import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useDisApproveLeave = ({ onSuccess, id }) => {
    return useMutation({
        mutationFn: async (body) => {
            const approveResponse = await axiosInstance.patch(`/cuti/approved/${id}`, body)

            return approveResponse
        },
        onSuccess,
        onError: (error) => {
            console.log(error)
        },
    });
}