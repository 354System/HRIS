import { React } from "react";
import { Icon } from '@iconify/react';
import { useState } from "react";



const PurchaseOfGoods = ({ category }) => {

    const [device, setDevice] = useState({
        category: category,
        title: "",
        date: "",
        chronology: "",
        damage: "",
        cost: "",
        upload: "",
    });
    console.log(category);


    const handleInputChange = (e) => {
        setDevice((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleAddDevice = () => {
        // Kirim data pengguna ke backend
        fetch("https://fzsxpv5p-3000.asse.devtunnels.ms/form/create/repair", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                category: device.category,
                title: device.title,
                date: device.date,
                chronology: device.chronology,
                damage: device.damage,
                cost: device.cost,
                uploadfile: device.upload,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Handle respons dari backend
                // window.location.href = "/admin/user";
            })
            .catch((error) => {
                console.error(error);
            });

    };

    return (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 w-full h-[870px]">
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
                            htmlFor="title"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="title"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Judul"
                        onChange={handleInputChange}
                        value={device.title}
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
                        value={device.date}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-2 flex relative">
                    <div className="absolute left-1 top-1 mt-8">
                        <Icon icon="solar:document-add-linear" width="21.95" />
                    </div>
                    <div>
                        <label
                            htmlFor="chronology"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="chronology"
                        className=" h-[93px] bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Alasan Pembelian"
                        value={device.chronology}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-2 flex relative">
                    <div className="absolute left-1 top-1 mt-2">
                        <Icon icon="solar:file-corrupted-broken" width="21.95" />
                    </div>
                    <div>
                        <label
                            htmlFor="damage"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="damage"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Kerusakan Barang"
                        value={device.damage}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-2 flex relative">
                    <div className="absolute left-1 top-1 mt-2">
                        <Icon icon="solar:dollar-minimalistic-linear" width="21.95" />
                    </div>
                    <div>
                        <label
                            htmlFor="cost"
                            className="ml-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="cost"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-8 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Estimasi Biaya"
                        value={device.cost}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="text-end flex justify-end gap-x-8 mt-20">
                    <h1 className="mt-[11px] font-semibold cursor-pointer" >
                        Cancel
                    </h1>
                    <button
                        type="submit"
                        className="bg-[#A332C3] w-[155px] h-[46px] rounded-lg text-white font-semibold"
                        onClick={handleAddDevice}
                    >
                        Send Permission
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PurchaseOfGoods;