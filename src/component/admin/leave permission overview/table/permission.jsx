import React, { useState } from "react";
import { format, intervalToDuration } from "date-fns";
import { Dropdown } from "flowbite-react";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { IoIosCheckmarkCircle, IoIosInformationCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import PermissionDetailAdmin from "../component/detail/permission/permissionDetailAdmin";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { confirmAlert, errorAlert, pendingAlert, successAlert } from "../../../../lib/sweetAlert";
import { useApprovalPermission } from "../../../../api/permission/useApprovalPermission";
import Pagination from "../filtering/permission/pagination";
import { Spinner } from "@chakra-ui/react";

const TablePermissionAdmin = ({ permissionData, refetchDataPermission, currentPage, setCurrentPage, totalPages, setSearchKeyword }) => {
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

  permissionData?.forEach(permissionData => {
    const fromDate = new Date(permissionData?.fromdate);
    let untilDate = new Date(permissionData?.untildate);
    untilDate?.setDate(untilDate.getDate() + 1);
    const timeDifference = untilDate - fromDate;

    const durationObject = timeDifference && intervalToDuration({ start: 0, end: timeDifference });
    let formattedDuration;
    if (durationObject?.months > 0) {
      formattedDuration = `${durationObject.months}m ${durationObject.days}d`;
    } else if (durationObject?.years > 0) {
      formattedDuration = `${durationObject.years}y ${durationObject.months}m ${durationObject.days}d`;
    }
    else {
      formattedDuration = `${durationObject.days}d`;
    }

    permissionData.totalDays = formattedDuration;
  })

  const handleStatus = async (status) => {
    setSelectedStatus(status);
    await setSearchKeyword(status);
    await setCurrentPage((prevState) => ({
      ...prevState,
      permission: {
        ...prevState.permission,
        pageSearch: 1
      }
    }))
    await refetchDataPermission();
  }


  const { mutate, isPending } = useApprovalPermission({
    id: selectedItem?._id,
    onSuccess: (data) => {
      refetchDataPermission()
      successAlert({
        title: `Your Permission has been ${data.data?.approval} !`,
        text: `id : ${data._id}, title : ${data.izin} has been ${data.data?.approval}`
      })
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      errorAlert({
        title: 'Something went wrong !',
      })
    }
  })

  const handleApprove = (data) => {
    confirmAlert({
      title: 'Are you sure want to approve this Permission Request?',
      text: `${data?._id} : ${data?.izin}, from ${format(new Date(data?.fromdate), 'dd-MM-yyyy')} to ${format(new Date(data?.untildate), 'dd-MM-yyyy')} will be approved and cannot be undone. `,
      confirmText: 'Yes, Approve It !',
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
      title: 'Are you sure want to reject this Permission Request?',
      text: `${data?._id} : ${data?.izin}, from ${format(new Date(data?.fromdate), 'dd-MM-yyyy')} to ${format(new Date(data?.untildate), 'dd-MM-yyyy')} will be rejected and cannot be undone. `,
      confirmText: 'Yes, Reject It !',
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
      title: 'Loading ...',
    })
  }

  return (
    <div className="mt-5 w-full bg-white hp:overflow-x-auto">
      <table className="laptop:w-full hp:w-[1000px]">
        <thead>
          <tr className="border-b-2 border-t text-grey">
            <th className="p-4">No</th>
            <th className="text-left w-48 p-4">Employee</th>
            <th className="flex items-center p-4 gap-1"><p onClick={() => setSelectDate(!selectDate)} className="cursor-pointer">Date</p>{selectDate ? <BsSortDown onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" /> : <BsSortUp onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" />}</th>
            <th className="p-4">Start Date</th>
            <th className="p-4">End Date</th>
            <th className="p-4">Total Days</th>
            <th className="p-4 flex justify-center">
              <Dropdown label="Status" inline>
                <Dropdown.Item className={`${selectedStatus === 'Default' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => handleStatus('')}>All</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Wait For Response' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => handleStatus('Wait For Response')}>Wait For Response</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Approved' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => handleStatus('Approved')}>Approved</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Reject' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => handleStatus('Rejected')}>Rejected</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Canceled' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => handleStatus('Canceled')}>Canceled</Dropdown.Item>
              </Dropdown>
            </th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {permissionData && permissionData.map((data, index) => (
            <tr className="border-b text-center" key={index}>
              <td className="text-primary p-4">{index + 1}</td>
              <td className="text-primary text-left p-4 hover:bg-gray-100 " onClick={() => { setSelectedItem(data), setDetailModal(true) }}>{data.user.name}</td>
              <td className="text-purple p-4">{data.createdAt ? format(new Date(data.createdAt), 'dd-MM-yyyy') : 'N/A'}</td>
              <td className="text-purple p-4">{data.fromdate ? format(new Date(data.fromdate), 'dd-MM-yyyy') : 'N/A'}</td>
              <td className="text-purple p-4">{data.untildate ? format(new Date(data.untildate), 'dd-MM-yyyy') : 'N/A'}</td>
              <td className="text-grey p-4">{data.totalDays ? data.totalDays : 'N/A'}</td>
              {approvalStatus(data.approval)}
              <td className="flex h-16 w-full items-center justify-center">
                {data.approval === 'Wait For Response' ?
                  <div className="flex justify-center">
                    <Dropdown arrowIcon={false} inline color="gray" label={<PiDotsThreeCircleFill size={35} className="hover:scale-105" color="gray" />}>
                      <Dropdown.Item onClick={() => { setSelectedItem(data), handleApprove(data) }} className="hover:bg-green/80 hover:text-white transition-colors duration-200" icon={IoIosCheckmarkCircle}>Approve</Dropdown.Item>
                      <Dropdown.Item onClick={() => { setSelectedItem(data), handleReject(data) }} className="hover:bg-red/70 hover:text-white transition-colors duration-200" icon={MdCancel}>Reject</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item className="hover:bg-blue-400 hover:text-white transition-colors duration-200" onClick={() => { setSelectedItem(data), setDetailModal(true); }} icon={IoIosInformationCircle}>Detail</Dropdown.Item>
                    </Dropdown>
                  </div>
                  :
                  <div className="flex justify-center">
                    <Dropdown arrowIcon={false} inline label={<PiDotsThreeCircleFill size={35} className="hover:scale-105" />}>
                      <Dropdown.Item className="hover:bg-blue-400 hover:text-white transition-colors duration-200" onClick={() => { setSelectedItem(data), setDetailModal(true); }} icon={IoIosInformationCircle}>Detail</Dropdown.Item>
                    </Dropdown>
                  </div>
                }
              </td>
            </tr>
          ))}
          {permissionData === undefined ? <p className="absolute left-1/2"><Spinner color="purple" size="sm" /></p>
            :
            permissionData?.length === 0 && <p className="absolute left-1/2 text-lg ">No Data Available</p>}
        </tbody>
      </table >
      <Pagination totalPages={totalPages.permission} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {detailModal && <PermissionDetailAdmin data={selectedItem} setDetailModal={setDetailModal} />}
    </div>
  );
};
export default TablePermissionAdmin;
