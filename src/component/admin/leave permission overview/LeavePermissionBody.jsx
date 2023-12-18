import { useState } from "react";
import TablePaidLeaveAdmin from "./table/paidLeave";
import TablePermissionAdmin from "./table/permission";
import { Button, Datepicker, Flowbite, TextInput } from "flowbite-react";
import { flowbiteTheme } from "../../../lib/flowbiteTheme";
import { FiSearch } from "react-icons/fi";
import { RiFileExcel2Fill } from "react-icons/ri";
import * as XLSX from "xlsx"
import { format } from "date-fns";

const LeavePermissionBody = ({ permissionData, paidLeaveData, refetchDataPermission, refetchDataPaidLeave, searchKeyword, setSearchKeyword, startDate, endDate, setStartDate, setEndDate, currentPage, setCurrentPage, totalPages, isLoadingPaidLeave }) => {

    const [permission, setPermission] = useState(true);
    const [paidLeave, setPaidLeave] = useState(false);

    const handlePermission = () => {
        setPermission(true);
        setPaidLeave(false);
        setSearchKeyword("");
        setStartDate("");
        setEndDate("");
        setCurrentPage({
            permission: {
                page: currentPage.permission.page,
                all: null,
                pageSearch: null,
                pageFilter: null
            },
            paidLeave: {
                page: currentPage.paidLeave.page,
                all: null,
                pageSearch: null,
                pageFilter: null
            }
        })
        if (!searchKeyword && !startDate && !endDate) {
            refetchDataPermission();
        }
    }

    const handlePaidLeave = () => {
        setPermission(false);
        setPaidLeave(true);
        setSearchKeyword("");
        setStartDate("");
        setEndDate("");
        setCurrentPage({
            permission: {
                page: currentPage.permission.page,
                all: null,
                pageSearch: null,
                pageFilter: null
            },
            paidLeave: {
                page: currentPage.paidLeave.page,
                all: null,
                pageSearch: null,
                pageFilter: null
            }
        })
        if (!searchKeyword && !startDate && !endDate) {
            refetchDataPaidLeave();
        }
    }

    const handleFilter = () => {
        if (permission) {
            setCurrentPage((prevState) => ({
                ...prevState,
                permission: {
                    ...prevState.permission,
                    pageFilter: 1,
                    pageSearch: null,
                    all: null
                }
            }))
            refetchDataPermission();
        } else {
            setCurrentPage((prevState) => ({
                ...prevState,
                paidLeave: {
                    ...prevState.paidLeave,
                    pageFilter: 1,
                    pageSearch: null,
                    all: null
                }
            }))
            refetchDataPaidLeave();
        }
    }

    const handleClear = () => {
        if (permission) {
            setCurrentPage((prevState) => ({
                ...prevState,
                permission: {
                    ...prevState.permission,
                    pageFilter: null,
                    pageSearch: null,
                    all: null
                }
            }))
            refetchDataPermission();
        } else {
            setCurrentPage((prevState) => ({
                ...prevState,
                paidLeave: {
                    ...prevState.paidLeave,
                    pageFilter: null,
                    pageSearch: null,
                    all: null
                }
            }))
            refetchDataPaidLeave();
        }
        setSearchKeyword('');
        setStartDate('');
        setEndDate('');
    }

    const handleSearch = () => {
        if (permission) {
            setCurrentPage((prevState) => ({
                ...prevState,
                permission: {
                    ...prevState.permission,
                    pageSearch: 1
                }
            }))
            refetchDataPermission();
        } else {
            setCurrentPage((prevState) => ({
                ...prevState,
                paidLeave: {
                    ...prevState.paidLeave,
                    pageSearch: 1
                }
            }))
            refetchDataPaidLeave();
        }
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
        // Assuming permissionData or paidLeaveData is an array of objects
        const flattenedData = permission
            ? permissionData.map(item => flattenObject(item))
            : paidLeaveData.map(item => flattenObject(item));

        var workbook = XLSX.utils.book_new();
        var worksheet = XLSX.utils.json_to_sheet(flattenedData);
        XLSX.utils.book_append_sheet(workbook, worksheet, permission ? "Permission Data" : "Paid Leave Data");

        XLSX.writeFile(workbook, permission ? "PermissionData.xlsx" : "PaidLeaveData.xlsx");
    };


    return (
        <div className="bg-white w-full rounded-lg p-7 flex flex-col gap-3">
            <Flowbite theme={{ theme: flowbiteTheme }}>
                <div className="flex items-center justify-between w-full laptop:h-20 hp:flex-col">
                    <div className="flex gap-3 hp:mb-4">
                        <Button
                            color={permission ? "purple" : "gray-purple"}
                            className='h-12 w-36'
                            onClick={handlePermission}>
                            Permission
                        </Button>
                        <Button
                            color={paidLeave ? "purple" : "gray-purple"}
                            className='h-12 w-36 hover:bg-purple/50'
                            onClick={handlePaidLeave}>
                            Paid Leave
                        </Button>
                    </div>
                </div>
                <div className="flex w-full items-center hp:flex-col gap-3">
                    <div className="flex w-2/3 gap-3 hp:flex-col hp:w-full">
                        <div className="laptop:w-1/2 hp:w-2/3 flex items-center">
                            <p className="laptop:w-1/6 hp:w-1/4">From :</p>
                            <Datepicker
                                className="laptop:w-4/5 hp:w-3/4"
                                value={startDate}
                                onSelectedDateChanged={date => setStartDate(format(date, 'MMMM dd,yyyy'))}
                                showClearButton={false}
                                placeholder="Select From Date"
                            />
                        </div>
                        <div className="flex laptop:w-1/2 hp:w-2/3 items-center">
                            <p className="laptop:w-1/6 hp:w-1/4">Until :</p>
                            <Datepicker
                                className="laptop:w-4/5 hp:w-3/4"
                                value={endDate}
                                onSelectedDateChanged={date => setEndDate(format(date, 'MMMM dd,yyyy'))}
                                showClearButton={false}
                                placeholder="Select Until Date"
                            />
                        </div>
                        <div className="laptop:w-1/5 hp:w-1/3 flex hp:flex-row-reverse hp:justify-start">
                            <Button disabled={!startDate || !endDate} color="primary2" onClick={handleFilter} className="w-full">Filter</Button>
                        </div>
                    </div>
                    <div className="laptop:w-1/3 flex laptop:justify-end hp:w-full gap-3">
                        <TextInput
                            theme={flowbiteTheme}
                            type="text"
                            onKeyDown={handleKeyDown}
                            id="search"
                            placeholder="Quick Search..."
                            icon={FiSearch}
                            className="laptop:w-3/4 hp:w-4/5"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <Button color="primary2" className="laptop:w-1/5 hp:w-1/5" onClick={handleSearch}>Search</Button>
                    </div>
                </div>
                <div className="w-full h-10 flex justify-end">
                    <Button onClick={handleExportToExcel} color="green-dark" className="laptop:w-1/6">
                        <RiFileExcel2Fill size={20} color="white" />
                        <p className="text-sm text-white font-bold">Export to Excel</p>
                    </Button>
                    <Button color="primary" className="laptop:w-1/6 ml-4" onClick={handleClear}>Clear</Button>
                </div>
            </Flowbite>
            {permission ? <TablePermissionAdmin currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} permissionData={permissionData} setSearchKeyword={setSearchKeyword} refetchDataPermission={refetchDataPermission} /> : null}
            {paidLeave ? <TablePaidLeaveAdmin currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} paidLeaveData={paidLeaveData} setSearchKeyword={setSearchKeyword} refetchDataPaidLeave={refetchDataPaidLeave} isLoadingPaidLeave={isLoadingPaidLeave} /> : null}
        </div>
    )
}
export default LeavePermissionBody;