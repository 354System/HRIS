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
  //popup tidak bisa discroll
  if (addUserPopUp || deleteUserPopUp || editUserPopUp) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
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
    <div className="bg-white rounded-lg p-10">
      <HeaderDataUser searchUser={searchUser} setSearchUser={setSearchUser} addUserPopUp={setAddUserPopUp} />
      <div className="w-full flex-col">
        <table className="w-full text-left table-auto ">
          <thead>
            <tr className="border-b-2 border-t-2 text-primary">
              <th className="p-4">ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Divisi</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, index) => (
              <tr key={index} className="border-b-2 text-primary">
                <td className="p-4 max-w-1">{user._id}</td>
                <td className="">{user.name}</td>
                <td>{user.position}</td>
                <td>{user.divisi}</td>
                <td className="flex gap-x-4 mt-4">
                  <Icon icon="solar:pen-bold" width="20" className="cursor-pointer" onClick={() => handleActionEdit(user)} />
                  <Icon
                    icon="solar:trash-bin-trash-bold"
                    color="red"
                    width="18.18"
                    className="cursor-pointer"
                    onClick={() => handleActionDelete(user._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editUserPopUp && <EditUser user={userDataById} refetchDataUser={refetchDataUser} editUserPopUp={setEditUserPopUp} />}
        {addUserPopUp && <AddUserAdmin refetchDataUser={refetchDataUser} addUserPopUp={setAddUserPopUp} />}
        {deleteUserPopUp && <DeleteUser userid={userId} refetchDataUser={refetchDataUser} deleteuser={setDelete} />}
        {isLoading && <div className="w-full mt-5 flex items-center justify-center"><Spinner color="purple" speed="1s" /></div>}
      </div>
    </div>
  );
};

export default TableDataUser;
