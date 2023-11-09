import { useState, useEffect } from "react";
import { DataAbsensi } from "../../../../mockdata/DataAbsensi";
import { DataKaryawan } from "../../../../mockdata/DataKaryawan";
import AOTableHeader from "../component/AOTableHeader";
import Pagination from "../filtering/pagination";
const AOtable = () => {
    //data yang sudah dicombine
    const [absensi, setAbsensi] = useState([]);
    //data yang sudah diubah dari data yang terbaru
    const [sortData, setSortData] = useState([])
    //data fitur pagination
    const [currentItems, setCurrentItems] = useState()

    //combined data
    useEffect(() => {
        //menggabungkan data absensi dan data karyawan
        const combinedData = DataAbsensi.map((absen) => {
            const karyawan = DataKaryawan.find((karyawan) => karyawan.id === absen.id);
            //mengambil beberapa data karyawan
            const { employe, divisi, departement } = karyawan || {};
            //mengambil beberapa data absensi
            const { id, ket, date, status } = absen || {};

            const checkIn = new Date(absen.checkIn);
            const checkOut = new Date(absen.checkOut);

            //menghitung workhours
            const workHoursResult = checkOut - checkIn;
            const hours = Math.floor(workHoursResult / 3600000);
            const minutes = Math.floor((workHoursResult % 3600000) / 60000);
            const workHours = `${hours}h ${minutes}m`;

            //data yang akan dimasukan kedalam function combinedData
            return {
                id,
                employe,
                ket,
                divisi,
                departement,
                checkIn,
                checkOut,
                status,
                workHours,
                date,
            };
        });
        setAbsensi(combinedData);
    }, []);

    // Fungsi untuk mengurutkan dan memfilter data absensi berdasarkan tanggal terbaru
    function sortAndFilterAbsensi(absensi) {
        // Mengambil tanggal hari ini
        const today = new Date();

        // Mengurutkan array absensi berdasarkan tanggal (tanggal terbaru ke yang terlama)
        absensi.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        // Filter array absensi untuk hanya mendapatkan tanggal sebelum hari ini
        const absensiSebelumHariIni = absensi.filter((item) => {
            const itemDate = new Date(item.date);
            return itemDate < today;
        });

        return absensiSebelumHariIni;
    }

    useEffect(() => {
        // Memperbarui sortData ketika absensiSebelumHariIni berubah
        const sortedData = sortAndFilterAbsensi(absensi);
        setSortData(sortedData);
    }, [absensi]);

    //function style
    function statusStyle(item) {
        const checkIn = new Date(item.checkIn);
        const lateArrival = checkIn.getHours() > 9 || (checkIn.getHours() === 9 && checkIn.getMinutes() > 30);
        if (item.status === 'Absent') {
            return 'bg-red-100 text-[#AA0000]';
        } else if (item.status === 'Work from Office' && 'Work from Home') {
            return 'text-purple bg-[#E6EFFC]';
        } else if (item.status === 'Work From Office' && 'Work from Home' && lateArrival) {
            return 'text-[#D5B500] bg-[#FFF8E7]';
        } else if (item.status === 'Sick') {
            return 'text-[#D5B500] bg-[#FFF8E7]';
        } else {
            return 'bg-[#E6EFFC] text-purple';
        }
    }
    function checkInStyle(item) {
        const checkIn = new Date(item.checkIn);
        const lateArrival = checkIn.getHours() > 9 || (checkIn.getHours() === 9 && checkIn.getMinutes() > 30);
        if (item.status === 'Absent') {
            return 'text-[#AA0000]';
        } else if (lateArrival) {
            return 'text-[#D5B500]';
        } else if (item.status === 'Work from Office') {
            return 'text-purple';
        } else {
            return 'text-purple';
        }
    }
    function checkOutStyle(item) {
        if (item.status === 'Absent') {
            return 'text-[#AA0000]';
        } else if (item.status === 'Work from Office') {
            return 'text-purple';
        } else {
            return 'text-purple';
        }
    }
    
    function checkInCondition(item) {
        if (item.status === 'Sick') {
            return '';
        } else {
            return item.checkIn.toLocaleTimeString().slice(0, 5);
        }
    }
    function checkOutCondition(item) {
        if (item.status === 'Sick') {
            return '';
        } else {
            return item.checkOut.toLocaleTimeString().slice(0, 5);
        }
    }
    function getWorkHours(item) {
        if (item.status === 'Sick' || item.status === 'Absent') {
            return '0m';
        } else {
            return item.workHours;
        }
    }

    const [searchKeyword, setSearchKeyword] = useState('')

    let displayedAbsensiData = currentItems; // Menampilkan semua data sebelum pencarian

    if (searchKeyword.trim() !== '') {
        displayedAbsensiData = sortData.filter((item) => {
            return item.employe.toLowerCase().includes(searchKeyword.toLowerCase());
        });
    }

    return (
        <div className="bg-white h-full">
            <AOTableHeader searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
            <div className="h-4/5">
                <table className="w-full bg-white">
                    <thead>
                        <tr className=" border-b-4 border-t-2 text-primary">
                            <th className="text-start p-5">ID</th>
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
                        {displayedAbsensiData &&
                            displayedAbsensiData.map((item, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-8 text-primary">{item.id}</td>
                                    <td className="text-primary">{item.employe}</td>
                                    <td className="text-primary">{item.divisi}</td>
                                    <td className=" text-primary">{item.departement}</td>
                                    <td className=" text-primary">{item.date}</td>
                                    <td className="">
                                        <span className={`p-2 text-sm ${statusStyle(item)}`}>{item.status}</span>
                                    </td>
                                    <td className={`text-sm text-center ${checkInStyle(item)}`}>{checkInCondition(item)}</td>
                                    <td className={`text-sm text-center ${checkOutStyle(item)}`}>{checkOutCondition(item)}</td>
                                    <td className="text-center text-primary">{getWorkHours(item)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <Pagination sortData={sortData} setCurrentItems={setCurrentItems} />
        </div>
    )
}
export default AOtable