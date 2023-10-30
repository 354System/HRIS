import React from "react";
import UserHistori from "../../component/user/component Histori-User/User-Histori";
import { Sidebarmenu } from "../../component/Sidebarmenu";
import { Navbar } from "../../component/Navbar";

const AttendanceHistory = () => {
  return (
    <div className="w-full min-h-screen flex bg-gray-200">
      <div className="p-8">
        <Sidebarmenu />
      </div>
      <div className="w-full p-8">
        <Navbar title="Attendance  Histori"/>
        <UserHistori/>
      </div>
    </div>
  );
};
export default AttendanceHistory;
