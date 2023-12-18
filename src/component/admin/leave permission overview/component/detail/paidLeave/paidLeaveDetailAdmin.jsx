import { format } from "date-fns"
import { Button, Datepicker, Flowbite, Spinner, TextInput, Textarea } from "flowbite-react"
import { BsCalendar2DateFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { GrDocumentText } from "react-icons/gr"
import { IoIosCheckmarkCircle, IoMdClose } from "react-icons/io"
import { MdCancel, MdOutlineDocumentScanner } from "react-icons/md"
import { useState } from "react"
import { useApprovalInquiryLetter } from "../../../../../../api/inquiry letter/useApproveRejectInquiryLetter"
import { confirmAlert, successAlert } from "../../../../../../lib/sweetAlert"
import { flowbiteTheme } from "../../../../../../lib/flowbiteTheme"
import { useApprovalPaidLeave } from "../../../../../../api/paid leave/useApproveLeave"

const PaidLeaveDetailAdmin = ({ data, setDetailModal, refetchPaidLeaveData }) => {
    const [errorMsg, setErrorMsg] = useState("")

    function approvalStatus(approval) {
        if (approval === 'Approved') {
            return <div>Status : <span className="text-green bg-green/10 p-2 font-semibold rounded text-sm">Approved</span></div>
        } else if (approval === 'Rejected' || approval === 'Canceled') {
            return <div>Status : <span className="text-red bg-red/10 p-2 font-semibold rounded text-sm">{approval === 'Rejected' ? 'Rejected' : 'Canceled'}</span></div>
        } else if (approval === 'Wait For Response') {
            return <div className="font-semibold">Status : <span className="text-yellow bg-yellow/10 p-2 font-semibold rounded text-sm">Wait For Response</span></div>
        } else {
            return <div>Status : <span className="text-yellow bg-yellow/10 p-2 font-semibold rounded text-sm">Pending</span></div>
        }
    }

    const { mutate, isPending } = useApprovalPaidLeave({
        id: data?._id,
        onSuccess: (data) => {
            refetchPaidLeaveData();
            console.log(data);
            successAlert({
                title: 'Successfully Approved',
            })
        },
        onError: (error) => {
            console.log(error);
            errorAlert({
                title: 'Something went wrong',
            })
        }
    })

    const handleApprove = (data) => {
        confirmAlert({
            title: "Are you sure want to Approve this request?",
            text: `${data.cuti} from ${format(new Date(data.fromdate), 'dd-MM-yyyy')} to ${format(new Date(data.untildate), 'dd-MM-yyyy')} will be approved and cannot be undone !`,
            confirmText: "Yes, Approve It !"
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({
                    approval: 'Approved',
                })
            }
        })
    }

    const handleReject = (data) => {
        confirmAlert({
            title: "Are you sure want to Reject this request?",
            text: `${data.cuti} from ${format(new Date(data.fromdate), 'dd-MM-yyyy')} to ${format(new Date(data.untildate), 'dd-MM-yyyy')} will be rejected and cannot be undone !`,
            confirmText: "Yes, Reject It !",
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({
                    approval: 'Rejected',
                })
            }
        })
    }

    if (isPending) {
        pendingAlert({
            title: 'Loading...'
        })
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 bg-black/60 w-full h-full cursor-default">
            <div className="fixed overflow-y-auto top-1/2 transform -translate-y-1/2 bg-white p-5 w-1/2 h-4/5 rounded-lg flex flex-col">
                <div className="absolute top-2 right-2 ">
                    <button
                        type="button"
                        aria-labelledby="close"
                        onClick={() => setDetailModal(false)}
                        className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">
                        <IoMdClose size={20} color="white" />
                    </button>
                </div>
                <div className="flex items-center mb-4 gap-2 border-b-2 pb-4 border-black">
                    <div className="bg-purple rounded-full w-[50px] h-[50px] flex items-center justify-center">
                        <GrDocumentText size={20} color="white" />
                    </div>
                    <div>
                        <h1 className="font-semibold">Paid Leave Details</h1>
                    </div>
                </div>
                <Flowbite theme={{ theme: flowbiteTheme }}>
                    <div className="p-2">
                        <div className="mb-6">
                            {approvalStatus(data?.approval)}
                        </div>
                        <div className="mb-4 flex items-center ">
                            <p className="w-1/5 text-sm font-semibold">ID Paid Leave :</p>
                            <TextInput className="w-4/5" icon={MdOutlineDocumentScanner} value={data._id} disabled />
                        </div>
                        <div className="mb-4 flex items-center">
                            <p className="w-1/5 text-sm font-semibold">Created Date :</p>
                            <Datepicker className="w-4/5" rightIcon={BsCalendar2DateFill} icon={false} value={format(new Date(data.createdAt), 'MMMM dd, yyyy')} disabled />
                        </div>
                        <div className="mb-4 flex items-center">
                            <p className="w-1/5 text-sm font-semibold">Employee :</p>
                            <TextInput className="w-4/5" icon={FaUser} value={data.user.name} disabled />
                        </div>
                        <div className="mb-4 flex items-center">
                            <p className="w-1/5 text-sm font-semibold">Role :</p>
                            <TextInput className="w-4/5" icon={FaUser} value={data.user.position} disabled />
                        </div>
                        <div className="mb-4 flex items-center">
                            <p className="w-1/5 text-sm font-semibold">Departement :</p>
                            <TextInput className="w-4/5" icon={FaUser} value={data.user.divisi} disabled />
                        </div>
                        <div className="mb-4 flex items-center">
                            <p className="w-1/5 text-sm font-semibold">From Date :</p>
                            <Datepicker className="w-4/5" rightIcon={BsCalendar2DateFill} icon={false} value={data.fromdate ?format(new Date(data.fromdate), 'MMMM dd, yyyy') : ''} disabled />
                        </div>
                        <div className="mb-4 flex items-center">
                            <p className="w-1/5 text-sm font-semibold">End Date :</p>
                            <Datepicker className="w-4/5" rightIcon={BsCalendar2DateFill} icon={false} value={data.untildate ?format(new Date(data.untildate), 'MMMM dd, yyyy') : ''} disabled />
                        </div>
                        <div className="mb-6 flex items-center">
                            <p className="w-1/5 text-sm font-semibold">Description :</p>
                            <Textarea
                                value={data.description}
                                rows={3}
                                className="block w-4/5 p-2.5 text-sm bg-gray-50 rounded-lg border border-gray-300 "
                                disabled
                            />
                        </div>
                        <div className="flex items-center">
                            {data.approval && data.approval === 'Wait For Response' &&
                                <div className="flex flex-col w-full">
                                    <div className="flex justify-between w-full gap-2">
                                        <Button disabled={isPending} isProcessing={isPending} processingSpinner={<Spinner size={'sm'} />} className="flex justify-center items-center" color="red" onClick={handleReject}>
                                            <MdCancel size={20} />
                                            <p className="ml-2">Reject Repair Request</p>
                                        </Button>
                                        <Button disabled={isPending} isProcessing={isPending} processingSpinner={<Spinner size={'sm'} />} className="flex justify-center items-center" color="green" onClick={handleApprove}>
                                            <IoIosCheckmarkCircle size={20} />
                                            <p className="ml-2">Approve Repair Request</p>
                                        </Button>
                                    </div>
                                    <p className="ml-4 text-red font-semibold">{errorMsg}</p>
                                </div>
                            }
                        </div>
                    </div>
                </Flowbite>
            </div>
        </div>
    )
}
export default PaidLeaveDetailAdmin;