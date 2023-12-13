import { Spinner } from "@chakra-ui/react";
import { format } from "date-fns";
import { useMemo, useState } from "react";
import RepairInquiryDetailUser from "./action/repairInquiry/repairInquiryDetail";
import { IoIosInformationCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { Dropdown, Flowbite } from "flowbite-react";
import { flowbiteTheme } from "../../../../../lib/flowbiteTheme";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { useApprovalInquiryLetter } from "../../../../../api/inquiry letter/useApproveRejectInquiryLetter";
import { confirmAlert, errorAlert, pendingAlert, successAlert } from "../../../../../lib/sweetAlert";
import { PiDotsThreeCircleFill } from "react-icons/pi";

const RepairInquiryTableUser = ({ dataInquiry, refetchInquiryData, searchKeyword }) => {
    const [selectedItem, setSelectedItem] = useState(null)
    const [detailModal, setDetailModal] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState('All');
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
        let orderedData = [];
        if (dataInquiry) {
            orderedData = dataInquiry.filter((item) => item.category === 'Repair');
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

        if (selectedStatus !== 'All') {
            const matchingStatusData = orderedData?.filter((item) => item.approval === selectedStatus);

            if (matchingStatusData.length > 0) {
                if (selectDate) {
                    // Jika selectDate true, urutkan dari terlama hingga terbaru
                    matchingStatusData?.sort((a, b) => new Date(a.date) - new Date(b.date));
                } else {
                    // Jika selectDate false, urutkan dari terbaru hingga terlama
                    matchingStatusData?.sort((a, b) => new Date(b.date) - new Date(a.date));
                }
                orderedData = [...matchingStatusData];
            } else {
                orderedData = [];
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
    }, [dataInquiry, searchKeyword, selectedStatus, selectDate]);

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
        pendingAlert({ title: 'Sending Your Repair Request, Please Wait...' })
    }

    const handleCancel = () => {
        confirmAlert({
            title: 'Are you sure want to Cancel this Repair Request?',
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
        <div className="laptop:mt-5 hp:mt-10 w-full text-center hp:overflow-x-auto">
            <table className="laptop:w-full hp:w-[1200px]">
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
                                    <Dropdown.Item className={`${selectedStatus === 'All' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => setSelectedStatus('All')}>All</Dropdown.Item>
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
                    {sortedData && sortedData.filter(item => item.category === 'Repair').map((item, index) => (
                        <tr key={index} className="border-b">
                            <td className="text-purple p-4 text-center">{index + 1}</td>
                            <td className="text-purple p-4">{format(new Date(item.date), 'dd-MM-yyyy')}</td>
                            <td className="p-4">{item.title.replace(/\b\w/g, (char) => char.toUpperCase())}</td>
                            <td className="p-4">{item.damage.replace(/\b\w/g, (char) => char.toUpperCase())}</td>
                            <td className="p-4">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', }).format(parseFloat(item.cost.replace(/[,.]/g, '')))}</td>
                            {approvalStatus(item.approval)}
                            <td className="flex h-16 items-center justify-center gap-2">
                                {item.approval === 'Wait For Response' ?
                                    <div className="flex justify-center">
                                        <Dropdown arrowIcon={false} inline label={<PiDotsThreeCircleFill size={35} className="hover:scale-105 " />}>
                                            <Dropdown.Item onClick={() => { setSelectedItem(item), handleCancel(item) }} className="active:bg-red/70 hover:bg-red/70 hover:text-white transition-colors duration-200" icon={MdCancel}>Cancel Request</Dropdown.Item>
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
                    ))}
                    {sortedData?.length === 0 && <tr><td className="p-4 laptop:text-center hp:text-left text-lg font-semibold" colSpan={7}>Data Not Available</td></tr>}
                    {sortedData === undefined && <Spinner className="absolute left-1/2" />}
                </tbody>
            </table>
            {detailModal ? <RepairInquiryDetailUser refetchInquiryData={refetchInquiryData} setDetailModal={setDetailModal} data={selectedItem} /> : null}
        </div>
    )
}

export default RepairInquiryTableUser;