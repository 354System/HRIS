import { format, intervalToDuration } from "date-fns";
import { useFetchAllPaidLeave } from "../../../../api/fetchData/useFetchAllPaidLeave";
import { Spinner } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import ApproveLeave from "../confirm/approveLeave";
import { useState } from "react";

const TablePaidLeaveAdmin = () => {
  const [approve, setApprove] = useState(false);
  const [id, setId] = useState("");
  const { data: paidLeaveData, isLoading, refetch: refetchDataPaidLeave } = useFetchAllPaidLeave();
  console.log(paidLeaveData);

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

  const getApprovalStatus = (approval, id) => {
    if (approval === 'Wait For Response') {
      return (
        <td className="flex h-11 items-end justify-center gap-2">
          <button className="bg-[#57C125] w-[31px] h-[31px] flex justify-center items-center rounded-lg" onClick={() => handleApprove(id)}>
            <Icon icon="ph:check-circle-fill" color="white" width="17.36" />
          </button>
          <button className="bg-[#FF0000] w-[31px] h-[31px] flex justify-center items-center rounded-lg">
            <Icon icon="solar:close-circle-bold" color="white" width="17.36" />
          </button>
        </td>
      );
    } else if (approval === 'Approved') {
      return <td>Approved</td>;
    } else if (approval === 'Disapprove') {
      return <td>Disapprove</td>;
    } else {
      return <td>Unknown Status</td>;
    }
  };

  const handleApprove = (id) => {
    setApprove(true);
    setId(id);
  }

  return (
    <table className="w-full bg-white">
      <thead>
        <tr className="border-b border-t text-grey">
          <th className="text-left p-4">Employee</th>
          <th>Role</th>
          <th>Department</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Total Days</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {paidLeaveData
          ? paidLeaveData
            .sort((a, b) => {
              if (
                a.approval === 'approved' ||
                a.approval === 'disapprove'
              ) {
                return 1;
              } else {
                return -1;
              }
            })
            .map((data, index) => (
              <tr className="border-b" key={index}>
                <td className="text-[#252C58] text-left p-6">{data.user.name}</td>
                <td className="text-grey text-center">{data.user.position}</td>
                <td className="text-grey text-center">{data.user.divisi}</td>
                <td className="text-[#A332C3] text-center">{format(new Date(data.fromdate), 'dd-MM-yyyy')}</td>
                <td className="text-[#A332C3] text-center">{format(new Date(data.untildate), 'dd-MM-yyyy')}</td>
                <td className="text-grey text-center">{data.totalDays}</td>
                {getApprovalStatus(data.approval, data._id)}
              </tr>
            ))
          : null}
      </tbody>
      {approve && <ApproveLeave id={id} refetchDataPaidLeave={refetchDataPaidLeave} approve={setApprove} />}
    </table >
  )
}
export default TablePaidLeaveAdmin;