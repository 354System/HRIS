import { RiSettings3Fill } from 'react-icons/ri'
import { BsSun } from 'react-icons/bs'
import { useState, useEffect } from "react"
export function RealtimeInsightBox() {

    const [realtime, setRealtime] = useState('');
    const [date, setDate] = useState('');

    const updateRealtime = () => {
        const time = new Date();
        let hours = time.getHours();
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const second = time.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const timeFormatted = `${hours}:${minutes}:${second} ${ampm}`;
        setRealtime(timeFormatted);

        const year = time.getFullYear();
        const month = time.toLocaleString('default', { month: 'long' });
        const day = time.getDate().toString().padStart(2, '0');
        const dateFormatted = `${day} ${month} ${year}`;
        setDate(dateFormatted);
    }
    useEffect(() => {
        setInterval(() => {
            updateRealtime();
        }, 1000);
    }, []);

    return (
        <div className="laptop:w-72 laptop:h-full bg-white rounded flex flex-col laptop:justify-between items-center p-10  hp:w-96">
            <div className="flex gap-4 w-full items-center">
                <BsSun size={50} className='text-purple' />
                <div className="flex flex-col w-full">
                    <span className="font-black text-2xl text-primary tracking-wider">{realtime}</span>
                    <span className="text-xs font-medium text-primary">Realtime Insight</span>
                </div>
            </div>
            <div>
                <div className="flex flex-col mb-4">
                    <span className="text-lg text-primary">Time Attendance</span>
                    <span className="text-lg text-primary font-bold">09:00</span>
                </div>
                <div className="flex flex-col mb-4">
                    <span className="text-lg text-primary">Today:</span>
                    <span className="text-lg text-primary font-bold">{date}</span>
                </div>
                <div>
                    <button className="w-full h-8 flex items-center rounded p-3 bg-purple ">
                        <RiSettings3Fill className="mr-2 text-white" />
                        <span className="text-white text-xs font-medium">Advance Configuration</span>
                    </button>
                </div>
            </div>
        </div>
    )
}