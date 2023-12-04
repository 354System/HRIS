import React, { useState } from "react";
import AttendanceHistoryUserBody from "./table/AttendanceHistoryUserBody";
const TableAttendanceHistory = () => {
  return (
    <div className="bg-white w-full rounded-lg hp:overflow-x-auto">
      <AttendanceHistoryUserBody />
    </div>
  );
};

export default TableAttendanceHistory;