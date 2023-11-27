import React, { useState } from "react";
import AttendanceHistoryUserBody from "./table/AttendanceHistoryUserBody";
const TableAttendanceHistory = () => {
  return (
    <div className="bg-white w-full rounded-lg">
      <AttendanceHistoryUserBody />
    </div>
  );
};

export default TableAttendanceHistory;