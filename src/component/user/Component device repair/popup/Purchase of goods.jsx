import { React} from "react";
import { Icon } from '@iconify/react';


const PurchaseOfGoods = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 w-full h-[818px]">
            <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 w-[667px] h-[660px] rounded-lg flex flex-col gap-y-4">
                <div className="flex justify-end">
                    <button
                        className="bg-black w-[41.64px] h-[41.64px] rounded-full flex flex-col items-center justify-center"
                    >
                        <Icon icon="ion:close" color="white" width="17.44" />
                    </button>
                </div>
                <div className=" flex items-center">
                    <div className="bg-gray-300 rounded-full w-[50px] h-[50px] flex items-center justify-center">
                        <Icon icon="solar:widget-add-bold" />
                    </div>
                    <div className="flex flex-col px-2">
                        <span className="font-semibold">Form Pembalian Barang Penunjang Kerja</span>
                    </div>
                </div>
                <div className="mt-2 flex relative">
                    <div className="absolute left-1 top-1 mt-2">
                        <Icon icon="solar:document-outline" width="21.95" />
                    </div>
                    <div>
                        <label
                            htmlFor="judul"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="judul"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Judul"
                    />
                </div>
                <div className="mt-2 flex ">
                    <div>
                        <label
                            htmlFor="date"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="date"
                        id="date"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Judul"
                    />
                </div>
                <div className="mt-2 flex relative">
                    <div className="absolute left-1 top-1 mt-8">
                        <Icon icon="solar:document-add-linear" width="21.95" />
                    </div>
                    <div>
                        <label
                            htmlFor="judul"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="judul"
                        className=" h-[93px] bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Kronologi Kerusakan"
                    />
                </div>
                <div className="mt-2 flex relative">
                    <div className="absolute left-1 top-1 mt-2">
                        <Icon icon="solar:file-corrupted-broken" width="21.95" />
                    </div>
                    <div>
                        <label
                            htmlFor="judul"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="judul"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Kerusakan Barang"
                    />
                </div>
                <div className="mt-2 flex relative">
                    <div className="absolute left-1 top-1 mt-2">
                        <Icon icon="solar:dollar-minimalistic-linear" width="21.95" />
                    </div>
                    <div>
                        <label
                            htmlFor="judul"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="judul"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Estimasi Biaya"
                    />
                </div>
                <div className="text-end flex justify-end gap-x-8 mt-20">
                    <h1 className="mt-[11px] font-semibold cursor-pointer" >
                        Cancel
                    </h1>
                    <button
                        className="bg-[#A332C3] w-[155px] h-[46px] rounded-lg text-white font-semibold"
                    >
                        Add User
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PurchaseOfGoods;