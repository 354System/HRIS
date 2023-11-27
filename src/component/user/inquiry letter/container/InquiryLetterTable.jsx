import { useState } from "react";
import RepairInquiryTableUser from "../component/table/RepairInquiryTable";
import PurchaseInquiryTableUser from "../component/table/PurchaseInquiryTable";
import { FiSearch } from "react-icons/fi";

const InquiryLetterTableUser = ({ dataInquiry, refetchInquiryData }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [dataRepairTable, setDataRepairTable] = useState(true);
    const [dataPurchaseTable, setDataPurchaseTable] = useState(false);
    return (
        <div className="bg-white w-full rounded-lg p-7 mb-10">
            <div className="flex items-center justify-between w-full h-20">
                <div className="flex gap-3">
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
                <div className="relative flex items-center gap-x-6">
                    <div>
                        <input
                            type="text"
                            id="search"
                            placeholder="Quick Search..."
                            className="w-96 h-10 pl-10 bg-white border-2 border-[#D5D9DD] text-sm placeholder:text-grey rounded"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                    </div>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch color='#9295AB' size={18} />
                    </div>
                </div>
            </div>
            {dataRepairTable ? <RepairInquiryTableUser searchKeyword={searchKeyword} dataInquiry={dataInquiry} refetchInquiryData={refetchInquiryData} /> : null}
            {dataPurchaseTable ? <PurchaseInquiryTableUser searchKeyword={searchKeyword} dataInquiry={dataInquiry} refetchInquiryData={refetchInquiryData} /> : null}
        </div>
    )
}
export default InquiryLetterTableUser;