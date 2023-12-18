import { useMemo, useState } from "react";
import { format, intervalToDuration } from "date-fns";
import { Spinner } from "@chakra-ui/react";
import { Dropdown } from "flowbite-react";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { IoIosCheckmarkCircle, IoIosInformationCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { confirmAlert, errorAlert, pendingAlert, successAlert } from "../../../../lib/sweetAlert";
import { BsSortDown, BsSortUp } from "react-icons/bs";
import { useApprovalPaidLeave } from "../../../../api/paid leave/useApproveLeave";
import Pagination from "../filtering/paidLeave/pagination";
import PaidLeaveDetailAdmin from "../component/detail/paidLeave/paidLeaveDetailAdmin";

const PaidLeaveTableAdmin = ({ paidLeaveData, refetchDataPaidLeave, setSearchKeyword, currentPage, setCurrentPage, totalPages, isLoadingPaidLeave }) => {
  const [selectedStatus, setSelectedStatus] = useState('Default');
  const [selectDate, setSelectDate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailModal, setDetailModal] = useState(false);

  function approvalStatus(approval) {
    if (approval === 'Approved') {
      return <td className=" text-center"><span className="text-green bg-green/10 p-2 font-semibold rounded text-sm">Approved</span></td>
    } else if (approval === 'Rejected' || approval === 'Canceled') {
      return <td className=" text-center"><span className="text-red bg-red/10 p-2 font-semibold rounded text-sm">{approval === 'Rejected' ? 'Rejected' : 'Canceled'}</span></td>
    } else {
      return <td className=" text-center"><span className="text-yellow bg-yellow/10 p-2 font-semibold rounded text-sm">Wait For Response</span></td>
    }
  }

  //membuat totalDays
  paidLeaveData?.forEach(paidLeaveData => {
    const fromDate = new Date(paidLeaveData?.fromdate);
    let untilDate = new Date(paidLeaveData?.untildate);
    untilDate.setDate(untilDate.getDate() + 1);

    const timeDifference = untilDate - fromDate;

    const durationObject = timeDifference && intervalToDuration({ start: 0, end: timeDifference });
    let formattedDuration;
    if (durationObject.months > 0) {
      formattedDuration = `${durationObject.months}m ${durationObject.days}d`;
    } else if (durationObject.years > 0) {
      formattedDuration = `${durationObject.years}y ${durationObject.months}m ${durationObject.days}d`;
    }
    else {
      formattedDuration = `${durationObject.days}d`;
    }

    paidLeaveData.totalDays = formattedDuration;
  })

  const handleStatus = async (status) => {
    setSelectedStatus(status);
    await setSearchKeyword(status);
    await setCurrentPage((prevState) => ({
      ...prevState,
      paidLeave: {
        ...prevState.paidLeave,
        pageSearch: 1
      }
    }))
    await refetchDataPaidLeave();
  }

  const { mutate, isPending } = useApprovalPaidLeave({
    id: selectedItem?._id,
    onSuccess: (data) => {
      refetchDataPaidLeave();
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
    <div className="mt-5 w-full bg-white hp:overflow-x-auto">
      <table className="laptop:w-full hp:w-[1000px]">
        <thead>
          <tr className="border-b border-t text-grey">
            <th className="p-4">No</th>
            <th className="text-left">Employee</th>
            <th className="flex items-center p-4 gap-1"><p onClick={() => setSelectDate(!selectDate)} className="cursor-pointer">Date</p>{selectDate ? <BsSortDown onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" /> : <BsSortUp onClick={() => setSelectDate(!selectDate)} className="cursor-pointer" />}</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Days</th>
            <th className="flex justify-center p-4">
              <Dropdown label="Status" inline>
                <Dropdown.Item className={`${selectedStatus === 'Default' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => handleStatus('')}>Default</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Wait For Response' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => handleStatus('Wait For Response')}>Wait For Response</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Approved' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => handleStatus('Approved')}>Approved</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Reject' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => handleStatus('Reject')}>Rejected</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Canceled' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => handleStatus('Canceled')}>Canceled</Dropdown.Item>
              </Dropdown>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paidLeaveData && paidLeaveData.map((data, index) => (
            <tr className="border-b" key={index}>
              <td className="text-purple text-center p-4">{index + 1}</td>
              <td className="text-primary text-left w-48 p-4 hover:bg-gray-100" onClick={() => { setDetailModal(true), setSelectedItem(data) }}>{data.user.name}</td>
              <td className="text-purple text-center">{format(new Date(data.createdAt), 'dd-MM-yyyy')}</td>
              <td className="text-purple text-center">{data.fromdate ? format(new Date(data.fromdate), 'dd-MM-yyyy') : 'kocak diaz'}</td>
              <td className="text-purple text-center">{data.fromdate ? format(new Date(data.untildate), 'dd-MM-yyyy') : 'kocak diaz'}</td>
              <td className="text-grey text-center">{data.totalDays}</td>
              {approvalStatus(data.approval)}
              <td className="flex h-16 w-full items-center justify-center">
                {data.approval === 'Wait For Response' ?
                  <div className="flex justify-center">
                    <Dropdown arrowIcon={false} inline color="gray" label={<PiDotsThreeCircleFill size={35} className="hover:scale-105" color="gray" />}>
                      <Dropdown.Item onClick={() => { setSelectedItem(data), handleApprove(data), console.log('p'); }} className="hover:bg-green/80 hover:text-white transition-colors duration-200" icon={IoIosCheckmarkCircle}>Approve</Dropdown.Item>
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
          {isLoadingPaidLeave ? <p className="absolute left-1/2"><Spinner color="purple" size="sm" /></p>
            :
            paidLeaveData?.length === 0 && <p className="absolute left-1/3">No Data Available</p>}
        </tbody>
      </table >
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      {detailModal && <PaidLeaveDetailAdmin data={selectedItem} setDetailModal={setDetailModal} />}
    </div>
  )
}
export default PaidLeaveTableAdmin;