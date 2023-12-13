import React, { useState } from "react";
import { Navbar } from "../../component/bar/Navbar";
import { Sidebarmenu } from "../../component/bar/Sidebarmenu";
import TableAttendanceHistory from "../../component/user/Attendance-History/history";
const AttendanceHistoryUser = () => {
  const [sideBarMenu, setSideBarMenu] = useState(false);
  return (
    <div className="absolute bg-gray-300 min-h-screen w-full">
      <Navbar sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
      <Sidebarmenu sideBarMenu={sideBarMenu} setSideBarMenu={setSideBarMenu} />
      <div className="laptop:p-7 hp:p-3 laptop:mt-28 hp:mt-24 laptop:pl-28 w-full ">
        <TableAttendanceHistory />
      </div>
    </div> 
  );
};
export default AttendanceHistoryUser;
