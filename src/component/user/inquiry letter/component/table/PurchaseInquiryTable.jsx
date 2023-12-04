import { Spinner } from "@chakra-ui/react"
import { format } from "date-fns"
import { useMemo, useState } from "react"
import { FaPen, FaTrash } from "react-icons/fa"
import { RxDotsHorizontal } from "react-icons/rx"
import PurchaseInquiryDetailUser from "./action/purchaseInquiry/purchaseInquiryDetail"
import { Tooltip } from "react-tooltip"
import PurchaseInquiryEditUser from "./action/purchaseInquiry/purchaseInquiryEdit"
import PurchaseInquiryDeleteUser from "./action/InquiryLetterDelete"
import { IoIosInformationCircle, IoIosInformationCircleOutline } from "react-icons/io"
import { Dropdown, Flowbite } from "flowbite-react"
import { flowbiteTheme } from "../../../../../lib/flowbiteTheme"
import { BsSortDown, BsSortUp } from "react-icons/bs"
import { MdCancel, MdOutlineCancel } from "react-icons/md"
import { confirmAlert, errorAlert, pendingAlert, successAlert } from "../../../../../lib/sweetAlert"
import { useApprovalInquiryLetter } from "../../../../../api/inquiry letter/useApproveRejectInquiryLetter"
import { PiDotsThreeCircleFill } from "react-icons/pi"

