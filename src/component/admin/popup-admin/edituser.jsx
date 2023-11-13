import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const EditUser = ({ user, edituser }) => {


    const handleExit = () => {
        edituser(false)
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [userData, setUserData] = useState({
        email: user.email,
        username: user.name,
        role: user.divisi,
        department: user.position,
        address: "",
        phone: user.numberphone,
        password: "",
    });

    const handleInputChange = (e) => {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };


    const handleEditUser = () => {
        const { email, username, role, department, address, phone, password } = userData

        fetch(`https://fzsxpv5p-3000.asse.devtunnels.ms/user/update/${user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                name: username,
                divisi: role,
                position: department,
                numberphone: phone,
                address: "",
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                window.location.href = "/admin/user";
            })
            .catch((error) => {
                console.error('Terjadi kesalahan:', error);
            });
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/5 w-full h-[818px]">
            <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 w-[667px] h-[590px] rounded-lg flex flex-col">
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
                            htmlFor="email"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="email"
                        id="email"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@gmail.com"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-2 relative">
                    <label
                        htmlFor="password"
                        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="password"
                            value={userData.password}
                            onChange={handleInputChange}
                        />
                        <Icon
                            onClick={togglePasswordVisibility}
                            icon={showPassword ? "ph:eye-slash" : "ph:eye"}
                            width={20}
                            className="cursor-pointer absolute top-1/2 transform -translate-y-1/2 right-4"
                        />
                    </div>
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
                        placeholder="Adress Here"
                        value={userData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mt-2 flex">
                    <div>
                        <label
                            htmlFor="phone"
                            className="mb-2 text-sm font-medium text-gray-900 dark:text-white absolute"
                        ></label>
                    </div>
                    <input
                        type="number"
                        id="number"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Number Phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                    />
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
                        placeholder="User"
                        value={userData.username}
                        onChange={handleInputChange}
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
                        id="department"
                        className="bg-[#ACACAC]/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="department"
                        value={userData.department}
                        onChange={handleInputChange}
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
                        className="bg-[#ACACAC]/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="role"
                        value={userData.role}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="text-end flex justify-end gap-x-8 mt-20">
                    <h1
                        onClick={handleExit}
                        className="mt-[11px] font-semibold cursor-pointer"
                    >
                        Cancel
                    </h1>
                    <button
                        onClick={handleEditUser}
                        className="bg-[#A332C3] w-[155px] h-[46px] rounded-lg text-white font-semibold"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditUser;