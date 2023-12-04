import { IoIosCheckmarkCircle, IoMdClose } from "react-icons/io"
import { GrDocumentText } from "react-icons/gr"
import { MdCancel, MdCancelScheduleSend, MdOutlineDocumentScanner } from "react-icons/md"
import { Button, Datepicker, Flowbite, TextInput, Textarea } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { format } from "date-fns";
import { BsCalendar2DateFill } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbDeviceIpadHorizontal } from "react-icons/tb";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { useApprovalInquiryLetter } from "../../../../../api/inquiry letter/useApproveRejectInquiryLetter";
import { flowbiteTheme } from "../../../../../lib/flowbiteTheme";
import { confirmAlert, successAlert } from "../../../../../lib/sweetAlert";

const PurchaseInquiryDetailAdmin = ({ data, setDetailModal, refetchInquiryData }) => {
    const [errorMsg, setErrorMsg] = useState("")

    function approvalStatus(approval) {
        if (approval === 'Approved') {
            return <div>Status : <span className="text-green bg-green/10 p-2 font-semibold rounded text-sm">Approved</span></div>
        } else if (approval === 'Reject' || approval === 'Canceled') {
            return <div>Status : <span className="text-red bg-red/10 p-2 font-semibold rounded text-sm">{approval === 'Reject' ? 'Rejected' : 'Canceled'}</span></div>
        } else if (approval === 'Wait For Response') {
            return <div className="font-semibold">Status : <span className="text-yellow bg-yellow/10 p-2 font-semibold rounded text-sm">Wait For Response</span></div>
        } else {
            return <div>Status : <span className="text-yellow bg-yellow/10 p-2 font-semibold rounded text-sm">Pending</span></div>
        }
    }

    const { mutate, isPending } = useApprovalInquiryLetter({
        id: data._id,
        onSuccess: (res) => {
            console.log(res);
            setDetailModal(false)
            refetchInquiryData()
            const actionText = res.data.approval === 'Approved' ? 'approved' : 'rejected';
            successAlert({
                title: `Success ${res.data.approval}`,
                text: `id : ${data._id}, title : ${data.title} has been ${actionText}`
            });
        },
        onError: (error) => {
            console.log(error);
            setErrorMsg("Something went wrong !")
        }
    })

    const handleApprove = () => {
        confirmAlert({
            title: `Are you sure want to approve this purchase request?`,
            confirmText: "Yes, Approve It!",
            text: `"${data._id}" will be approved and cannot be undone.`,
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({
                    approval: 'Approved'
                })
            }
        })
    }
    const handleReject = () => {
        confirmAlert({
            title: `Are you sure want to reject this purchase request?`,
            confirmText: "Yes, Reject It!",
            text: `"${data._id}" will be rejected and cannot be undone.`,
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({
                    approval: 'Rejected'
                })
            }
        })
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 bg-black/60 w-full h-full cursor-default">
            <div className="fixed overflow-y-auto top-1/2 transform -translate-y-1/2 bg-white p-5 w-1/2 h-4/5 rounded-lg flex flex-col">
                <div className="absolute top-2 right-2">
                    <button
                        onClick={() => setDetailModal(false)}
                        className="bg-black w-10 h-10 rounded-full flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-gray-900 hover:shadow-lg">
                        <IoMdClose size={20} color="white" />
                    </button>
                </div>
                <div className="flex items-center mb-4 gap-2 border-b-2 pb-4 border-black">
                    <div className="bg-gray-300 rounded-full w-[50px] h-[50px] flex items-center justify-center">
                        <GrDocumentText size={20} color="black" />
                    </div>
                    <div>
                        <h1 className="font-semibold">Purchase Inquiry Details</h1>
                    </div>
                </div>
                <Flowbite theme={{ theme: flowbiteTheme }}>
                    <div className="p-2 w-full">
                        <div className="mb-6">
                            {approvalStatus(data.approval)}
                        </div>
                        <div className="w-full justify-end items-center">
                            <p className="ml-4 text-red font-semibold">{errorMsg}</p>
                        </div>
                        <div className="mb-4">
                            <TextInput icon={MdOutlineDocumentScanner} value={data._id} disabled />
                        </div>
                        <div className="mb-4">
                            <Datepicker rightIcon={BsCalendar2DateFill} icon={false} value={format(new Date(data.date), 'MMMM dd, yyyy')} disabled />
                        </div>
                        <div className="mb-4">
                            <TextInput icon={FaUser} value={data.user.name} disabled />
                        </div>
                        <div className="mb-4">
                            <TextInput icon={HiOutlineDocumentText} value={data.title?.replace(/\b\w/g, (char) => char.toUpperCase())} disabled />
                        </div>
                        <div className="mb-4">
                            <TextInput icon={TbDeviceIpadHorizontal} value={data.name?.replace(/\b\w/g, (char) => char.toUpperCase())} disabled />
                        </div>
                        <div className="mb-4">
                            <TextInput icon={AiOutlineDollarCircle} value={new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', }).format(parseFloat(data.cost.replace(/[,.]/g, '')))} disabled />
                        </div>
                        <div className="mb-5">
                            <Textarea
                                value={data.reason}
                                rows={3}
                                className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 "
                                disabled
                            />
                        </div>
                        <div className="flex items-center">
                            {data.approval === 'Wait For Response' &&
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
export default PurchaseInquiryDetailAdmin;