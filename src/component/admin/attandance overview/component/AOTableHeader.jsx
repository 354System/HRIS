import { Button, Datepicker, Flowbite, TextInput } from "flowbite-react";
import { flowbiteTheme } from "../../../../lib/flowbiteTheme";
import { format } from "date-fns";
import { IoIosSearch } from "react-icons/io";

const AOTableHeader = ({ refetchPresence, currentPage, setCurrentPage, searchKeyword, setSearchKeyword, startDate, endDate, setStartDate, setEndDate }) => {

    const handleFilter = () => {
        setCurrentPage({
            page: currentPage.page,
            pageSearch: null,
            pageFilter: 1,
            all: null
        });
        refetchPresence();  // Refetch dengan parameter terakhir (currentPage)
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

    return (
        <div className="flex flex-col w-full bg-white rounded-lg laptop:p-5 laptop:gap-2 hp:p-3 hp:flex-col hp:gap-4">
            <div>
                <h1 className="text-lg font-semibold">Filter By Date</h1>
            </div>
            <Flowbite theme={{ theme: flowbiteTheme }}>
                <div className="w-full flex gap-5">
                    <div className="laptop:w-3/5 hp:w-full flex hp:flex-col hp:gap-3 items-start">
                        <div className="laptop:w-2/5 hp:w-full flex items-center">
                            <p className="w-1/6">From :</p>
                            <Datepicker
                                className="laptop:w-3/4 hp:w-full"
                                value={startDate}
                                onSelectedDateChanged={date => setStartDate(format(date, 'MMMM dd,yyyy'))}
                                showClearButton={false}
                                placeholder="Select From Date"
                            />
                        </div>
                        <div className="laptop:w-2/5 hp:w-full flex items-center gap-3">
                            <p className="w-1/6">Until :</p>
                            <Datepicker
                                className="laptop:w-3/4 hp:w-full"
                                value={endDate}
                                onSelectedDateChanged={date => setEndDate(format(date, 'MMMM dd,yyyy'))}
                                showClearButton={false}
                                placeholder="Select Until Date"
                            />
                        </div>
                        <div className="laptop:w-1/5 hp:w-full flex hp:flex-row-reverse hp:justify-start">
                            <Button disabled={!startDate || !endDate} color="primary" className="w-full" onClick={handleFilter}>Filter</Button>
                        </div>
                    </div>
                    <div className="flex laptop:w-[40%] gap-2 flex-col">
                        <div className="flex w-full gap-3">
                            <TextInput icon={IoIosSearch} onKeyDown={handleKeyDown} id="searchKeyword" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Quick Search..." className="laptop:w-4/5" />
                            <Button color="primary2" onClick={handleSearch} className="laptop:w-1/5">Search</Button>
                        </div>
                        <div className="w-full flex justify-end">
                            <Button color="primary" className="laptop:w-2/5 ml-4" onClick={handleClear}>Clear</Button>
                        </div>
                    </div>
                </div>
            </Flowbite>
        </div>
    )
}
export default AOTableHeader;