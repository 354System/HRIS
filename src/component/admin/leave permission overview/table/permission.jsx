import React from "react";
import { format, intervalToDuration } from "date-fns";

const TablePermissionAdmin = ({ permissionData, refetchDataPermission }) => {

  permissionData?.forEach(permissionData => {
    const fromDate = new Date(permissionData?.fromdate);
    let untilDate = new Date(permissionData?.untildate);
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

    permissionData.totalDays = formattedDuration;
  })

  return (
    <table className="w-full bg-white">
      <thead>
        <tr className="border-b border-t text-grey">
          <th className="text-left w-48 p-6">Employee</th>
          <th>Role</th>
          <th>Department</th>
          <th>Date</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Total Days</th>
        </tr>
      </thead>
      <tbody>
        {permissionData ? permissionData.map((data, index) => (
          <tr className="border-b text-center" key={index}>
            <td className="text-primary text-left p-6">{data.user.name}</td>
            <td className="text-grey">{data.user.position}</td>
            <td className="text-grey">{data.user.divisi}</td>
            <td className="text-purple">{format(new Date(data.createdAt), 'dd-MM-yyyy')}</td>
            <td className="text-purple">{format(new Date(data.fromdate), 'dd-MM-yyyy')}</td>
            <td className="text-purple">{format(new Date(data.untildate), 'dd-MM-yyyy')}</td>
            <td className="text-grey">{data.totalDays}</td>
          </tr>
        )) : null}
      </tbody>
    </table >
  );
};
export default TablePermissionAdmin;
