import { Button, Datepicker, Flowbite, TextInput } from "flowbite-react";
import { flowbiteTheme } from "../../../../lib/flowbiteTheme";
import { format, subMonths } from "date-fns";
import { useState } from "react";

const AttendanceHistoryHeaderUser = ({ searchKeyword, setSearchKeyword, presenceData, setFilteredPresence }) => {
    const [fromDate, setFromDate] = useState('');
    const [untilDate, setUntilDate] = useState('');

    const handleFilter = () => {
        if (fromDate && untilDate) {
            const awalHari = new Date(fromDate);
            awalHari.setHours(0, 0, 0, 0);

            const akhirHari = new Date(untilDate);
            akhirHari.setHours(23, 59, 59, 999);

            const filteredPresence = presenceData?.filter((item) => {
                const itemDate = new Date(item.createdAt);
                return itemDate >= awalHari && itemDate <= akhirHari;
            })
            setFilteredPresence(filteredPresence);
        }
    }

    const handleClear = () => {
        setFilteredPresence(presenceData);
        setFromDate('');
        setUntilDate('');
    }

    return (
        <div className="flex flex-col w-full bg-white rounded-lg laptop:p-5 laptop:gap-2 hp:p-3 hp:flex-col hp:gap-4">
            <div>
                <h1 className="text-lg font-semibold">Filter By Date</h1>
            </div>
            <div className="laptop:w-2/3 hp:w-full flex hp:flex-col hp:gap-3 items-start">
                <Flowbite theme={{ theme: flowbiteTheme }}>
                    <div className="laptop:w-2/5 hp:w-full flex items-center">
                        <p className="w-1/6">From :</p>
                        <Datepicker
                            className="laptop:w-3/4 hp:w-full"
                            value={fromDate}
                            onSelectedDateChanged={date => setFromDate(format(date, 'MMMM dd,yyyy'))}
                            showClearButton={false}
                            placeholder="Select From Date"
                        />
                    </div>
                    <div className="laptop:w-2/5 hp:w-full flex items-center">
                        <p className="w-1/6">Until :</p>
                        <Datepicker
                            className="laptop:w-3/4 hp:w-full"
                            value={untilDate}
                            onSelectedDateChanged={date => setUntilDate(format(date, 'MMMM dd,yyyy'))}
                            showClearButton={false}
                            placeholder="Select Until Date"
                        />
                    </div>
                    <div className="laptop:w-1/4 hp:w-full flex hp:flex-row-reverse hp:justify-start gap-2">
                        <Button color="primary" className="w-1/3" onClick={handleFilter}>Filter</Button>
                        <Button color="gray" className="w-1/3" onClick={handleClear}>Clear</Button>
                    </div>
                </Flowbite>
            </div>
        </div>
    )
}
export default AttendanceHistoryHeaderUser;