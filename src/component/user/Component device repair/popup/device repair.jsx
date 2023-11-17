import { React, useState } from "react";
import { Icon } from '@iconify/react';


const DeviceRepair = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 w-full h-[818px]">
            <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 w-[667px] h-[590px] rounded-lg flex flex-col">
                <div className="flex justify-end">
                    <button
                        className="bg-black w-[41.64px] h-[41.64px] rounded-full flex flex-col items-center justify-center"
                    >
                        <Icon icon="ion:close" color="white" width="17.44" />
                    </button>
                </div>
                <div className=" flex items-center">
                    <div className="bg-gray-300 rounded-full w-[50px] h-[50px] flex items-center justify-center">
                        <Icon icon="mingcute:user-add-fill" />
                    </div>
                    <div className="flex flex-col px-2">
                        <span className="font-semibold">Add-User</span>
                    </div>
                </div>
                <div className="mt-2 flex">
                    <div>
                        <label
                            htmlFor="username"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="username"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Name"
                    />
                </div>
                <div className="mt-2 flex">
                    <div>
                        <label
                            htmlFor="department"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="department"
                        id="department"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Department"
                    />
                </div>
                <div className="mt-2 flex">
                    <div>
                        <label
                            htmlFor="role"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="role"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Role"
                    />
                </div>
                <div className="mt-2 flex">
                    <div>
                        <label
                            htmlFor="address"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="address"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Address"
                    />
                </div>
                <div className="mt-2 flex">
                    <div>
                        <label
                            htmlFor="department"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="text"
                        id="phone"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="number phone "
                    />
                </div>
                <div className="mt-2 flex">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="gmail"
                        id="email"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Email"
                    />
                </div>
                <div className="mt-2 flex">
                    <div className="relative w-full">
                        <label
                            htmlFor="password"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            placeholder="•••••••••••••"
                        />
                        <Icon
                            onClick={togglePasswordVisibility}
                            icon={showPassword ? "ph:eye-slash" : "ph:eye"}
                            width={20}
                            className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4"
                        />
                    </div>
                </div>
                <div className="text-end flex justify-end gap-x-8 mt-20">
                    <h1  className="mt-[11px] font-semibold cursor-pointer" >
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

export default DeviceRepair;