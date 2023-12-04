import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Icon } from "@iconify/react";
import AddUserAdmin from "../popup-admin/adduser";
import DeleteUser from "../popup-admin/deleteuser";
import EditUser from "../popup-admin/edituser";

const User = () => {
  const [addUser, setAddUser] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [userId, setUserid] = useState("");
  const [userById, setUserById] = useState('')


  useEffect(() => {
    const fetchUser = async () => {
      try {
        await fetch("https://fzsxpv5p-3000.asse.devtunnels.ms/user/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => setUsers(data))
          .catch((error) => console.error(error));
      } catch {
      }
    };
    fetchUser()
  }, []);

  const handleAdd = () => {
    setAddUser(true);
  };

  const handleDelete = (user_id) => {
    setDeleteUser(true);
    setUserid(user_id)
  }

  const handleedit = (user) => {
    setEditUser(true);
    setUserById(user)

  }

  return (
    <div className="laptop:w-full  laptop:bg-white laptop:p-5 laptop:mt-5 laptop:rounded-lg hp:bg-white hp:mt-32 hp:rounded hp:flex hp:flex-col  hp:ml-4  hp:w-[330px] hp:p-4 hp:gap-y-4">
      <div className="flex  hp:flex-col hp:hidden ">
        <div className="relative flex">
          <AiOutlineSearch
            className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 dark:text-gray-600"
            size={20}
          />
          <input
            type="text"
            id="base-input"
            className="laptop:w-96 hp:w-60 h-10 pl-10 bg-white border-2 border-[#D5D9DD] text-sm placeholder:text-grey rounded"
            placeholder="Quick Search..."
            required
          />
        </div>
        <div className="ml-[460px]">
          <button className="laptop:bg-[#D5D9DD] laptop:w-[133px] laptop:h-[40px] laptop:rounded-lg laptop:flex laptop:items-center laptop:justify-center  laptop:gap-x-2 hp:hidden">
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
          <button className="laptop:bg-[#D5D9DD] laptop:w-[133px] laptop:h-[40px] laptop:rounded-lg laptop:flex laptop:items-center laptop:justify-center  laptop:gap-x-2 hp:hidden">
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
        <div className="laptop:ml-4 hp:mt-4">
          <button
            onClick={handleAdd}
            className="bg-[purple] w-[168px] h-[40px] rounded-lg flex items-center justify-center hp:flex"
          >
            <Icon
              icon="zondicons:add-solid"
              width="24"
              className="mr-2 text-[#FFFFFF]"
            />
            <span className="text-sm  text-white font-bold">Add User</span>
          </button>
          {addUser ? <AddUserAdmin AddUser={setAddUser} /> : null}
        </div>
      </div>
      {/* hp */}
      <div className="flex mb-8 hp:flex-col hp:gap-4 laptop:hidden ">
        <div className="laptop:ml-4  mr-4">
          <button
            onClick={handleAdd}
            className="bg-[purple] w-[168px] h-[40px] rounded-lg flex items-center justify-center hp:flex"
          >
            <Icon
              icon="zondicons:add-solid"
              width="24"
              className="mr-2 text-[#FFFFFF]"
            />
            <span className="text-sm  text-white font-bold">Add User</span>
          </button>
          {addUser ? <AddUserAdmin AddUser={setAddUser} /> : null}
        </div>
        <div className="relative flex-1">
          <AiOutlineSearch
            className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 dark:text-gray-600"
            size={20}
          />
          <input
            type="text"
            id="base-input"
            className="laptop:w-96 hp:w-60 h-10 pl-10 bg-white border-2 border-[#D5D9DD] text-sm placeholder:text-grey rounded"
            placeholder="Quick Search..."
            required
          />
        </div>
      </div>
      <div className=" w-full laptop:mt-10 hp:mt-6 hp:overflow-x-auto">
        <table className="hp:w-[720px] laptop:w-full hp:py-4 ">
          <thead>
            <tr className="hp:text-base laptop:border-b-4 laptop:border-t-2 hp:bg-gray-100 text-grey text-left ">
              <th className="laptop:p-4 hp:p-3">ID</th>
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
            {users.map((user) => (
              <tr key={user._id} className="border-b-2">
                <td className="text-black p-4 w-[290px] laptop:p-4 hp:p-3 ">{user._id}</td>
                <td className="text-[#252C58] w-[290px]">{user.name}</td>
                <td className="text-grey w-[290px] hp:w-[500px]">{user.position}</td>
                <td className="text-grey hp:w-[540px]">{user.divisi}</td>
                <td className="flex  gap-x-4 mt-4">
                  <Icon icon="solar:pen-bold" width="20" className="cursor-pointer" onClick={() => handleedit(user)}
                  />
                  {editUser ? <EditUser user={userById} edituser={setEditUser} /> : null}
                  <Icon
                    icon="solar:trash-bin-trash-bold"
                    color="red"
                    width="18.18"
                    className="cursor-pointer"
                    onClick={() => handleDelete(user._id)}
                  />
                  {deleteUser ? <DeleteUser userid={userId} deleteuser={setDeleteUser} /> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
