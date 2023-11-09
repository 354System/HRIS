import React, { useEffect } from "react";
import { useFetchAllPermission } from "../../../../api/fetchData/useFetchAllPermission";
import { format, intervalToDuration } from "date-fns";

const TablePermissionAdmin = () => {
  const { data: permissionData, isLoading, refetch: refetchDataPermission } = useFetchAllPermission();

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
          <th>Start Date</th>
          <th>End Date</th>
          <th>Total Days</th>
        </tr>
      </thead>
      <tbody>
        {permissionData ? permissionData.map((data, index) => (
          <tr className="border-b text-center" key={index}>
            <td className="text-[#252C58] text-left p-6 w-48">{data.user.name}</td>
            <td className="text-grey">{data.user.position}</td>
            <td className="text-grey">{data.user.divisi}</td>
            <td className="text-[#A332C3]">{format(new Date(data.fromdate), 'dd-MM-yyyy')}</td>
            <td className="text-[#A332C3]">{format(new Date(data.untildate), 'dd-MM-yyyy')}</td>
            <td className="text-grey">{data.totalDays}</td>
          </tr>
        )) : null}
      </tbody>
    </table >
  );
};
export default TablePermissionAdmin;
