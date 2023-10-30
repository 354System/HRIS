import React, { useState } from "react";
import { Icon } from "@iconify/react";
import DeleteUser from "../../admin/popup-admin/deleteuser";
import AddUserAdmin from "../../admin/popup-admin/adduser";
import HeaderDataUser from "./HeaderDataUser";
import { useDataUser } from "../../../features/user/useDataUser";

const TableDataUser = () => {
  const [addUserPopUp, setAddUserPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [userId, setUserid] = useState("");

  const { data, isLoading } = useDataUser();

  if (addUserPopUp || deletePopUp) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }

  const handleDelete = (userId) => {
    setDeletePopUp(true);
    setUserid(userId)
  }

  return (
    <div className="bg-white p-10">
      <HeaderDataUser addUserPopUp={setAddUserPopUp} />
      <div className="w-full text-left flex">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-t text-grey">
              <th className="p-4">ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((user, index) => (
              <tr key={index} className="border-b-2">
                <td className="text-black p-4">{user._id}</td>
                <td className="text-[#252C58]">{user.name}</td>
                <td className="text-grey">{user.position}</td>
                <td className="text-grey">{user.divisi}</td>
                <td className="flex  gap-x-4 mt-4">
                  <Icon icon="solar:pen-bold" width="20" className="" />
                  <Icon
                    icon="solar:trash-bin-trash-bold"
                    color="red"
                    width="18.18"
                    className="cursor-pointer"
                    onClick={() => handleDelete(user._id)}
                  />
                  {deletePopUp ? <DeleteUser userid={userId} deleteuser={setDeletePopUp} /> : null}
                  {addUserPopUp ? <AddUserAdmin addUserPopUp={setAddUserPopUp} /> : null}
                </td>
              </tr>
            ))}
            {isLoading && <div className="flex items-center justify-center"><svg className="animate-spin h-5 w-5 " viewBox="0 0 24 24"></svg></div>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDataUser;