const PurchaseInquiryTableUser = ({ dataInquiry, refetchInquiryData, searchKeyword }) => {
    const [selectedItem, setSelectedItem] = useState(null)
    const [detailModal, setDetailModal] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState('Default');
    const [selectDate, setSelectDate] = useState(false);

    function approvalStatus(approval) {
        if (approval === 'Approved') {
            return <td className=" text-center"><span className="text-green bg-green/10 p-2 font-semibold rounded text-sm">Approved</span></td>
        } else if (approval === 'Reject' || approval === 'Canceled') {
            return <td className=" text-center"><span className="text-red bg-red/10 p-2 font-semibold rounded text-sm">{approval === 'Reject' ? 'Reject' : 'Canceled'}</span></td>
        } else {
            return <td className=" text-center"><span className="text-yellow bg-yellow/10 p-2 font-semibold rounded text-sm">Wait For Response</span></td>
        }
    }

    let filteredData = dataInquiry

    if (searchKeyword.trim() !== '') {
        filteredData = dataInquiry.filter((item) => {
            return Object.values(item).some(value => {
                if (typeof value === 'string') {
                    // If it's a string, check if it includes the searchKeyword
                    return value.toLowerCase().includes(searchKeyword.toLowerCase());
                } else if (item.date) {
                    // If it's a date, format it to 'dd-MMMM-yyyy' and check for inclusion
                    const formattedDate = format(new Date(item.date), 'dd-MM-yyyy');
                    return formattedDate.toLowerCase().includes(searchKeyword.toLowerCase());
                }
                return false;
            });
        });
    }

    const sortedData = useMemo(() => {
        let orderedData = filteredData;

        if (selectedStatus !== 'Default') {
            const matchingStatusData = orderedData?.filter((item) => item.approval === selectedStatus);
            const nonMatchingStatusData = orderedData?.filter((item) => item.approval !== selectedStatus);

            if (matchingStatusData?.length > 0) {
                if (selectDate) {
                    // Jika selectDate true, urutkan dari terlama hingga terbaru
                    matchingStatusData?.sort((a, b) => new Date(a.date) - new Date(b.date));
                } else {
                    // Jika selectDate false, urutkan dari terbaru hingga terlama
                    matchingStatusData?.sort((a, b) => new Date(b.date) - new Date(a.date));
                }

                orderedData = [...matchingStatusData, ...nonMatchingStatusData];
            }
        } else {
            if (selectDate) {
                // Jika selectDate true, urutkan dari terlama hingga terbaru
                orderedData?.sort((a, b) => new Date(a.date) - new Date(b.date));
            } else {
                // Jika selectDate false, urutkan dari terbaru hingga terlama
                orderedData?.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
        }

        return orderedData;
    }, [filteredData, selectedStatus, selectDate]);

    const { mutate, isPending } = useApprovalInquiryLetter({
        id: selectedItem?._id,
        onSuccess: (data) => {
            console.log(data);
            refetchInquiryData();
            successAlert({ title: 'Your Purchase Request has been Cancelled !', text: `id : ${selectedItem?._id}, title : ${selectedItem?.title} has been Cancelled` })
            setSelectedItem(null);
        },
        onError: (error) => {
            console.log(error);
            errorAlert({ title: 'Something went wrong !' })
        }
    })

    if (isPending) {
        pendingAlert({ title: 'Sending Your Purchase Request, Please Wait...' })
    }

    const handleCancel = (item) => {
        confirmAlert({
            title: 'Are you sure want to Cancel this Purchase Request?',
            confirmText: 'Yes, Cancel it!',
            text: `"${item?._id}" : "${item?.title}", will be canceled and cannot be undone.`,
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({
                    approval: 'Canceled'
                })
            }
        })
    }

    return (
        <div className="laptop:mt-5 hp:mt-10 w-full h-96 text-center hp:overflow-x-auto">
            <table className="laptop:w-full hp:w-[600px]">
                <thead>
                    <Flowbite theme={{ theme: flowbiteTheme }}>
                        <tr className="border-b-4 border-t-2 text-grey text-left">
                            <th className="p-4 text-center">No</th>
                            <th className="flex items-center p-4 gap-1"><p onClick={() => setSelectDate(!selectDate)} className="cursor-pointer">Date</p>{selectDate ? <BsSortDown onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" /> : <BsSortUp onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" />}</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Damage</th>
                            <th className="p-4">Cost Estimation</th>
                            <th className="p-4 flex justify-center">
                                <Dropdown label="Status" inline>
                                    <Dropdown.Item className={`${selectedStatus === 'Default' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => setSelectedStatus('Default')}>Default</Dropdown.Item>
                                    <Dropdown.Item className={`${selectedStatus === 'Wait For Response' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Wait For Response')}>Wait For Response</Dropdown.Item>
                                    <Dropdown.Item className={`${selectedStatus === 'Approved' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Approved')}>Approved</Dropdown.Item>
                                    <Dropdown.Item className={`${selectedStatus === 'Reject' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Reject')}>Rejected</Dropdown.Item>
                                    <Dropdown.Item className={`${selectedStatus === 'Canceled' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => setSelectedStatus('Canceled')}>Canceled</Dropdown.Item>
                                </Dropdown>
                            </th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </Flowbite>
                </thead>
                <tbody className="text-left">
                    {sortedData ? sortedData.filter(item => item.category === 'Purchase').map((item, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-4 text-center">{index + 1}</td>
                            <td className="text-purple p-4">{format(new Date(item.date), 'dd-MM-yyyy')}</td>
                            <td className="p-4">{item.title.replace(/\b\w/g, (char) => char.toUpperCase())}</td>
                            <td className="p-4">{item.name.replace(/\b\w/g, (char) => char.toUpperCase())}</td>
                            <td className="p-4">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', }).format(parseFloat(item.cost.replace(/[,.]/g, '')))}</td>
                            {approvalStatus(item.approval)}
                            <td className="flex h-16 items-center justify-center gap-2">
                                {item.approval === 'Wait For Response' ?
                                    <div className="flex justify-center">
                                        <Dropdown arrowIcon={false} inline label={<PiDotsThreeCircleFill size={35} />}>
                                            <Dropdown.Item onClick={() => { setSelectedItem(item), handleCancel(item) }} className="hover:bg-red/70 hover:text-white transition-colors duration-200" icon={MdCancel}>Cancel Request</Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item className="hover:bg-blue-400 hover:text-white transition-colors duration-200" onClick={() => { setSelectedItem(item), setDetailModal(true); }} icon={IoIosInformationCircle}>Detail</Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                    :
                                    <div className="flex justify-center">
                                        <Dropdown arrowIcon={false} inline label={<PiDotsThreeCircleFill size={35} className="hover:scale-105" />}>
                                            <Dropdown.Item className="hover:bg-blue-400 hover:text-white transition-colors duration-200" onClick={() => { setSelectedItem(item), setDetailModal(true); }} icon={IoIosInformationCircle}>Detail</Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                }
                            </td>
                        </tr>
                    )) : filteredData.length === 0 ? <tr><td className="p-4 text-center text-lg font-semibold" colSpan={7}>Data Not Available</td></tr> : <Spinner className="absolute left-1/2" />}
                </tbody>
            </table>
            {detailModal ? <PurchaseInquiryDetailUser data={selectedItem} refetchInquiryData={refetchInquiryData} setDetailModal={setDetailModal} /> : null}
        </div>
    )
}
export default PurchaseInquiryTableUser;