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
    <div className="bg-white ">
      <div className="p-5 ">
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
            <button
              onClick={handleAdd}
              className="bg-[purple] w-[168px] h-[40px] rounded-lg flex items-center justify-center"
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
            {users.map((user) => (
              <tr key={user._id} className="border-b-2">
                <td className="text-black p-4 w-[290px] ">{user._id}</td>
                <td className="text-[#252C58] w-[290px]">{user.name}</td>
                <td className="text-grey w-[290px]">{user.position}</td>
                <td className="text-grey ">{user.divisi}</td>
                <td className="flex  gap-x-4 mt-4">
                  <Icon icon="solar:pen-bold" width="20" className="cursor-pointer" onClick={()=>handleedit(user)}
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
