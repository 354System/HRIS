import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { format, subMonths } from 'date-fns';
import { Datepicker, Flowbite } from 'flowbite-react';
import { flowbiteTheme } from '../../../../../lib/flowbiteTheme';

const TADheader = ({ setStartDate, setEndDate, startDate, endDate, refetch }) => {

    const handleFilter = () => {
        refetch()
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
        <div className="flex flex-col laptop:justify-between laptop:h-32">
            <div className='gap-4 hp:mb-4'>
                <h1 className="text-xl font-bold ml-2">Attendance Overview</h1>
                <h1 className="text-base font-bold ml-2">{format(startDate, 'dd MMMM yyyy')} - {format(endDate, 'dd MMMM yyyy')}</h1>
            </div>
            <div className='flex hp:flex-col h-14 laptop:items-center ml-2 hp:gap-2'>
                <p>From Date :</p>
                <Flowbite theme={{ theme: flowbiteTheme }}>
                    <Datepicker
                        value={format(startDate, 'MMMM dd,yyyy')}
                        dayClassName={dayClassName}
                        onSelectedDateChanged={date => setStartDate(date)}
                        className=' cursor-pointer w-44 focus:outline-none laptop:ml-2'
                    />
                    <p className='laptop:ml-2 '>To Date :</p>
                    <Datepicker
                        value={format(endDate, 'MMMM dd,yyyy')}
                        dayClassName={dayClassName}
                        onSelectedDateChanged={date => setEndDate(date)}
                        className=' cursor-pointer w-44 focus:outline-none laptop:ml-2'
                    />
                </Flowbite>
                <button onClick={handleFilter} className='bg-primary hover:bg-primary-dark transition-colors duration-200 text-white font-bold py-2 px-4 rounded laptop:ml-3'>Filter</button>
            </div>
        </div>
    );
}

export default TADheader;
