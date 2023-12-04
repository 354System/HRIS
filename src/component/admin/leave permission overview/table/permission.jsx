import React, { useState } from "react";
import { format, intervalToDuration } from "date-fns";
import { Dropdown } from "flowbite-react";
import { PiDotsThreeCircleFill } from "react-icons/pi";
import { IoIosCheckmarkCircle, IoIosInformationCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import PermissionDetailAdmin from "../modal/permissionDetailAdmin";

const TablePermissionAdmin = ({ permissionData, refetchDataPermission }) => {
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

  const totalDays = permissionData?.forEach(permissionData => {
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

  return (
    <div className="mt-5">
      <table className="w-full bg-white">
        <thead>
          <tr className="border-b-2 border-t text-grey">
            <th className="p-4">No</th>
            <th className="text-left w-48 p-4">Employee</th>
            <th className="p-4">Date</th>
            <th className="p-4">Start Date</th>
            <th className="p-4">End Date</th>
            <th className="p-4">Total Days</th>
            <th className="p-4 flex justify-center">
              <Dropdown label="Status" inline>
                <Dropdown.Item className={`${selectedStatus === 'Default' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => setSelectedStatus('Default')}>Default</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Wait For Response' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Wait For Response')}>Wait For Response</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Approved' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Approved')}>Approved</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Reject' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200}`} onClick={() => setSelectedStatus('Reject')}>Rejected</Dropdown.Item>
                <Dropdown.Item className={`${selectedStatus === 'Canceled' ? 'bg-purple text-white hover:bg-purple' : 'hover:bg-purple/50 hover:text-white'} transition-colors duration-200`} onClick={() => setSelectedStatus('Canceled')}>Canceled</Dropdown.Item>
              </Dropdown>
            </th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {totalDays ? totalDays.map((data, index) => (
            <tr className="border-b text-center" key={index}>
              <td className="text-primary p-4">{index + 1}</td>
              <td className="text-primary text-left p-4">{data.user.name}</td>
              <td className="text-purple p-4">{format(new Date(data.createdAt), 'dd-MM-yyyy')}</td>
              <td className="text-purple p-4">{format(new Date(data.fromdate), 'dd-MM-yyyy')}</td>
              <td className="text-purple p-4">{format(new Date(data.untildate), 'dd-MM-yyyy')}</td>
              <td className="text-grey p-4">{data.totalDays ? data.totalDays : 'N/A'}</td>
              {approvalStatus(data.approval)}
              <td className="flex h-16 w-full items-center justify-center gap-2">
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
          )) : null}
        </tbody>
      </table >
      {detailModal && <PermissionDetailAdmin data={selectedItem} setDetailModal={setDetailModal} />}
    </div>
  );
};
export default TablePermissionAdmin;
