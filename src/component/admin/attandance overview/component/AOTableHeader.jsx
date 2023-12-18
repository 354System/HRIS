import { Button, Datepicker, Flowbite, TextInput } from "flowbite-react";
import { flowbiteTheme } from "../../../../lib/flowbiteTheme";
import { format } from "date-fns";
import { IoIosSearch } from "react-icons/io";
import { RiFileExcel2Fill } from "react-icons/ri";
import * as XLSX from "xlsx"

const AOTableHeader = ({ presenceData, refetchPresence, currentPage, setCurrentPage, searchKeyword, setSearchKeyword, startDate, endDate, setStartDate, setEndDate }) => {

    const handleFilter = () => {
        setCurrentPage({
            page: currentPage.page,
            pageSearch: null,
            pageFilter: 1,
            all: null
        });
        refetchPresence();
    }

    const handleClear = () => {
        setCurrentPage({
            page: currentPage.page,
            all: null
        });
        setSearchKeyword('');
        setStartDate('');
        setEndDate('');
        refetchPresence()
    }

    const handleSearch = () => {
        setCurrentPage({
            pageSearch: 1,
            all: null
        });
        refetchPresence();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const flattenObject = (obj, prefix = '') => {
        const result = {};
        for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                Object.assign(result, flattenObject(obj[key], `${prefix}${key}_`));
            } else {
                result[`${prefix}${key}`] = obj[key];
            }
        }
        return result;
    };

    const handleExportToExcel = () => {
        const flattenedData = presenceData?.absensi?.map(presence => flattenObject(presence));
        var workbook = XLSX.utils.book_new();
        var worksheet = XLSX.utils.json_to_sheet(flattenedData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data Absensi");
        XLSX.writeFile(workbook, "DataAbsensi.xlsx");
    }

    return (
        <div className="flex flex-col w-full bg-white rounded-lg laptop:p-5 laptop:gap-2 hp:p-3 hp:flex-col hp:gap-4">
            <div>
                <h1 className="text-lg font-semibold">Filter By Date</h1>
            </div>
            <Flowbite theme={{ theme: flowbiteTheme }}>
                <div className="w-full flex gap-5 hp:flex-col">
                    <div className="laptop:w-3/5 hp:w-full flex hp:flex-col hp:gap-3 items-start">
                        <div className="laptop:w-2/5 hp:w-2/3 flex items-center">
                            <p className="laptop:w-1/6 hp:w-1/4">From :</p>
                            <Datepicker
                                className="laptop:w-3/4 hp:w-3/4"
                                value={startDate}
                                onSelectedDateChanged={date => setStartDate(format(date, 'MMMM dd,yyyy'))}
                                showClearButton={false}
                                placeholder="Select From Date"
                            />
                        </div>
                        <div className="laptop:w-2/5 hp:w-2/3 flex items-center">
                            <p className="laptop:w-1/6 hp:w-1/4">Until :</p>
                            <Datepicker
                                className="laptop:w-3/4 hp:w-3/4"
                                value={endDate}
                                onSelectedDateChanged={date => setEndDate(format(date, 'MMMM dd,yyyy'))}
                                showClearButton={false}
                                placeholder="Select Until Date"
                            />
                        </div>
                        <div className="laptop:w-1/5 hp:w-1/3 flex hp:flex-row-reverse hp:justify-start">
                            <Button disabled={!startDate || !endDate} color="primary2" className="w-full" onClick={handleFilter}>Filter</Button>
                        </div>
                    </div>
                    <div className="flex laptop:w-[40%] gap-2 flex-col">
                        <div className="flex w-full gap-3">
                            <TextInput icon={IoIosSearch} onKeyDown={handleKeyDown} id="searchKeyword" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Quick Search..." className="w-4/5" />
                            <Button color="primary2" onClick={handleSearch} className="w-1/5">Search</Button>
                        </div>
                        <div className="w-full flex justify-end">
                            <div className="w-full h-10 flex justify-end">
                                <Button onClick={handleExportToExcel} color="green-dark" className="laptop:w-2/4">
                                    <RiFileExcel2Fill size={20} color="white" />
                                    <p className="text-sm text-white font-bold">Export to Excel</p>
                                </Button>
                            </div>
                            <Button color="primary" className="laptop:w-2/5 ml-4" onClick={handleClear}>Clear</Button>
                        </div>
                    </div>
                </div>
            </Flowbite>
        </div>
    )
}
export default AOTableHeader;