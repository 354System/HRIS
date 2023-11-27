import React, { useState } from 'react';
import { SlCalender } from 'react-icons/sl';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, subMonths } from 'date-fns';

const TADheader = ({ presenceData, permissionData, paidLeaveData, setFilteredPresence, setFilteredPermission, setFilteredPaidLeave }) => {
    const [startDate, setStartDate] = useState(subMonths(new Date(), 1)); // Default sebulan yang lalu
    const [endDate, setEndDate] = useState(new Date());

    const handleFilter = () => {
        // Kloning startDate dan atur waktu menjadi awal hari (tengah malam)
        const awalHari = new Date(startDate);
        awalHari.setHours(0, 0, 0, 0);

        // Kloning endDate dan atur waktu menjadi akhir hari (11:59:59 PM)
        const akhirHari = new Date(endDate);
        akhirHari.setHours(23, 59, 59, 999);

        const filteredPresence = presenceData?.filter((item) => {
            const itemDate = new Date(item.createdAt);
            return itemDate >= awalHari && itemDate <= akhirHari;
        });
        setFilteredPresence(filteredPresence);

        const filteredPermission = permissionData?.filter((item) => {
            const itemDate = new Date(item.createdAt);
            return itemDate >= awalHari && itemDate <= akhirHari;
        });
        setFilteredPermission(filteredPermission);

        const filteredPaidLeave = paidLeaveData?.filter((item) => {
            const itemDate = new Date(item.createdAt);
            return itemDate >= awalHari && itemDate <= akhirHari;
        });
        setFilteredPaidLeave(filteredPaidLeave);
    };

    const dayClassName = (date) => {
        if (date.toDateString() === startDate.toDateString()) {
            return 'bg-primary hover:bg-primary-dark text-white';
        } else if (date.toDateString() === endDate.toDateString()) {
            return 'bg-primary hover:bg-primary-dark text-white';
        } else
            return 'hover:bg-primary-light rounded hover:text-white transition-colors duration-300';
    }

    return (
        <div className="flex flex-col justify-between h-32 mb-5">
            <div className='gap-4'>
                <h1 className="text-xl font-bold ml-2">Attendance Overview</h1>
                <h1 className="text-base font-bold ml-2">{format(startDate, 'dd MMMM yyyy')} - {format(endDate, 'dd MMMM yyyy')}</h1>
            </div>
            <div className='flex h-14 items-center ml-2'>
                <p>From Date :</p>
                <div className="flex items-center justify-center w-32 h-10 ml-2 rounded-lg bg-gray border border-gray-dark focus-within:border-2 focus-within:border-primary hover:bg-gray-300 transition-colors duration-200">
                    <SlCalender size={20} fontFamily='primary' />
                    <ReactDatePicker
                        selected={startDate}
                        dayClassName={dayClassName}
                        onChange={date => setStartDate(date)}
                        dateFormat="dd/MM/yyyy" // Format tanggal yang diinginkan
                        className='bg-transparent cursor-pointer w-24 p-1 focus:outline-none'
                    />
                </div>
                <p className='ml-2'>to Date :</p>
                <div className="flex items-center justify-center w-32 h-10 ml-2 rounded-lg bg-gray border border-gray-dark focus-within:border-2 focus-within:border-primary hover:bg-gray-300 transition-colors duration-200">
                    <SlCalender size={20} fontFamily='primary' />
                    <ReactDatePicker
                        selected={endDate}
                        dayClassName={dayClassName}
                        onChange={date => setEndDate(date)}
                        dateFormat="dd/MM/yyyy" // Format tanggal yang diinginkan
                        className='bg-transparent cursor-pointer w-24 p-1 focus:outline-none'
                    />
                </div>
                <button onClick={handleFilter} className='bg-primary hover:bg-primary-dark transition-colors duration-200 text-white font-bold py-2 px-4 rounded ml-3'>Filter</button>
            </div>
        </div>
    );
}

export default TADheader;
