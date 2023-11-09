import { Spinner } from "@chakra-ui/react"

export const LoadingScreen = () => {
    return (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex flex-col justify-end items-center'>
            <img src="src/assets/WhatsApp_Image_2023-11-02_at_11.04.52-removebg-preview.png" alt="" className='w-64 h-12 animate-pulse' />
            <h2 className="mb-2 text-center text-primary font-semibold">Loading</h2>
            <Spinner color="purple" size="md" />
        </div>
    )
}