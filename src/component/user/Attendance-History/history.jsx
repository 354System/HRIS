import React, { useEffect, useState } from "react";
import AttendanceHistoryUserBody from "./table/AttendanceHistoryUserBody";
import AttendanceHistoryHeaderUser from "./component/AttendanceHistoryHeader";
import { usePresenceCurrentUser } from "../../../api/fetchDataCurrentUser/useFetchPresence";
const TableAttendanceHistory = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredPresence, setFilteredPresence] = useState(null);
  const { data: presenceData } = usePresenceCurrentUser()

  presenceData?.forEach(presence => {
    const checkIn = new Date(presence.checkin);
    const checkOut = new Date(presence.checkout);

    // Menghitung workhours
    const workHoursResult = checkOut - checkIn;
    const hours = Math.floor(workHoursResult / 3600000);
    const minutes = Math.floor((workHoursResult % 3600000) / 60000);
    const workHours = `${hours}h ${minutes}m`;

    // Menambahkan properti workHours ke objek Presence yang ada
    presence.workHours = workHours;
  });

  // default value
  useEffect(() => {
    setFilteredPresence(presenceData);
  }, [presenceData]);

  return (
    <div className="bg-white w-full rounded-lg">
      <AttendanceHistoryHeaderUser searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} presenceData={presenceData} setFilteredPresence={setFilteredPresence} />
      <AttendanceHistoryUserBody searchKeyword={searchKeyword} filteredPresence={filteredPresence} />
    </div>
  );
};

export default TableAttendanceHistory;