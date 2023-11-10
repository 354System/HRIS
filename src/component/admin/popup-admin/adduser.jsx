import { useState } from "react";
import React from "react";
import { Icon } from "@iconify/react";

const AddUserAdmin = (props) => {
  const { AddUser } = props;


  const [userData, setUserData] = useState({
    email: "",
    username: "",
    role: "",
    department: "",
    password: "",
    address: "",
    phone: "",
  });

  const handleExit = () => {
    AddUser(false);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleAddUser = () => {
    // Kirim data pengguna ke backend
    fetch("https://fzsxpv5p-3000.asse.devtunnels.ms/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        name: userData.username,
        divisi: userData.role,
        position: userData.department,
        password: userData.password,
        address: userData.address,
        numberphone: userData.phone,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle respons dari backend
        window.location.href = "/admin/user";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 w-full h-[818px]">
      <div className="absolute top-1/2 transform -translate-y-1/2 bg-white p-4 w-[667px] h-[590px] rounded-lg flex flex-col">
        <div className="flex justify-end">
          <button
            onClick={handleExit}
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
            type="department"
            id="department"
            className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Department"
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
            className="bg-[#ACACAC]/50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Role"
            value={userData.role}
            onChange={handleInputChange}
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
            value={userData.address}
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
            id="phone"
            className="bg-[#ACACAC]/50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="number phone "
            value={userData.phone}
            onChange={handleInputChange}
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
            value={userData.email}
            onChange={handleInputChange}
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
        <div className="text-end flex justify-end gap-x-8 mt-20">
          <h1
            onClick={handleExit}
            className="mt-[11px] font-semibold cursor-pointer"
          >
            Cancel
          </h1>
          <button
            onClick={handleAddUser}
            className="bg-[#A332C3] w-[155px] h-[46px] rounded-lg text-white font-semibold"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserAdmin;
