import { Spinner } from "@chakra-ui/react";
import { useApproveLeave } from "../../../../api/paid leave/useApproveLeave";

const ApproveLeave = ({id, refetchDataPaidLeave, approvePopUp}) => {

    const {mutate, isPending} = useApproveLeave({
        id: id,
        onSuccess: () => {
            refetchDataPaidLeave();
            approvePopUp(false);
        }
    })

    const handleApprove = () => {
        mutate({
            approval: 'Approved'
        })
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 flex items-center justify-center z-20 bg-black/5 w-full h-full">
            <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 w-[430px] h-[200px] rounded-lg flex flex-col">
                <h1 className="text-center text-black font-semibold">Are You Sure To Approve?</h1>
                <div className="flex mt-20 px-10 gap-x-20 items-center justify-center">
                    <button onClick={() => approvePopUp(false)} className="bg-red w-[100px] h-[40px] text-center text-white font-semibold hover:bg-red/50">No</button>
                    <button onClick={handleApprove} className="flex items-center justify-center bg-green w-[100px] h-[40px] text-center text-white font-semibold hover:bg-green/50">{isPending ? <Spinner size={10} /> : "Yes"}</button>
                </div>
            </div>
        </div>
    )
}
export default ApproveLeave;