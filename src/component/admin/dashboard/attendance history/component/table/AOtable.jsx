import { Spinner } from "@chakra-ui/react";
import { format } from "date-fns";

const AOTableDashboard = ({ data }) => {

    const dataToday = data?.filter((data) => {
        const today = format(new Date(), "yyyy-MM-dd");
        const dataToday = format(new Date(data.createdAt), "yyyy-MM-dd");
        return dataToday === today;
    })

    dataToday?.forEach(presenceData => {
        const checkIn = new Date(presenceData.checkin);
        const checkOut = new Date(presenceData.checkout);

        // Menghitung workhours
        const workHoursResult = checkOut - checkIn;
        const hours = Math.floor(workHoursResult / 3600000);
        const minutes = Math.floor((workHoursResult % 3600000) / 60000);
        const workHours = `${hours}h ${minutes}m`;

        // Menambahkan properti workHours ke objek Presence yang ada
        data.workHours = workHours;
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
            return 'bg-red-100 text-[#AA0000] p-2';
        } else if (data.type === 'Present') {
            return 'text-purple bg-[#E6EFFC] p-2';
        } else if (data.type === 'Late') {
            return 'text-[#D5B500] bg-[#FFF8E7] p-2';
        } else {
            return 'bg-[#E6EFFC] text-purple p-2';
        }
    }
    return (
        <table className="w-full">
            <thead>
                <tr className=" border-b-4 border-t-2 text-primary">
                    <th className="text-start p-4">No</th>
                    <th className="text-start p-4">Employee</th>
                    <th className="text-start p-4">Role</th>
                    <th className="text-start p-4">Departement</th>
                    <th className="text-start p-4">Date</th>
                    <th className="text-start p-4">Status</th>
                    <th className="text-center p-4">Check-In</th>
                    <th className="text-center p-4">Check-Out</th>
                    <th className="text-center p-4">Work Hours</th>
                </tr>
            </thead>
            <tbody>
                {dataToday ?
                    dataToday.map((item, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-4 text-primary">{index + 1}</td>
                            <td className="p-4 w-52 text-primary">{item.user?.name}</td>
                            <td className="p-4  text-primary">{item.user?.position}</td>
                            <td className="p-4 text-primary">{item.user?.divisi}</td>
                            <td className="p-4  text-primary">{format(new Date(item.createdAt), 'dd-MM-yyyy')}</td>
                            <td><span className={`${statusStyle(item)}`}>{item.absen}</span></td>
                            <td className={`${checkInStyle(item)} text-center`}>{item.checkin ? format(new Date(item.checkin), 'HH:mm') : '-:-:-'}</td>
                            <td className="p-4 text-purple text-center">{item.checkout ? format(new Date(item.checkout), 'HH:mm') : '-:-:-'}</td>
                            <td className="p-4 text-center text-primary">{item.workHours ? item.workHours : '-'}</td>
                        </tr>
                    )) : <Spinner size={30} />}
            </tbody>
        </table>
    )
}
export default AOTableDashboard