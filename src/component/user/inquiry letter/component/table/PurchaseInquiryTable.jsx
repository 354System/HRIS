import { Spinner } from "@chakra-ui/react"
import { format } from "date-fns"
import { useMemo, useState } from "react"
import { FaPen, FaTrash } from "react-icons/fa"
import { RxDotsHorizontal } from "react-icons/rx"
import PurchaseInquiryDetailUser from "./action/purchaseInquiry/purchaseInquiryDetail"
import { Tooltip } from "react-tooltip"
import PurchaseInquiryEditUser from "./action/purchaseInquiry/purchaseInquiryEdit"
import PurchaseInquiryDeleteUser from "./action/InquiryLetterDelete"
import { IoIosInformationCircleOutline } from "react-icons/io"
import { Dropdown, Flowbite } from "flowbite-react"
import { flowbiteTheme } from "../../../../../lib/flowbiteTheme"
import { BsSortDown, BsSortUp } from "react-icons/bs"
import { MdOutlineCancel } from "react-icons/md"
import { confirmAlert, errorAlert, pendingAlert, successAlert } from "../../../../../lib/sweetAlert"
import { useApprovalInquiryLetter } from "../../../../../api/inquiry letter/useApproveRejectInquiryLetter"

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

            if (matchingStatusData.length > 0) {
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
            successAlert({ title: 'Your Purchase Request has been Cancelled !' })
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

    const handleCancel = () => {
        confirmAlert({
            title: 'Are you sure want to Cancel this Purchase Request?',
            confirmText: 'Yes, Cancel it!',
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({
                    approval: 'Canceled'
                })
            }
        })
    }

    return (
        <div className="mt-5">
            <table className="w-full">
                <thead>
                    <Flowbite theme={{ theme: flowbiteTheme }}>
                        <tr className="border-b-4 border-t-2 text-grey text-left">
                            <th className="p-4 text-center">No</th>
                            <th className="flex items-center p-4 gap-1"><p onClick={() => setSelectDate(!selectDate)} className="cursor-pointer">Date</p>{selectDate ? <BsSortDown onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" /> : <BsSortUp onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" />}</th>
                            <th className="p-4">Title</th>
                            <th className="p-4">Item Name</th>
                            <th className="p-4">Estimasi Biaya</th>
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
                            <td className="p-4 flex justify-center">
                                {item.approval === 'Wait For Response' ?
                                    <div className="flex gap-2">
                                        <button data-tooltip-id="cancel" onClick={() => { handleCancel(); setSelectedItem(item); }} className="group w-10 h-10 flex justify-center items-center rounded-lg bg-red text-white hover:bg-red-dark hover:text-white transition-colors duration-200 ease-in-out">
                                            <MdOutlineCancel size={20} className="group-hover:scale-105 duration-200 transition-transform" />
                                        </button>
                                        <button data-tooltip-id="detail" onClick={() => { setDetailModal(true); setSelectedItem(item); }} className="group w-10 h-10 flex justify-center items-center rounded-lg bg-gray-200 text-black hover:bg-gray-300 hover:text-black transition-colors duration-200 ease-in-out">
                                            <IoIosInformationCircleOutline size={28} className="group-hover:scale-105 duration-200 transition-transform" />
                                        </button>
                                        <Tooltip id="cancel" content="Cancel Repair Request" place="top" style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                                        <Tooltip id="detail" content="Purchase Request Detail" place="top" style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                                    </div>
                                    :
                                    <>
                                        <button data-tooltip-id="detail" onClick={() => { setDetailModal(true); setSelectedItem(item); }} className="group w-10 h-10 flex justify-center items-center rounded-lg bg-gray-200 text-black hover:bg-gray-300 hover:text-black transition-colors duration-200 ease-in-out">
                                            <IoIosInformationCircleOutline size={28} className="group-hover:scale-105 duration-200 transition-transform" />
                                        </button>
                                        <Tooltip id="detail" content="Purchase Request Detail" place="top" style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                                    </>
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