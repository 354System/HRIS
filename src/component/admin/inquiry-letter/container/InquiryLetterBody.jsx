import { useState } from "react";
import RepairInquiryTableAdmin from "../component/table/RepairInquiryTable";
import PurchaseInquiryTableAdmin from "../component/table/PurchaseInquiryTable";
import { TextInput } from "flowbite-react";
import { flowbiteTheme } from "../../../../lib/flowbiteTheme";
import { FiSearch } from "react-icons/fi";
import { useFetchAllInquiryLetter } from "../../../../api/fetchData/useFetchAllInquiryLetter";

const InquiryLetterBodyAdmin = () => {
    const { data, isLoading, refetch } = useFetchAllInquiryLetter();
    const [repairTable, setRepairTable] = useState(true);
    const [purchaseTable, setPurchaseTable] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    return (
        <div className="bg-white w-full rounded-lg p-7">
            <div className="flex hp:flex-col items-center justify-between w-full laptop:h-20 hp:gap-4">
                <div className="flex gap-3">
                    <button className={`h-12 w-36 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide text-sm ${repairTable ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500 border border-gray-500 hover:bg-purple/50 hover:text-white transition-colors duration-200'}`}
                        onClick={() => {
                            setRepairTable(true);
                            setPurchaseTable(false);
                        }}>
                        Repair Inquiry
                    </button>
                    <button className={`h-12 w-36 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide text-sm ${purchaseTable ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500 border border-gray-500 hover:bg-purple/50 hover:text-white transition-colors duration-200'}`}
                        onClick={() => {
                            setRepairTable(false);
                            setPurchaseTable(true);
                        }}>
                        Purchase Inquiry
                    </button>
                </div>
                <div className="">
                    <TextInput
                        theme={flowbiteTheme}
                        type="text"
                        id="search"
                        placeholder="Quick Search..."
                        icon={FiSearch}
                        className="laptop:w-96 hp:w-full"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
            </div>
            {repairTable ? <RepairInquiryTableAdmin data={data} searchKeyword={searchKeyword} refetch={refetch} /> : null}
            {purchaseTable ? <PurchaseInquiryTableAdmin data={data} searchKeyword={searchKeyword} refetch={refetch} /> : null}
        </div>
    )
}
export default InquiryLetterBodyAdmin;