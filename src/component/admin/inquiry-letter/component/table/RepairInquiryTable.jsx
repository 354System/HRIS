import { Spinner } from "@chakra-ui/react";
import { format } from "date-fns";
import { Dropdown, Tooltip } from "flowbite-react";
import { useMemo, useState } from "react";
import { RxDotsHorizontal } from "react-icons/rx";
import RejectInquiryLetter from "../action/rejectInquiryLetter";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { IoIosCheckmarkCircle } from "react-icons/io";
import RepairInquiryDetailAdmin from "../modal/repairInquiryDetail";
import { MdCancel } from "react-icons/md";
import { useApprovalInquiryLetter } from "../../../../../api/inquiry letter/useApproveRejectInquiryLetter";
import { confirmAlert, errorAlert, pendingAlert, successAlert } from "../../../../../lib/sweetAlert";

const RepairInquiryTableAdmin = ({ data: repairData, refetch, searchKeyword }) => {
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

    const sortedData = useMemo(() => {
        let orderedData = repairData;

        if (searchKeyword.trim() !== '') {
            orderedData = orderedData?.filter((item) => {
                return Object.values(item).some(value => {
                    if (typeof value === 'string') {
                        // If it's a string, check if it includes the searchKeyword
                        return value.toLowerCase().includes(searchKeyword.toLowerCase());
                    } else if (typeof value === 'object' && value !== null) {
                        // If it's an object, check if any of its values match the searchKeyword
                        return Object.values(value).some(innerValue => {
                            if (typeof innerValue === 'string') {
                                return innerValue.toLowerCase().includes(searchKeyword.toLowerCase());
                            } else if (typeof innerValue === 'object' && innerValue !== null) {
                                // If it's an object inside the user object, check its values
                                return Object.values(innerValue).some(nestedValue =>
                                    nestedValue.toLowerCase().includes(searchKeyword.toLowerCase())
                                );
                            }
                            return false;
                        });
                    } else if (value instanceof Date) {
                        // If it's a date, format it to 'dd-MM-yyyy' and check for inclusion
                        const formattedDate = format(value, 'dd-MM-yyyy');
                        return formattedDate.toLowerCase().includes(searchKeyword.toLowerCase());
                    }
                    return false;
                });
            });
        }

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
    }, [repairData, searchKeyword, selectedStatus, selectDate]);

    const { mutate, isPending } = useApprovalInquiryLetter({
        id: selectedItem?._id,
        onSuccess: (data) => {
            console.log(data);
            refetch();
            successAlert({ title: "Success Approve" });
            setSelectedItem(null);
        },
        onError: (error) => {
            console.log(error);
            setSelectedItem(null);
            errorAlert({ title: "Failed Approve" });
        }
    })

    if (isPending) {
        pendingAlert({ title: "Loading ..." });
    }

    const handleApprove = () => {
        confirmAlert({
            title: "Are you sure you want to approve this repair request?",
            confirmText: "Yes, Approve",
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
            title: "Are you sure you want to reject this repair request?",
            confirmText: "Yes, Reject",
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({
                    approval: 'Reject'
                })
            }
        })
    }


    return (
        <div className="mt-5">
            <table className="w-full">
                <thead className="">
                    <tr className="border-b-4 border-t-2 text-grey text-left">
                        <th className="p-4 text-center">No</th>
                        <th className="p-4">Name</th>
                        <th className="flex items-center p-4 gap-1"><p onClick={() => setSelectDate(!selectDate)} className="cursor-pointer">Date</p>{selectDate ? <BsSortDown onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" /> : <BsSortUp onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" />}</th>
                        <th className="p-4">Title</th>
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
                </thead>
                <tbody className="text-left">
                    {sortedData ? sortedData.filter(item => item.category === 'Repair').map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="text-purple p-4 text-center">{index + 1}</td>
                            <td onClick={() => { setDetailModal(true), setSelectedItem(item) }} className="text-primary cursor-pointer p-4">{item.user?.name}</td>
                            <td className="text-purple p-4">{format(new Date(item.date), 'dd-MM-yyyy')}</td>
                            <td className="p-4">{item.title}</td>
                            <td className="p-4">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', }).format(parseFloat(item.cost.replace(/[,.]/g, '')))}</td>
                            {approvalStatus(item.approval)}
                            <td className="flex h-16 items-center justify-center gap-2">
                                {item.approval === 'Wait For Response' ?
                                    (
                                        <div className="h-8 flex justify-center items-center gap-1">
                                            <button data-tooltip-id="approve" onClick={() => { handleApprove(); setSelectedItem(item); }} className="group w-8 h-8 flex justify-center items-center rounded-lg bg-green text-white hover:bg-green-dark transition-colors duration-200 ease-in-out">
                                                <IoIosCheckmarkCircle size={20} className="group-hover:scale-105 duration-200 transition-transform" />
                                            </button>
                                            <button data-tooltip-id="reject" onClick={() => { handleReject(); setSelectedItem(item); }} className="group w-8 h-8 flex justify-center items-center rounded-lg bg-red text-white hover:bg-red-dark transition-colors duration-200 ease-in-out">
                                                <MdCancel size={17} className="group-hover:scale-105 duration-200 transition-transform" />
                                            </button>
                                            <Tooltip id="aprove" content="Approve Inquiry" place="top" style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                                            <Tooltip id="reject" content="Reject Inquiry" place="top" style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                                        </div>
                                    )
                                    :
                                    <div className="flex justify-center gap-x-1">
                                        <button data-tooltip-id="detail" onClick={() => { setDetailModal(true); setSelectedItem(item); }} className="group w-10 h-10 flex justify-center items-center rounded-lg mb-4 bg-gray-200 text-black hover:bg-gray-300 hover:text-black transition-colors duration-200 ease-in-out">
                                            <RxDotsHorizontal size={17} className="group-hover:scale-125 duration-200 transition-transform" />
                                        </button>
                                        <Tooltip id="detail" content="Purchase Inquiry Detail" place="top" style={{ fontSize: '12px', padding: '5px', backgroundColor: '#2F2F2F', color: 'white', fontWeight: '600', letterSpacing: '0.05em' }} noArrow />
                                    </div>
                                }
                            </td>
                        </tr>
                    )) : <Spinner className="absolute left-1/2" />}
                </tbody>
            </table>
            {detailModal && <RepairInquiryDetailAdmin refetch={refetch} data={selectedItem} setDetailModal={setDetailModal} />}
        </div>
    )
}
export default RepairInquiryTableAdmin;