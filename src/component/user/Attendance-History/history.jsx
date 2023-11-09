import React, { useState } from "react";
import PresenceTableUser from "./table/presenceTable";
import PermissionTableUser from "./table/permissionTable";
import PaidLeaveTable from "./table/paidLeaveTable";

const TableAttendanceHistory = () => {
  const [attendance, setAttendance] = useState(true);
  const [Permission, setPermisson] = useState(false);
  const [paidLeave, setPaidLeave] = useState(false);

  return (
    <div className="bg-white w-full lg:mt-24 lg:ml-4 rounded-lg">
      <div className="flex items-center w-full h-20 gap-3">
        <button
          className={`h-12 w-28 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide ${attendance ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500'
            }`}
          onClick={() => {
            setAttendance(true);
            setPermisson(false);
            setPaidLeave(false);
          }}
        >
          Attendance
        </button>
        <button
          className={`h-12 w-28 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide ${Permission ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500'
            }`}
          onClick={() => {
            setAttendance(false);
            setPermisson(true);
            setPaidLeave(false);
          }}
        >
          Permission
        </button>
        <button
          className={`h-12 w-28 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide ${paidLeave ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500'
            }`}
          onClick={() => {
            setAttendance(false);
            setPermisson(false);
            setPaidLeave(true);
          }}
        >
          Paid Leave
        </button>
      </div>
      {attendance ? <PresenceTableUser /> : null}
      {Permission ? <PermissionTableUser /> : null}
      {paidLeave ? <PaidLeaveTable /> : null}
    </div>
  );
};

export default TableAttendanceHistory;