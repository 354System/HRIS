import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useFetchAllUsers } from "../../../../api/fetchData/useFetchAllUsers";
import { Spinner } from "@chakra-ui/react";
import HeaderDataUser from "../component/HeaderDataUser";
import AddUserAdmin from "../actions/adduser";
import EditUser from "../actions/edituser";
import DeleteUser from "../actions/deleteuser";

const TableDataUser = () => {
  //add user popup
  const [addUserPopUp, setAddUserPopUp] = useState(false);
  //delete user popup
  const [deleteUserPopUp, setDeleteUserPopUp] = useState(false);
  //edit user popup dan passing data user sesuai id ke action edit user
  const [editUserPopUp, setEditUserPopUp] = useState(false);
  const [userDataById, setUserDataById] = useState([]);
  //user id
  const [userId, setUserid] = useState("");
  //search user
  const [searchUser, setSearchUser] = useState("");

  //get data user dari useDataUser
  const { data: users, isLoading, refetch: refetchDataUser } = useFetchAllUsers();

  //handle edit
  const handleActionEdit = (user) => {
    setEditUserPopUp(true);
    setUserDataById(user);
  };

  //handle delete
  const handleActionDelete = (userId) => {
    setDeleteUserPopUp(true);
    setUserid(userId);
  };

  return (
    <div className="bg-white w-full rounded-lg">
      <HeaderDataUser searchUser={searchUser} dataUsers={users} setSearchUser={setSearchUser} addUserPopUp={setAddUserPopUp} />
      <div className="w-full">
        <table className="w-full ">
          <thead>
            <tr className="border-b-2 border-t-2 text-primary">
              <th className="p-4 text-left">ID</th>
              <th className="text-left">Name</th>
              <th className="text-center">Position</th>
              <th className="text-center">Divisi</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, index) => (
              <tr key={index} className="border-b-2 text-primary">
                <td className="p-4">{user._id}</td>
                <td className="pr-10">{user.name}</td>
                <td className="text-center">{user.position}</td>
                <td className="text-center">{user.divisi}</td>
                <td className="flex w-full h-14 justify-center items-center gap-2">
                  <Icon icon="solar:pen-bold" width="20" className="cursor-pointer hover:text-[#4e5dbb]" onClick={() => handleActionEdit(user)} />
                  <Icon
                    icon="solar:trash-bin-trash-bold"
                    width="18.18"
                    className="cursor-pointer text-red hover:text-[#793232]"
                    onClick={() => handleActionDelete(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editUserPopUp && <EditUser user={userDataById} refetchDataUser={refetchDataUser} editUserPopUp={setEditUserPopUp} />}
        {addUserPopUp && <AddUserAdmin refetchDataUser={refetchDataUser} addUserPopUp={setAddUserPopUp} />}
        {deleteUserPopUp && <DeleteUser userid={userId} refetchDataUser={refetchDataUser} deleteuser={setDeleteUserPopUp} />}
        {isLoading && <div className="w-full mt-5 flex items-center justify-center"><Spinner color="purple" speed="1s" /></div>}
      </div>
    </div>
  );
};

export default TableDataUser;
