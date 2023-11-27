import { useState } from "react";
import RepairInquiryTableAdmin from "../component/table/RepairInquiryTable";
import PurchaseInquiryTableAdmin from "../component/table/PurchaseInquiryTable";
import { TextInput } from "flowbite-react";
import { flowbiteTheme } from "../../../../lib/flowbiteTheme";
import { FiSearch } from "react-icons/fi";
import { useFetchAllInquiryLetter } from "../../../../api/fetchData/useFetchAllInquiryLetter";

const InquiryLetterBodyAdmin = () => {
    const { data: mantap, isLoading, refetch } = useFetchAllInquiryLetter();
    console.log(mantap);
    const [repairTable, setRepairTable] = useState(true);
    const [purchaseTable, setPurchaseTable] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    return (
        <div className="bg-white w-full rounded-lg p-7">
            <div className="flex items-center justify-between w-full h-20">
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
                <div>
                    <TextInput
                        theme={flowbiteTheme}
                        type="text"
                        id="search"
                        placeholder="Quick Search..."
                        icon={FiSearch}
                        className="w-96"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
            </div>
            {repairTable ? <RepairInquiryTableAdmin data={mantap} searchKeyword={searchKeyword} refetch={refetch} /> : null}
            {purchaseTable ? <PurchaseInquiryTableAdmin data={mantap} searchKeyword={searchKeyword} refetch={refetch} /> : null}
        </div>
    )
}
export default InquiryLetterBodyAdmin;