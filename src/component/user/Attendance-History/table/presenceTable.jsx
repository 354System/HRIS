import { format } from "date-fns";
import { useEffect } from "react";

const PresenceTableUser = ({ Presence }) => {

    Presence?.forEach(presenceData => {
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

    function checkInStyle(data) {
        if (data.absen === 'Absent') {
            return 'text-[#AA0000]';
        } else if (data.absen === 'Work from Office' || data.type === 'Late') {
            return 'text-[#D5B500]';
        } else {
            return 'text-purple';
        }
    }

    function statusStyle(data) {
        if (data.absen === 'Absent') {
            return 'bg-red-100 text-[#AA0000]';
        } else if (data.type === 'Present') {
            return 'text-purple bg-[#E6EFFC]';
        } else if (data.type === 'Late') {
            return 'text-[#D5B500] bg-[#FFF8E7]';
        } else {
            return 'bg-[#E6EFFC] text-purple';
        }
    }

    return (
        <table className="w-full text-center">
            <thead>
                <tr className="border-b-4 border-t-2 text-grey">
                    <th className="p-4">No</th>
                    <th className="p-4">Date</th>
                    <th className="text-center">Status</th>
                    <th className="">Check-In</th>
                    <th className="">Check-Out</th>
                    <th className="">Work hours</th>
                </tr>
            </thead>
            <tbody>
                {Presence ? Presence?.map((data, index) => (
                    <tr key={index} className="border-b font-semibold">
                        <td>{index + 1}</td>
                        <td className=" p-4 max-w-[90px]">{format(new Date(data.date), 'dd-MM-yyyy')}</td>
                        <td>
                            <span className={`${statusStyle(data)} p-2`}>{data.absen}</span>
                        </td>
                        <td className={`${checkInStyle(data)}`}>{format(new Date(data.checkin), 'HH:mm')}</td>
                        <td className="text-purple text-lg">
                            {data.checkout ? format(new Date(data.checkout), 'HH:mm') : '-:-:-'}
                        </td>
                        <td className="text-primary">{data.workHours}</td>
                    </tr>
                )) : null}
            </tbody>
        </table>
    )
}
export default PresenceTableUser;