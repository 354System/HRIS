import React from "react";
import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";
import TableAttendanceHistory from "../../component/user/Attendance-History/history";
const AttendanceHistoryUser = () => {
  return (
    <div className="w-full min-h-screen flex bg-gray-200">
      <div className="p-8">
        <Sidebarmenu />
      </div>
      <div className="w-full p-8">
        <Navbar title="Attendance  Histori"/>
        <TableAttendanceHistory/>
      </div>
    </div>
  );
};
export default AttendanceHistoryUser;
