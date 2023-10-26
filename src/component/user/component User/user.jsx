import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Icon } from "@iconify/react";
import AddUserAdmin from "../../admin/popup-admin/adduser";

const User = () => {
  const [addUser, setAddUser] = useState(false);

  const handleAdd = () => {
    setAddUser(true);
  };

  return (
    <div>
      <div className="p-5 bg-white">
        <div className="flex mb-8">
          <div className="relative flex-1">
            <AiOutlineSearch
              className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 dark:text-gray-600"
              size={20}
            />
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 pl-10 pr-4 py-2 block w-[470px] h-[40px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Quick Search..."
              required
            />
          </div>
          <div className="ml-4">
            <button className="bg-[#D5D9DD] w-[133px] h-[40px] rounded-lg flex items-center justify-center  gap-x-2">
              <p className="text-sm text-grey">Role</p>
              <Icon
                icon="bxs:up-arrow"
                color="#20285a"
                width="5.88"
                rotate={2}
                className=""
              />
            </button>
          </div>
          <div className="ml-4">
            <button className="bg-[#D5D9DD] w-[133px] h-[40px] rounded-lg flex items-center justify-center gap-x-2">
              <p className="text-sm text-grey">Departement</p>
              <Icon
                icon="bxs:up-arrow"
                color="#20285a"
                width="5.88"
                rotate={2}
                className=""
              />
            </button>
          </div>
          <div className="ml-4">
            <button onClick={handleAdd} className="bg-[purple] w-[168px] h-[40px] rounded-lg flex items-center justify-center">
              <Icon
                icon="zondicons:add-solid"
                width="24"
                className="mr-2 text-[#FFFFFF]"
              />
              <span className="text-sm  text-white font-bold">Add User</span>
            </button>
            {addUser ? <AddUserAdmin AddUser={setAddUser}/> : null}
          </div>
        </div>
      </div>
      <div className=" w-full text-left flex">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-t text-grey">
              <th className="p-4">ID</th>
              <th>User</th>
              <th className="flex items-center mt-4">
                Role
                <Icon
                  icon="bxs:up-arrow"
                  color="#20285a"
                  width="5.88"
                  rotate={2}
                  className="ml-1"
                />
              </th>
              <th className="">
                <div className="flex items-center">
                  <span>Department</span>
                  <Icon
                    icon="bxs:up-arrow"
                    color="#20285a"
                    width="5.88"
                    rotate={2}
                    className="ml-1"
                  />
                </div>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="text-[#252C58] p-4">2341421</td>
              <td className="text-[#252C58]">Ahmed Rashdan</td>
              <td className="text-grey">Help Desk Executive</td>
              <td className="text-grey">IT Department</td>
              <td className="flex  gap-x-4 mt-4">
                <Icon icon="solar:pen-bold" width="20" className="" />
                <Icon
                  icon="solar:trash-bin-trash-bold"
                  color="red"
                  width="18.18"
                  className=""
                />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr className="border-b">
              <td className="text-[#252C58] p-4">2341421</td>
              <td className="text-[#252C58]">Ahmed Rashdan</td>
              <td className="text-grey">Senior Executive</td>
              <td className="text-grey">IT Department</td>
              <td className="flex  gap-x-4 mt-4">
                <Icon icon="solar:pen-bold" width="20" className="" />
                <Icon
                  icon="solar:trash-bin-trash-bold"
                  color="red"
                  width="18.18"
                  className=""
                />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr className="border-b">
              <td className="text-[#252C58] p-4">2341421</td>
              <td className="text-[#252C58]">Ahmed Rashdan</td>
              <td className="text-grey">Senior Manager</td>
              <td className="text-grey">IT Department</td>
              <td className="flex  gap-x-4 mt-4">
                <Icon icon="solar:pen-bold" width="20" className="" />
                <Icon
                  icon="solar:trash-bin-trash-bold"
                  color="red"
                  width="18.18"
                  className=""
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
