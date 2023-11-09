import { FiSearch } from 'react-icons/fi'
import { useState, useEffect } from 'react';
import { DataAbsensi } from '../../../../../../mockdata/DataAbsensi';
import { DataKaryawan } from '../../../../../../mockdata/DataKaryawan';

const AOTableDashboard = () => {

    const [absensi, setAbsensi] = useState([]);

    useEffect(() => {
        const combinedData = DataAbsensi.map((absen) => {
            const karyawan = DataKaryawan.find((karyawan) => karyawan.id === absen.id);
            const { employe, divisi, departement } = karyawan || {};
            const { id, ket, checkIn, checkOut, date } = absen || {};

            const entry = new Date(checkIn);
            const out = new Date(checkOut);
            const workHoursResult = out - entry;
            const hours = Math.floor(workHoursResult / 3600000);
            const minutes = Math.floor((workHoursResult % 3600000) / 60000);

            const workHours = `${hours}h ${minutes}m`;
            const lateArrival = entry.getHours() > 9 || (entry.getHours() === 9 && entry.getMinutes() > 30);
            const status = lateArrival ? 'Late Arrival' : absen.status;

            return {
                id,
                employe,
                ket,
                divisi,
                departement,
                checkIn,
                checkOut,
                workHours,
                status,
                date,
            };
        });
        setAbsensi(combinedData);
    }, []); // Gunakan array dependencies kosong agar kode ini hanya dijalankan sekali

    return (
        <table className="w-full mt-10">
            <thead>
                <tr className=" border-b-4 border-t-2 text-primary">
                    <th className="text-start p-4">ID</th>
                    <th className="text-start">Employee</th>
                    <th className="text-start">Role</th>
                    <th className="text-start">Departement</th>
                    <th className="text-start">Date</th>
                    <th className="text-start">Status</th>
                    <th className="text-center">Check-In</th>
                    <th className="text-center">Check-Out</th>
                    <th className="text-center">Work Hours</th>
                </tr>
            </thead>
            <tbody>
                {absensi &&
                    absensi.slice(-6).map((item) => (
                        <tr key={item.id} className="border-b">
                            <td className="p-4 text-primary">{item.id}</td>
                            <td className="text-primary">{item.employe}</td>
                            <td className="text-primary">{item.divisi}</td>
                            <td className=" text-primary">{item.departement}</td>
                            <td className=" text-primary">{item.date}</td>
                            <td className=""><span className={`p-2 text-sm 
                                            ${item.status === 'Absent' ? 'bg-red-100 text-[#AA0000]' :
                                    item.status === 'Late Arrival' ? 'text-[#D5B500] bg-[#FFF8E7]' :
                                        item.status === 'Work from Office' ? 'text-purple' : 'bg-[#E6EFFC] text-purple'}`}>
                                {item.status}
                            </span></td>
                            <td className={` text-sm text-center
                                            ${item.status === 'Absent' ? 'text-[#AA0000]' :
                                    item.status === 'Late Arrival' ? 'text-[#D5B500]' :
                                        item.status === 'Work from Office' ? 'text-purple' : 'text-purple'}`}>
                                {item.checkIn.slice(12)}
                            </td>
                            <td className={`text-sm text-center
                                            ${item.status === 'Absent' ? 'text-[#AA0000]' :
                                    item.status === 'Late Arrival' ? 'text-[#D5B500] ' :
                                        item.status === 'Work from Office' ? 'text-purple' : 'text-purple'}`}>
                                {item.checkOut.slice(12)}
                            </td>
                            <td className="text-center text-primary">{item.workHours}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
    )
}
export default AOTableDashboard