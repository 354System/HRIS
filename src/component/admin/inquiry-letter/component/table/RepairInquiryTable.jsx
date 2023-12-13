import { Spinner } from "@chakra-ui/react";
import { format } from "date-fns";
import { Dropdown, Tooltip } from "flowbite-react";
import { useMemo, useState } from "react";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { IoIosCheckmarkCircle, IoIosInformationCircle, IoIosInformationCircleOutline } from "react-icons/io";
import { PiDotsThreeCircleFill, PiDotsThreeDuotone } from "react-icons/pi";
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
        } else if (approval === 'Rejected' || approval === 'Canceled') {
            return <td className=" text-center"><span className="text-red bg-red/10 p-2 font-semibold rounded text-sm">{approval === 'Rejected' ? 'Rejected' : 'Canceled'}</span></td>
        } else {
            return <td className=" text-center"><span className="text-yellow bg-yellow/10 p-2 font-semibold rounded text-sm">Wait For Response</span></td>
        }
    }

    const sortedData = useMemo(() => {
        let orderedData = [];
        if (repairData) {
            orderedData = repairData.filter((item) => item.category === 'Repair');
        }

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
    console.log(sortedData);
    console.log(selectedItem);

    const { mutate, isPending } = useApprovalInquiryLetter({
        id: selectedItem?._id,
        onSuccess: (res) => {
            refetch();
            console.log(res);
            successAlert({ title: res.data?.approval, text: `id : ${selectedItem?._id}, title : ${selectedItem?.title} has been ${res.data?.approval}` });
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

    const handleApprove = (item) => {
        confirmAlert({
            title: "Are you sure you want to approve this repair request?",
            confirmText: "Yes, Approve it!",
            text: `"${item?._id}" : "${item?.title}", will be approved and cannot be undone.`,
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({
                    approval: 'Approved'
                })
            } else {
                setSelectedItem(null);
            }
        })
    }
    const handleReject = (item) => {
        confirmAlert({
            title: "Are you sure you want to reject this repair request?",
            confirmText: "Yes, Reject it!",
            text: `"${item?._id}" : "${item?.title}", will be rejected and cannot be undone.`,
        }).then((result) => {
            if (result.isConfirmed) {
                mutate({
                    approval: 'Rejected'
                })
            } else {
                setSelectedItem(null);
            }
        })
    }

    return (
        <div className="mt-5 w-full hp:overflow-x-auto">
            <table className="laptop:w-full hp:w-[1000px]">
                <thead className="">
                    <tr className="border-b-4 border-t-2 text-grey text-left">
                        <th className="p-4 text-center">No</th>
                        <th className="p-4">Employee</th>
                        <th className="flex items-center p-4 gap-1"><p onClick={() => setSelectDate(!selectDate)} className="cursor-pointer">Date</p>{selectDate ? <BsSortDown onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" /> : <BsSortUp onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" />}</th>
                        <th className="p-4">Title</th>
                        <th className="p-4">Cost Estimation</th>
                        <th className="p-4 flex justify-center">
                            <Dropdown label="Status" inline>
                                <Dropdown.Item className={`${selectedStatus === 'Default' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => setSelectedStatus('Default')}>Default</Dropdown.Item>
                                <Dropdown.Item className={`${selectedStatus === 'Wait For Response' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Wait For Response')}>Wait For Response</Dropdown.Item>
                                <Dropdown.Item className={`${selectedStatus === 'Approved' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Approved')}>Approved</Dropdown.Item>
                                <Dropdown.Item className={`${selectedStatus === 'Rejected' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Rejected')}>Rejected</Dropdown.Item>
                                <Dropdown.Item className={`${selectedStatus === 'Canceled' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => setSelectedStatus('Canceled')}>Canceled</Dropdown.Item>
                            </Dropdown>
                        </th>
                        <th className="p-4 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="text-left">
                    {sortedData ? sortedData.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="text-purple p-4 text-center">{index + 1}</td>
                            <td onClick={() => { setDetailModal(true), setSelectedItem(item) }} className="text-primary cursor-pointer hover:underline p-4">{item.user?.name}</td>
                            <td className="text-purple p-4">{format(new Date(item.date), 'dd-MM-yyyy')}</td>
                            <td className="p-4">{item.title?.replace(/\b\w/g, (char) => char.toUpperCase())}</td>
                            <td className="p-4">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', }).format(parseFloat(item.cost.replace(/[,.]/g, '')))}</td>
                            {approvalStatus(item.approval)}
                            <td className="flex h-16 w-full items-center justify-center gap-2">
                                {item.approval === 'Wait For Response' ?
                                    <div className="flex justify-center">
                                        <Dropdown arrowIcon={false} inline color="gray" label={<PiDotsThreeCircleFill size={35} className="hover:scale-105" color="gray" />}>
                                            <Dropdown.Item onClick={() => { setSelectedItem(item), handleApprove(item) }} className="hover:bg-green/80 hover:text-white transition-colors duration-200" icon={IoIosCheckmarkCircle}>Approve</Dropdown.Item>
                                            <Dropdown.Item onClick={() => { setSelectedItem(item), handleReject(item) }} className="hover:bg-red/70 hover:text-white transition-colors duration-200" icon={MdCancel}>Reject</Dropdown.Item>
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
                    )) : sortedData?.length === 0 ? <tr><td className="p-4 text-center text-lg font-semibold" colSpan={5}>Data Not Available</td></tr> : sortedData === undefined && <Spinner className="absolute left-1/2" />}
                </tbody>
            </table>
            {detailModal && <RepairInquiryDetailAdmin refetchInquiryData={refetch} data={selectedItem} setDetailModal={setDetailModal} />}
        </div>
    )
}
export default RepairInquiryTableAdmin;