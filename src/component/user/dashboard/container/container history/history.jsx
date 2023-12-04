import React from "react";
import { Spinner } from "@chakra-ui/react";
import { format } from "date-fns";

const HistoryDashboard = ({ presence }) => {

  presence?.forEach(presenceData => {
    const checkIn = new Date(presenceData.checkin);
    const checkOut = new Date(presenceData.checkout);

    // Menghitung workhours
    const workHoursResult = checkOut - checkIn;
    const hours = Math.floor(workHoursResult / 3600000);
    const minutes = Math.floor((workHoursResult % 3600000) / 60000);
    const workHours = `${hours}h ${minutes}m`;
    // Menambahkan properti workHours ke objek Presence yang ada
    presenceData.workHours = workHours;
  });

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7); // Menghitung tanggal seminggu yang lalu

  const filteredPresence = presence?.filter((item) => {
    const itemDate = new Date(item.checkin);
    return itemDate >= oneWeekAgo;
  });

  function statusStyle(data) {
    if (data.type === 'Absent') {
      return 'bg-red/20 text-red p-1';
    } else if (data.type === 'Present') {
      return 'text-purple bg-purple/20 p-1';
    } else if (data.type === 'Late') {
      return 'text-yellow bg-yellow/20 p-1';
    } else {
      return 'bg-[#E6EFFC] text-purple';
    }
  }

  function checkInStyle(data) {
    if (data.type === 'Absent') {
      return 'text-red';
    } else if (data.type === 'Work from Office' || data.type === 'Late') {
      return 'text-yellow';
    } else {
      return 'text-purple';
    }
  }

  return (
    <div className="hp:w-[600px] bg-white p-5 mt-5 rounded-lg overflow-x-auto">
      <div className="flex justify-between items-center p-3">
        <h1 className="text-xl font-bold">Attendance History Weekly</h1>
      </div>
      <div className="mt-2">
        <table className="w-full">
          <thead>
            <tr className="hp:text-base laptop:border-b-4 laptop:border-t-2 hp:bg-gray-100 text-grey text-left">
              <th className="laptop:p-4 hp:p-3">No</th>
              <th>Date</th>
              <th>Status</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Work hours</th>
            </tr>
          </thead>
          <tbody>
            {filteredPresence ? filteredPresence?.map((data, index) => (
              <tr key={index} className="border-b hp:text-base">
                <td className="text-primary laptop:p-4 hp:p-3">{index + 1}</td>
                <td className="text-primary">{format(new Date(data.date), 'dd-MM-yyyy')}</td>
                <td className="bg-white"><span className={`text-purple bg-[#E6EFFC] ${statusStyle(data)}`}>{data.absen}</span></td>
                <td className={`text-purple ${checkInStyle(data)}`}>{data.checkin ? format(new Date(data.checkin), 'HH:mm') : '-:-:-'}</td>
                <td className="text-purple">{data.checkout ? format(new Date(data.checkout), 'HH:mm') : '-:-:-'}</td>
                <td className="text-primary">{data.workHours === 'NaNh NaNm' ? '-:-:-' : data.workHours}</td>
              </tr>
            )) : <Spinner size={20} />}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryDashboard;
