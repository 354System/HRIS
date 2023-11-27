import React from "react";
import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";
import TableAttendanceHistory from "../../component/user/Attendance-History/history";
const AttendanceHistoryUser = () => {
  return (
    <div className="absolute bg-gray-300 min-h-screen w-full">
      <Navbar />
      <Sidebarmenu />
      <div className="p-7 mt-28 pl-28 w-full">
        <TableAttendanceHistory />
      </div>
    </div>
  );
};
export default AttendanceHistoryUser;
