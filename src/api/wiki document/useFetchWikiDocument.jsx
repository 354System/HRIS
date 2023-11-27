import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export const useFetchWikiDocument = () => {
    const { data, isLoading, refetch, isError } = useQuery({
        queryKey: ['wiki'],
        queryFn: async () => {
            const wikiDocumentResponse = await axiosInstance.get('/dokumen/all')

            return wikiDocumentResponse.data
        }
    })
    return {
        data,
        isLoading,
        refetch,
        isError
    }
}