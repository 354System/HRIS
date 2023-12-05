import { CiSearch } from "react-icons/ci";
import { Icon } from "@iconify/react";

const TableAdmin = () => {
    return (
        <div className="w-full p-5  laptop:bg-white laptop:p-5 laptop:mt-5 laptop:rounded-lg hp:bg-white">
            <div className="laptop:flex justify-between laptop:mt-8 hp:mt-4 laptop:text-lg laptop:font-semibold  hp:font-bold  hp:flex hp:flex-col hp:gap-5">
                <div className="laptop:gap-x-5 hp:gap-x-5 hp:flex hp:text-sm">
                    <button className="laptop:w-[160px] laptop:h-[40px] hp:w-[180px] hp:h-[40px] bg-[#A332C3] rounded-lg hover:bg-[#6e2882] text-white font-semibold transition-colors duration-200 ">Perbaikan Device</button>
                    <button className="laptop:w-[160px] laptop:h-[40px] hp:w-[180px] hp:h-[40px] bg-[#D5D9DD] rounded-lg  text-[#252C58]/50  font-semibold ">Perbaikan Device</button>
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
                    />
                </div>
            </div>
            <div className="w-full laptop:mt-10 hp:mt-6 hp:overflow-x-auto">
                <table className="hp:w-[900px] laptop:w-full">
                    <thead className="">
                        <tr className="hp:text-base laptop:border-b-4 laptop:border-t-2 hp:bg-gray-100 text-grey text-left">
                            <th className="p-4 ">Date</th>
                            <th className="">Title</th>
                            <th className="p-4">Kerusakan</th>
                            <th className="p-4">Estimasi Biaya</th>
                            <th className="p-4">status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-left">
                        <tr className="border-b">
                            <td className="text-[#A332C3] p-2">28 July 2023</td>
                            <td className="">LCD Pecah</td>
                            <td className="p-4">LCD Pecah</td>
                            <td className="p-4">1.000.000</td>
                            <td className="bg-white"><span className="text-[#A332C3] bg-[#E6EFFC] p-1">Waiting</span></td>
                            <td className="flex  gap-x-1 mt-4">
                                <button className="bg-[#A332C3] w-[31px] h-[31px] flex justify-center items-center rounded-lg text-center mb-4">
                                    <Icon icon="solar:pen-bold" color="white" />
                                </button>
                                <button className="bg-[#FF0000] w-[31px] h-[31px] flex justify-center items-center rounded-lg text-center mb-4">
                                    <Icon icon="solar:trash-bin-2-bold" color="white" />
                                </button>
                                <button className="bg-[#F9F9F9] w-[31px] h-[31px] flex justify-center items-center rounded-lg text-center mb-4">
                                    <Icon icon="solar:menu-dots-bold" color="black" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableAdmin;