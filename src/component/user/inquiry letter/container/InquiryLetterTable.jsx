import { useState } from "react";
import RepairInquiryTableUser from "../component/table/RepairInquiryTable";
import PurchaseInquiryTableUser from "../component/table/PurchaseInquiryTable";
import { FiSearch } from "react-icons/fi";
import { TextInput } from "flowbite-react";
import { flowbiteTheme } from "../../../../lib/flowbiteTheme";

const InquiryLetterTableUser = ({ dataInquiry, refetchInquiryData }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [dataRepairTable, setDataRepairTable] = useState(true);
    const [dataPurchaseTable, setDataPurchaseTable] = useState(false);
    return (
        <div className="bg-white w-full rounded-lg laptop:p-7 hp:p-5 mb-10">
            <div className="flex hp:flex-col laptop:items-center justify-between w-full h-20 hp:gap-3">
                <div className="flex gap-3 hp:justify-between">
                    <button className={`h-12 w-36 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide text-sm ${dataRepairTable ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500 border border-gray-500 hover:bg-purple/50 hover:text-white transition-colors duration-200'}`}
                        onClick={() => {
                            setDataRepairTable(true);
                            setDataPurchaseTable(false);
                        }}>
                        Repair Device
                    </button>
                    <button className={`h-12 w-36 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide text-sm ${dataPurchaseTable ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500 border border-gray-500 hover:bg-purple/50 hover:text-white transition-colors duration-200'}`}
                        onClick={() => {
                            setDataRepairTable(false);
                            setDataPurchaseTable(true);
                        }}>
                        Purchase Device
                    </button>
                </div>
                <div>
                    <TextInput
                        theme={flowbiteTheme}
                        type="text"
                        id="search"
                        placeholder="Quick Search..."
                        className="laptop:w-96 hp:w-full"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
            </div>
            {dataRepairTable ? <RepairInquiryTableUser searchKeyword={searchKeyword} dataInquiry={dataInquiry} refetchInquiryData={refetchInquiryData} /> : null}
            {dataPurchaseTable ? <PurchaseInquiryTableUser searchKeyword={searchKeyword} dataInquiry={dataInquiry} refetchInquiryData={refetchInquiryData} /> : null}
        </div>
    )
}
export default InquiryLetterTableUser;