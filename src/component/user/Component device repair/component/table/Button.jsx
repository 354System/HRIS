import { CiSearch } from "react-icons/ci";
import React, { useState } from "react";
import TableRepair from "./tableRepair";
import TablePurchase from "./tablePurchase";
const Button = () => {


    const [repair, setRepair] = useState(true)
    const [purchase, setPurchase] = useState(false)
    const [searchKeyword, setSearchKeyword] = useState('');

    const handlerepair = () => {
        setRepair(true);
        setPurchase(false);
    }
    const handlepurchase = () => {
        setPurchase(true);
        setRepair(false);
    }


    return (
        <div className="bg-white w-[1380px] h-full">
            <div className="flex justify-between items-center">
                <div className="space-x-8 p-6">
                    <button
                       className={`h-12 w-36 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide text-sm ${repair ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500 border  hover:bg-purple/50 hover:text-white transition-colors duration-200'}`}
                        onClick={handlerepair}
                    >
                        Perbaikan Device
                    </button>
                    {/* {repair ? <TableRepair TableRepair={setRepair} /> : null} */}
                    <button
                         className={`h-12 w-36 focus:outline-none transition-colors duration-300 rounded-lg font-semibold tracking-wide text-sm ${purchase ? 'bg-purple  text-white' : 'bg-gray-200 text-gray-500 border  hover:bg-purple/50 hover:text-white transition-colors duration-200'}`}
                        onClick={handlepurchase}
                    >
                        Pembelian Barang
                    </button>
                </div>
                <div className="relative flex items-center mr-16">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CiSearch />
                    </div>
                    <input      
                        type="text"
                        id="search"
                        placeholder="Quick Search..."
                        className="w-[470px] h-[40px] pl-10 bg-gray-100 text-sm placeholder:text-grey rounded"
                        value={searchKeyword}   
                        onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                </div>
            </div>
            {repair ? <TableRepair TableRepair={setRepair} /> : null}
            {purchase ? <TablePurchase TablePurchase={setPurchase} /> : null}
        </div>
    )
}

export default Button;