import * as XLSX from "xlsx"
import { Icon } from '@iconify/react';
const ExportDataUser = ({ dataUsers }) => {
    
    const handleExportToExcel = () => {
        var workbook = XLSX.utils.book_new();
        var worksheet = XLSX.utils.json_to_sheet(dataUsers);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Data Karyawan");

        XLSX.writeFile(workbook, "DataKaryawan.xlsx");
    }
    return (
        <div className="w-full h-10 flex justify-end">
            <button onClick={handleExportToExcel} className="bg-[#275b1d] hover:bg-[#183013] transition duration-300 laptop:w-36 hp:w-full h-10 rounded-lg flex items-center justify-center gap-x-2">
                <Icon icon="icon-park-solid:excel" fontSize={20} color="white"/>
                <p className="text-sm text-white font-bold">Export to Excel</p>
            </button>
        </div>
    )
}
export default ExportDataUser