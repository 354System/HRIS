import { RiSettings3Fill } from 'react-icons/ri'
import { BsSun } from 'react-icons/bs'
import { useState, useEffect } from "react"
import { format } from 'date-fns';
const RealtimeBoxAdmin = () => {

    const [realtime, setRealtime] = useState('');
    const [date, setDate] = useState('');

    const updateRealtime = () => {
        const now = new Date();
        const timeFormatted = format(now, 'HH:mm:ss a');
        setRealtime(timeFormatted);

        const dateFormatted = format(now, 'dd MMMM yyyy');
        setDate(dateFormatted);
    }
    useEffect(() => {
        setInterval(() => {
            updateRealtime();
        }, 1000);
    }, []);

    return (
        <div className="w-64 h-full bg-white rounded flex flex-col justify-between items-center p-4">
            <div className="flex gap-4 w-full items-center">
                <BsSun size={50} className="text-purple" />
                <div className="flex flex-col w-full">
                    <span className="font-black text-2xl text-primary ">{realtime}</span>
                    <span className="text-xs font-medium text-primary">
                        Realtime Insight
                    </span>
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
export default RealtimeBoxAdmin