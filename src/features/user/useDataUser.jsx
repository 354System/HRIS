import { useState, useEffect } from "react";
import { axiosInstance } from "../../lib/axios";
import { useQuery } from "@tanstack/react-query"
export const useDataUser = () => {
    const { data, isLoading } = useQuery({
        queryFn: async () => {
            const userDataResponse = await axiosInstance.get('/user/all')

            return userDataResponse.data
        }
    })
    return {
        data,
        isLoading
    }
}