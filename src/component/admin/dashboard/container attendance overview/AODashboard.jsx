import { FiSearch } from 'react-icons/fi'
import { DataKaryawan } from '../../../../mockdata/DataKaryawan'
import { DataAbsensi } from '../../../../mockdata/DataAbsensi'
import { useState, useEffect } from 'react';

const AODashboard = () => {

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
        <div className="w-full p-5  laptop:bg-white laptop:p-5 laptop:mt-5 laptop:rounded-lg hp:bg-white">
            <div className="laptop:flex justify-between laptop:mt-8 hp:mt-4 laptop:text-2xl hp:text-xl laptop:font-bold  hp:font-bold gap-y-4 hp:flex hp:flex-col">
                <h1 className="">Attendance Overview Today</h1>
                <div className="relative flex items-center gap-x-6">
                    <div>
                        <input
                            type="text"
                            id="search"
                            placeholder="Quick Search..."
                            className="laptop:w-96 hp:w-60 h-10 pl-10 bg-white border-2 border-[#D5D9DD] text-sm placeholder:text-grey rounded"
                        />
                    </div>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch color='#9295AB' size={18} />
                    </div>
                </div>
            </div>
            <div className="w-full laptop:mt-10 hp:mt-6 hp:overflow-x-auto">
                <table className="hp:w-[900px] laptop:w-full">
                    <thead>
                        <tr className="hp:text-base laptop:border-b-4 laptop:border-t-2 hp:bg-gray-100 text-grey text-left">
                            <th className="laptop:p-4 hp:p-3">ID</th>
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
                                    <td className="text-primary laptop:p-4 hp:p-3">{item.id}</td>
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
            </div>
        </div>
    )
}
export default AODashboard