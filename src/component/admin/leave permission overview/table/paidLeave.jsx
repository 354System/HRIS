import { useMemo, useState } from "react";
import { format, intervalToDuration } from "date-fns";
import { Spinner } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Dropdown } from "flowbite-react";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { IoIosCheckmarkCircle, IoIosInformationCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

const PaidLeaveTableAdmin = ({ paidLeaveData, refetchDataPaidLeave, searchKeyword }) => {
  const [selectedStatus, setSelectedStatus] = useState('Default');
  const [selectDate, setSelectDate] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  function approvalStatus(approval) {
    if (approval === 'Approved') {
      return <td className=" text-center"><span className="text-green bg-green/10 p-2 font-semibold rounded text-sm">Approved</span></td>
    } else if (approval === 'Reject' || approval === 'Canceled') {
      return <td className=" text-center"><span className="text-red bg-red/10 p-2 font-semibold rounded text-sm">{approval === 'Reject' ? 'Reject' : 'Canceled'}</span></td>
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

    const durationObject = intervalToDuration({ start: 0, end: timeDifference });
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

  const sortedData = useMemo(() => {
    let orderedData = [];

    if (paidLeaveData) {
      orderedData = paidLeaveData
    }

    if (searchKeyword.trim() !== '') {
      orderedData = orderedData?.filter((item) => {
        return Object.values(item).some(value => {
          if (typeof value === 'string') {
            // If it's a string, check if it includes the searchKeyword
            return value.toLowerCase().includes(searchKeyword.toLowerCase());
          } else if (item.createdAt) {
            // If it's a date, format it to 'dd-MMMM-yyyy' and check for inclusion
            const formattedDate = format(new Date(item.createdAt), 'dd-MM-yyyy');
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
        orderedData?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else {
        // Jika selectDate false, urutkan dari terbaru hingga terlama
        orderedData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
    }

    return orderedData;
  }, [paidLeaveData, searchKeyword, selectedStatus, selectDate]);

  const handleApprove = (id) => {

  }

  const handleReject = (id) => {
    setDisApprovePopUp(true);
    setId(id);
  }

  return (
    <div className="mt-5">
      <table className="w-full bg-white">
        <thead>
          <tr className="border-b border-t text-grey">
            <th className="p-4">No</th>
            <th className="text-left p-4">Employee</th>
            <th>Date</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Total Days</th>
            <th className="flex justify-center p-4">
              <Dropdown label="Status" inline>
                <Dropdown.Item className={`${selectedStatus === 'Default' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => setSelectedStatus('Default')}>Default</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Wait For Response' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Wait For Response')}>Wait For Response</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Approved' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Approved')}>Approved</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Reject' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Reject')}>Rejected</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Canceled' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => setSelectedStatus('Canceled')}>Canceled</Dropdown.Item>
              </Dropdown>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedData ? sortedData.map((data, index) => (
            <tr className="border-b" key={index}>
              <td className="text-purple text-center p-4">{index + 1}</td>
              <td className="text-primary text-left w-48 p-4">{data.user.name}</td>
              <td className="text-purple text-center">{format(new Date(data.createdAt), 'dd-MM-yyyy')}</td>
              <td className="text-purple text-center">{format(new Date(data.fromdate), 'dd-MM-yyyy')}</td>
              <td className="text-purple text-center">{format(new Date(data.untildate), 'dd-MM-yyyy')}</td>
              <td className="text-grey text-center">{data.totalDays}</td>
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
          )) : sortedData.length === 0 ? <td>No Data Available</td> : paidLeaveData === undefined && <Spinner className="absolute left-1/2" />}
        </tbody>
      </table >
    </div>
  )
}
export default PaidLeaveTableAdmin;