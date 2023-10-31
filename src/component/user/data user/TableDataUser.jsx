import React, { useState } from "react";
import { Icon } from "@iconify/react";
import DeleteUser from "../../admin/popup-admin/deleteuser";
import AddUserAdmin from "../../admin/popup-admin/adduser";
import HeaderDataUser from "./HeaderDataUser";
import { useDataUser } from "../../../features/user/useDataUser";
import { Spinner } from "@chakra-ui/react";

const TableDataUser = () => {
  const [addUserPopUp, setAddUserPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [userId, setUserid] = useState("");
  const [searchUser, setSearchUser] = useState("");

  const { data, isLoading, refetch: refetchDataUser } = useDataUser(searchUser);

  const handleDelete = (userId) => {
    setDeletePopUp(true);
    setUserid(userId)
  }

  return (
    <div className="bg-white p-10">
      <HeaderDataUser searchUser={searchUser} setSearchUser={setSearchUser} addUserPopUp={setAddUserPopUp} />
      <div className="w-full text-left flex-col">
        <table className="w-full table-auto ">
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
            {data && data.map((user, index) => (
              <tr key={index} className="border-b-2 text-primary">
                <td className="p-4">{user._id}</td>
                <td>{user.name}</td>
                <td>{user.position}</td>
                <td>{user.divisi}</td>
                <td className="flex gap-x-4 mt-4">
                  <Icon icon="solar:pen-bold" width="20" className="" />
                  <Icon
                    icon="solar:trash-bin-trash-bold"
                    color="red"
                    width="18.18"
                    className="cursor-pointer"
                    onClick={() => handleDelete(user._id)}
                  />
                  {deletePopUp ? <DeleteUser userid={userId} refetchDataUser={refetchDataUser} deleteuser={setDeletePopUp} /> : null}
                  {addUserPopUp ? <AddUserAdmin refetchDataUser={refetchDataUser} addUserPopUp={setAddUserPopUp} /> : null}
                </td>
              </tr>
            ))}
            {isLoading && <Spinner color="purple" speed="1s" />}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDataUser;
